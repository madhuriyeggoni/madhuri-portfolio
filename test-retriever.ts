import { ContentLoader } from './src/lib/brain/loader';
import { ContentRetriever } from './src/lib/brain/retriever';

async function test() {
  const loader = new ContentLoader();
  try {
    console.log("--- START PIE RETRIEVER TESTING ---");
    console.log("1. Loading documents from content/...");
    const docs = await loader.loadAll();
    console.log(`Loaded ${docs.length} documents.`);

    const queries = [
      "AeroFlare geospatial prediction", // Matches project (aeroflare)
      "react frontend library",           // Matches skill (react)
      "unknown tech query"               // No matches
    ];

    for (const q of queries) {
      console.log(`\n==================================================`);
      console.log(`QUERY: "${q}"`);
      console.log(`==================================================`);
      const { results, debugLog } = ContentRetriever.retrieve(q, docs, {
        limit: 2,
        minScoreThreshold: 1.0,
        expandRelations: true
      });

      console.log("--- Debug Tracer Log ---");
      debugLog.forEach(logLine => console.log(`  ${logLine}`));

      console.log("\n--- Retrieved Results (Normalized) ---");
      if (results.length === 0) {
        console.log("  No matches found.");
      } else {
        results.forEach((res, idx) => {
          console.log(`  [Match #${idx + 1}] ID: "${res.document.id}" | Title: "${res.document.title}" | Score: ${res.score.toFixed(4)}`);
          console.log(`    Reason: ${res.reason}`);
          if (res.matchExplanation && res.matchExplanation.keywordsMatched.length > 0) {
            console.log(`    Keywords Matched: [${res.matchExplanation.keywordsMatched.join(', ')}] | Metadata Hits: ${res.matchExplanation.metadataHits}`);
          }
        });
      }
    }
    console.log("\n--- END PIE RETRIEVER TESTING ---");
  } catch (err: any) {
    console.error("RETRIEVAL RUN ERROR:", err?.message || err);
    process.exit(1);
  }
}

test();
