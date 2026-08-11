import {
  createListing,
  getAllListings,
  deleteListing,
} from "../services/listingService.js";
import { isValidId } from "../repositories/listingRepository.js";

export async function showListings(req, res) {
  const listings = await getAllListings();

  res.render("listings", { listings });
}

export async function addListing(req, res) {
  try {
    // saves returneed listing so controller can render as htmx card.
    const listing = await createListing(req.body);

    if (req.get("HX-Request") === "true") {
      res.status(201).render("partials/listing-card", { listing });
      return;
    }

    res.redirect(303, "/listings");
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// delete mechanism
export async function destroy(req, res) {
  const { id } = req.params;
  if (!isValidId(id)) {
    res.status(400).json({ error: "id must be a valid id" });
    return;
  }
  const result = await deleteListing(id, req.user);
  if (!result.ok) {
    res.status(result.error.status).json({ error: result.error.message });
    return;
  }
  res.status(200).send("");
}
