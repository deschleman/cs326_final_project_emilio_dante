import { getAll, create } from "../repositories/listingRepository.js";


export async function createListing(data) {
  const { organization, title, city, description } = data;

  if (!organization || !title || !city || !description) {
    throw new Error("All fields are required");
  }

  const newListing = await create({organization, title, city, description});

  return newListing;
}

export async function getAllListings() {
  return await getAll();
}
