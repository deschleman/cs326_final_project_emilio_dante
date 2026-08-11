import {
  getAll,
  create,
  findById,
  removeById,
} from "../repositories/listingRepository.js";
import { Ok, Err } from "../result.js";
import * as usersRepository from "../repositories/usersRepository.js";

// lets go off of unit 18 as a base

export async function createListing(data, actor) {

  const organization = data.organization?.trim();
  const title = data.title?.trim();
  const city = data.city?.trim();
  const description = data.description?.trim();

  if (!organization || !title || !city || !description) {
    throw new Error("All fields are required");
  }

  return create({ organization, title, city, description, ownerId: actor.id });
}

export async function getAllListings() {
  return getAll();
}

const isOwnerOrAdmin = async (listing, actorId) => {
  if (listing.ownerId.toString() === actorId) return true;
  const account = await usersRepository.findById(actorId);
  return account?.role === "admin";
};

export async function deleteListing(id, actor) {
  const existing = await findById(id);
  if (!existing) return Err({ status: 404, message: "Listing not found" });
  if (!(await isOwnerOrAdmin(existing, actor.id))) {
    return Err({
      status: 403,
      message: "You do not have permission to delete this listing",
    });
  }
  await removeById(id);
  return Ok(null);
}
