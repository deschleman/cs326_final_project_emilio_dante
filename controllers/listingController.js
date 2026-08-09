
import { createListing, getAllListings } from "../services/listingService.js";

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
