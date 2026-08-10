import { getAll, create } from "../repositories/listingRepository.js";



export async function createListing(data) {

  //main thing i didnt do correrctly
  const organization = data.organization?.trim();
  const title = data.title?.trim();
  const city = data.city?.trim();
  const description = data.description?.trim();

  if (!organization || !title || !city || !description) {
    throw new Error("All fields are required");  }

  return create({ organization, title, city, description });
}

export async function getAllListings() {
  return getAll();
}
