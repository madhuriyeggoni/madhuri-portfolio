import { IContentDocument, IRetrievedDocument } from './types';

// ============================================================================
// 1. DETERMINISTIC STOP-WORDS REGISTER
// ============================================================================

const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'arent', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'cant', 'cannot', 'could',
  'couldnt', 'did', 'didnt', 'do', 'does', 'doesnt', 'doing', 'dont', 'down', 'during', 'each', 'few', 'for', 'from',
  'further', 'had', 'hadnt', 'has', 'hasnt', 'have', 'havent', 'having', 'he', 'hed', 'hell', 'hes', 'her', 'here',
  'heres', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'hows', 'i', 'id', 'ill', 'im', 'ive', 'if', 'in',
  'into', 'is', 'isnt', 'it', 'its', 'itself', 'lets', 'me', 'more', 'most', 'mustnt', 'my', 'myself', 'no', 'nor',
  'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own',
  'same', 'shant', 'she', 'shed', 'shell', 'shes', 'should', 'shouldnt', 'so', 'some', 'such', 'than', 'that',
  'thats', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'theres', 'these', 'they', 'theyd',
  'theyll', 'theyre', 'theyve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was',
  'wasnt', 'we', 'wed', 'well', 'were', 'weve', 'werent', 'what', 'whats', 'when', 'whens', 'where', 'wheres',
  'which', 'while', 'who', 'whos', 'whom', 'why', 'whys', 'with', 'wont', 'would', 'wouldnt', 'you', 'youd',
  'youll', 'youre', 'youve', 'your', 'yours', 'yourself', 'yourselves',
  // Conversational fillers
  'show', 'me', 'find', 'get', 'tell', 'explain', 'describe', 'give', 'list', 'details', 'detail', 'info',
  'information', 'profile', 'work', 'projects', 'project', 'skills', 'skill', 'experience', 'experiences'
]);

// ============================================================================
// 2. TEXT NORMALIZATION UTILS
// ============================================================================

export function normalizeText(text: string): string {
  return text.toLowerCase()
    .replace(/[^\w\s-]/g, ' ') // Replace punctuation with spaces
    .replace(/\s+/g, ' ')      // Normalize whitespace gaps
    .trim();
}

export function extractKeywords(query: string): string[] {
  const normalized = normalizeText(query);
  return normalized.split(' ')
    .filter(token => token.length > 1 && !STOP_WORDS.has(token));
}

// ============================================================================
// 3. RETRIEVER CLASS DEFINITION & SCORING ALGORITHM
// ============================================================================

export interface IRetrievalOptions {
  limit?: number;
  minScoreThreshold?: number;
  expandRelations?: boolean;
}

export interface IRetrievalResult {
  results: IRetrievedDocument[];
  debugLog: string[];
}

/**
 * Deterministic scoring-based retriever for the Portfolio Intelligence Engine.
 * 
 * --- THE SCORING ALGORITHM & WEIGHTS ---
 * 
 * 1. Title Exact Match (+25.0 points):
 *    If the user's query exactly matches the document title, it indicates direct intent.
 * 
 * 2. Title Keyword Match (+15.0 points exact / +5.0 points partial):
 *    Keywords matched in the title carry high contextual significance. 
 *    Exact keyword title matches get 15 points; substring matches receive 5 points.
 * 
 * 3. Tag Matches (+10.0 points per hit):
 *    Metadata tags map explicit technologies/features. Each exact tag hit receives 10 points.
 * 
 * 4. Summary Matches (+5.0 points per keyword match):
 *    A document's summary defines its abstract description, holding moderate weight.
 * 
 * 5. Content Body Frequency Match (+1.0 point per match, capped at 15.0 points):
 *    Scans the document raw markdown body for keyword frequency occurrences.
 *    Capped to prevent long, wordy documents from dominating retrieval.
 * 
 * 6. Priority Multiplier:
 *    Weights accumulated score against priority tags defined in frontmatter:
 *    - 'high'   -> 1.5x boost (prioritizes key projects/experiences)
 *    - 'medium' -> 1.0x (neutral)
 *    - 'low'    -> 0.7x penalty (e.g. detailed sub-skills)
 */
export class ContentRetriever {
  /**
   * Scores loaded documents against a query and returns a sorted list of matches.
   * Expands related/dependency documents to enrich prompt context window.
   */
  public static retrieve(
    query: string,
    documents: IContentDocument[],
    options: IRetrievalOptions = {}
  ): IRetrievalResult {
    const limit = options.limit ?? 3;
    const minScoreThreshold = options.minScoreThreshold ?? 1.0;
    const expandRelations = options.expandRelations ?? true;

    const debugLog: string[] = [];
    debugLog.push(`--- START PIE RETRIEVER RUN ---`);
    debugLog.push(`Query: "${query}"`);

    // 1. Extract keywords
    const keywords = extractKeywords(query);
    debugLog.push(`Extracted Keywords: [${keywords.join(', ')}]`);

    if (keywords.length === 0) {
      debugLog.push("No search keywords found after stop-words filtering.");
      return { results: [], debugLog };
    }

    // 2. Score documents
    const scoredDocs: IRetrievedDocument[] = [];
    const docMap = new Map<string, IContentDocument>();

    for (const doc of documents) {
      docMap.set(doc.id, doc);
      const { score, explanation } = this.scoreDocument(query, keywords, doc);
      
      if (score >= minScoreThreshold) {
        scoredDocs.push({
          document: doc,
          score,
          reason: `Matched search query keywords with raw score of ${score.toFixed(2)}.`,
          matchExplanation: explanation
        });
        debugLog.push(`Document "${doc.id}" raw score: ${score.toFixed(2)} (Hits: ${explanation.metadataHits}, Keywords: [${explanation.keywordsMatched.join(', ')}])`);
      }
    }

    // 3. Sort raw matches descending
    scoredDocs.sort((a, b) => b.score - a.score);

    // Extract top matches under limit
    let primaryResults = scoredDocs.slice(0, limit);
    debugLog.push(`Selected top ${primaryResults.length} primary results.`);

    // 4. Relations Expansion (dependsOn, related)
    if (expandRelations) {
      const expandedResults: IRetrievedDocument[] = [...primaryResults];
      const visitedIds = new Set<string>(primaryResults.map(r => r.document.id));

      for (const res of primaryResults) {
        const metadata = res.document.metadata;
        const relations: string[] = [];

        if (metadata.dependsOn && Array.isArray(metadata.dependsOn)) {
          relations.push(...metadata.dependsOn);
        }
        if (metadata.related && Array.isArray(metadata.related)) {
          relations.push(...metadata.related);
        }

        for (const relId of relations) {
          if (visitedIds.has(relId)) continue;

          const targetDoc = docMap.get(relId);
          if (targetDoc) {
            visitedIds.add(relId);
            const relationScore = res.score * 0.5; // Relations inherit 50% score of parent match
            expandedResults.push({
              document: targetDoc,
              score: relationScore,
              reason: `Expanded as dependency/relation of matched document "${res.document.title}" (ID: ${res.document.id}).`,
              matchExplanation: {
                keywordsMatched: [],
                metadataHits: 0
              }
            });
            debugLog.push(`Expanded related document "${targetDoc.id}" (Score: ${relationScore.toFixed(2)}) from parent "${res.document.id}"`);
          }
        }
      }
      
      // Resort expanded results
      expandedResults.sort((a, b) => b.score - a.score);
      primaryResults = expandedResults;
    }

    // 5. Score Normalization (0.0 to 1.0 relative scaling)
    if (primaryResults.length > 0) {
      const maxScore = primaryResults[0].score;
      if (maxScore > 0) {
        primaryResults = primaryResults.map(res => ({
          ...res,
          score: res.score / maxScore
        }));
        debugLog.push(`Normalized final scores relative to top match score of ${maxScore.toFixed(2)}.`);
      }
    }

    debugLog.push(`--- END PIE RETRIEVER RUN ---`);
    return {
      results: primaryResults,
      debugLog
    };
  }

  /**
   * Helper function to score a single document unit.
   */
  private static scoreDocument(
    query: string,
    keywords: string[],
    doc: IContentDocument
  ): { score: number; explanation: { keywordsMatched: string[]; metadataHits: number } } {
    let rawScore = 0;
    let metadataHits = 0;
    const keywordsMatched = new Set<string>();

    const titleLower = doc.title.toLowerCase();
    const queryLower = query.toLowerCase();

    // A. Full Title Exact Match
    if (titleLower === queryLower) {
      rawScore += 25;
      metadataHits++;
    }

    for (const kw of keywords) {
      let kwMatched = false;

      // B. Title Keyword Match
      if (titleLower.includes(kw)) {
        rawScore += titleLower === kw ? 15 : 5;
        kwMatched = true;
        metadataHits++;
      }

      // C. Tag Matches
      if (doc.metadata.tags && Array.isArray(doc.metadata.tags)) {
        const tagHits = doc.metadata.tags.filter(tag => tag.toLowerCase() === kw).length;
        if (tagHits > 0) {
          rawScore += tagHits * 10;
          kwMatched = true;
          metadataHits += tagHits;
        }
      }

      // D. Summary Matches
      if (doc.metadata.summary) {
        const summaryLower = doc.metadata.summary.toLowerCase();
        if (summaryLower.includes(kw)) {
          rawScore += 5;
          kwMatched = true;
        }
      }

      // E. Content Keyword Frequency Matches
      if (doc.rawContent) {
        const contentLower = doc.rawContent.toLowerCase();
        let count = 0;
        let pos = contentLower.indexOf(kw);
        while (pos !== -1) {
          count++;
          pos = contentLower.indexOf(kw, pos + kw.length);
        }

        if (count > 0) {
          rawScore += Math.min(count * 1.0, 15.0); // +1 per hit, max 15 points
          kwMatched = true;
        }
      }

      if (kwMatched) {
        keywordsMatched.add(kw);
      }
    }

    // F. Priority weighting
    const priority = doc.metadata.priority || 'medium';
    let multiplier = 1.0;
    if (priority === 'high') multiplier = 1.5;
    if (priority === 'low') multiplier = 0.7;

    rawScore *= multiplier;

    return {
      score: rawScore,
      explanation: {
        keywordsMatched: Array.from(keywordsMatched),
        metadataHits
      }
    };
  }
}
