import { readFile, writeFile } from "fs/promises";

const FILE = "listings.json";




export async function getListings() {
  const data = await readFile(FILE, "utf-8");
  return JSON.parse(data);
}


export async function saveListings(listings) {
  await writeFile(FILE, JSON.stringify(listings, null, 2));
}
