"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentLoader = void 0;
exports.parseYAML = parseYAML;
exports.parseFrontmatter = parseFrontmatter;
exports.parseSections = parseSections;
exports.validateMetadata = validateMetadata;
const fs = require("fs");
const path = require("path");
const crypto_1 = require("crypto");
// ============================================================================
// 1. LIGHTWEIGHT PURE-TS YAML PARSER
// ============================================================================
function unquote(str) {
    if ((str.startsWith('"') && str.endsWith('"')) || (str.startsWith("'") && str.endsWith("'"))) {
        return str.substring(1, str.length - 1);
    }
    return str;
}
function parseScalar(val) {
    const cleanVal = unquote(val);
    if (cleanVal.toLowerCase() === 'true')
        return true;
    if (cleanVal.toLowerCase() === 'false')
        return false;
    if (cleanVal.toLowerCase() === 'null')
        return null;
    const num = Number(cleanVal);
    if (!isNaN(num) && cleanVal !== '')
        return num;
    return cleanVal;
}
/**
 * Parses simple YAML frontmatter string blocks into structured key-value maps.
 * Handles scalars, inline lists [A, B], and block sequence lists (- Item).
 */
function parseYAML(yamlString) {
    const result = {};
    const lines = yamlString.split(/\r?\n/);
    let currentKey = null;
    let listValue = [];
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#'))
            continue; // Skip comments/empty lines
        // Block list item: "- item"
        if (trimmed.startsWith('-') && currentKey) {
            const val = trimmed.substring(1).trim();
            listValue.push(unquote(val));
            continue;
        }
        const colonIndex = trimmed.indexOf(':');
        if (colonIndex === -1)
            continue;
        const key = trimmed.substring(0, colonIndex).trim();
        const valueStr = trimmed.substring(colonIndex + 1).trim();
        // Commit previous list if key changes
        if (currentKey && listValue.length > 0) {
            result[currentKey] = listValue;
            listValue = [];
        }
        currentKey = key;
        // Inline list: "[A, B, C]"
        if (valueStr.startsWith('[') && valueStr.endsWith(']')) {
            const elements = valueStr.substring(1, valueStr.length - 1)
                .split(',')
                .map(el => unquote(el.trim()))
                .filter(el => el !== '');
            result[key] = elements;
            currentKey = null;
            continue;
        }
        // Start block list: "key:"
        if (valueStr === '') {
            result[key] = [];
            continue;
        }
        // Scalar key-value
        result[key] = parseScalar(valueStr);
        currentKey = null;
    }
    // Commit trailing lists
    if (currentKey && listValue.length > 0) {
        result[currentKey] = listValue;
    }
    return result;
}
/**
 * Splits raw file text into metadata headers (frontmatter) and markdown body.
 */
function parseFrontmatter(rawContent) {
    const separator = '---';
    const lines = rawContent.split(/\r?\n/);
    let firstLineIndex = 0;
    while (firstLineIndex < lines.length && lines[firstLineIndex].trim() === '') {
        firstLineIndex++;
    }
    const hasFrontmatter = firstLineIndex < lines.length && lines[firstLineIndex].trim() === separator;
    if (!hasFrontmatter) {
        return { metadata: {}, body: rawContent.trim() };
    }
    const yamlLines = [];
    const bodyLines = [];
    let foundEndSeparator = false;
    for (let i = firstLineIndex + 1; i < lines.length; i++) {
        const line = lines[i];
        if (!foundEndSeparator && line.trim() === separator) {
            foundEndSeparator = true;
            continue;
        }
        if (!foundEndSeparator) {
            yamlLines.push(line);
        }
        else {
            bodyLines.push(line);
        }
    }
    const metadata = parseYAML(yamlLines.join('\n'));
    const body = bodyLines.join('\n').trim();
    return { metadata, body };
}
// ============================================================================
// 2. MARKDOWN HEADING PARTITIONER
// ============================================================================
/**
 * Partitions a markdown body text into logical content sections split by headings.
 */
function parseSections(markdown) {
    const lines = markdown.split(/\r?\n/);
    const sections = [];
    let currentHeading = '';
    let currentLevel = 0;
    let currentContent = [];
    for (const line of lines) {
        const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
        if (headingMatch) {
            // Save preceding section before starting a new one
            if (currentContent.length > 0 || currentHeading !== '') {
                sections.push({
                    heading: currentHeading,
                    level: currentLevel,
                    content: currentContent.join('\n').trim(),
                });
            }
            currentLevel = headingMatch[1].length;
            currentHeading = headingMatch[2].trim();
            currentContent = [];
        }
        else {
            currentContent.push(line);
        }
    }
    // Push final section
    if (currentContent.length > 0 || currentHeading !== '') {
        sections.push({
            heading: currentHeading,
            level: currentLevel,
            content: currentContent.join('\n').trim(),
        });
    }
    return sections;
}
// ============================================================================
// 3. SCHEMA VALIDATOR
// ============================================================================
/**
 * Validates metadata entries against requirements defined in Content Specification.
 */
function validateMetadata(metadata, filePath) {
    const requiredCommon = ['schema_version', 'id', 'type', 'title', 'summary', 'last_updated', 'priority', 'tags'];
    const missing = requiredCommon.filter(field => !(field in metadata));
    if (missing.length > 0) {
        throw new Error(`Validation Error in ${filePath}: Missing required fields: ${missing.join(', ')}`);
    }
    const validTypes = ['project', 'experience', 'research', 'skill', 'achievement', 'blog', 'profile'];
    if (!validTypes.includes(metadata.type)) {
        throw new Error(`Validation Error in ${filePath}: Invalid type "${metadata.type}". Allowed: ${validTypes.join(', ')}`);
    }
    const validPriorities = ['high', 'medium', 'low'];
    if (!validPriorities.includes(metadata.priority)) {
        throw new Error(`Validation Error in ${filePath}: Invalid priority "${metadata.priority}". Allowed: ${validPriorities.join(', ')}`);
    }
    if (!Array.isArray(metadata.tags)) {
        throw new Error(`Validation Error in ${filePath}: "tags" must be an array.`);
    }
    // Specific content validations
    if (metadata.type === 'project') {
        const validStatuses = ['completed', 'in-progress', 'archived'];
        if (metadata.status && !validStatuses.includes(metadata.status)) {
            throw new Error(`Validation Error in ${filePath}: Project status "${metadata.status}" is invalid. Allowed: ${validStatuses.join(', ')}`);
        }
        if (metadata.tech_stack && !Array.isArray(metadata.tech_stack)) {
            throw new Error(`Validation Error in ${filePath}: Project "tech_stack" must be an array.`);
        }
    }
    if (metadata.type === 'experience') {
        if (!metadata.company) {
            throw new Error(`Validation Error in ${filePath}: Experience lacks required "company" field.`);
        }
        if (!metadata.role) {
            throw new Error(`Validation Error in ${filePath}: Experience lacks required "role" field.`);
        }
    }
    if (metadata.type === 'research') {
        if (metadata.authors && !Array.isArray(metadata.authors)) {
            throw new Error(`Validation Error in ${filePath}: Research "authors" must be an array.`);
        }
        if (!metadata.venue) {
            throw new Error(`Validation Error in ${filePath}: Research lacks required "venue" field.`);
        }
    }
    if (metadata.type === 'skill') {
        const validProficiencies = ['expert', 'proficient', 'familiar'];
        if (metadata.proficiency && !validProficiencies.includes(metadata.proficiency)) {
            throw new Error(`Validation Error in ${filePath}: Skill proficiency "${metadata.proficiency}" is invalid. Allowed: ${validProficiencies.join(', ')}`);
        }
        if (!metadata.category) {
            throw new Error(`Validation Error in ${filePath}: Skill lacks required "category" field.`);
        }
    }
}
// ============================================================================
// 4. THE LOADER IMPLEMENTATION
// ============================================================================
class ContentLoader {
    constructor(contentDir) {
        this.cache = null;
        this.contentDir = contentDir || path.join(process.cwd(), 'content');
    }
    /**
     * Recursively reads markdown files from content directory.
     */
    getMarkdownFiles(dir) {
        let results = [];
        if (!fs.existsSync(dir)) {
            return [];
        }
        const list = fs.readdirSync(dir);
        for (const file of list) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                results = results.concat(this.getMarkdownFiles(fullPath));
            }
            else if (file.endsWith('.md')) {
                results.push(fullPath);
            }
        }
        return results;
    }
    /**
     * Computes signature hash of raw document content.
     */
    computeHash(content) {
        return (0, crypto_1.createHash)('sha256').update(content).digest('hex');
    }
    /**
     * Loads, validates, and partitions all content documents.
     * If cache is populated, returns cached list.
     */
    loadAll() {
        return __awaiter(this, arguments, void 0, function* (forceReload = false) {
            if (this.cache && !forceReload) {
                return this.cache;
            }
            const files = this.getMarkdownFiles(this.contentDir);
            const documents = [];
            for (const filePath of files) {
                try {
                    const rawContent = fs.readFileSync(filePath, 'utf-8');
                    const hash = this.computeHash(rawContent);
                    // 1. Split frontmatter & body
                    const { metadata, body } = parseFrontmatter(rawContent);
                    // 2. Validate metadata
                    validateMetadata(metadata, filePath);
                    // 3. Partition sections
                    const sections = parseSections(body);
                    // 4. Construct typed document
                    const document = {
                        id: metadata.id,
                        title: metadata.title,
                        type: metadata.type,
                        schemaVersion: metadata.schema_version,
                        rawContent: body,
                        metadata: metadata,
                        sections,
                        hash
                    };
                    documents.push(document);
                }
                catch (err) {
                    console.error(`[ContentLoader] Failed parsing document: ${filePath}. Error: ${err === null || err === void 0 ? void 0 : err.message}`);
                    throw err; // Fail-fast on schema errors to prevent corruption
                }
            }
            this.cache = documents;
            return documents;
        });
    }
    /**
     * Clears the active memory cache.
     */
    clearCache() {
        this.cache = null;
    }
}
exports.ContentLoader = ContentLoader;
