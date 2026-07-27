import { getListings, saveListings } from "../repositories/listingRepository.js";


export async function createListing(data) {
  const { organization, title, city, description } = data;

  if (!organization || !title || !city || !description) {
    throw new Error("All fields are required");
  }

  const listings = await getListings();



  const newListing = {
    id: listings.length + 1,
    organization,
    title,
    city,
    description
  };



  listings.push(newListing);

  await saveListings(listings);

  return newListing;
}

export async function getAllListings() {
  return await getListings();
}
