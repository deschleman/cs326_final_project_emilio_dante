import { createListing, getAllListings } from "../services/listingService.js";

export async function showListings(req, res) {
  const listings = await getAllListings();

  res.render("listings", { listings });
}




export async function addListing(req, res) {
  try {
    await createListing(req.body);

    res.redirect("/listings");


  } catch (error) {


    res.status(400).send(error.message);

  }
}
