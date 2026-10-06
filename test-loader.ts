import { ContentLoader } from './src/lib/brain/loader';

async function test() {
  const loader = new ContentLoader();
  try {
    console.log("--- START PIE LOADER TESTING ---");
    console.log("Initializing scan on content/ directory...");
    const docs = await loader.loadAll();
    console.log("SCAN SUCCESS! Total parsed ContentDocument objects:", docs.length);
    console.log("\nParsed Document Details:");
    console.log(JSON.stringify(docs, null, 2));
    console.log("--- END PIE LOADER TESTING ---");
  } catch (err: any) {
    console.error("SCAN FAILED:", err?.message || err);
    process.exit(1);
  }
}

test();
