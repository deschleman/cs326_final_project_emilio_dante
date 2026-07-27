import express from "express";
import { showListings, addListing } from "../controllers/listingController.js";

const router = express.Router();



router.get("/listings", showListings);

router.post("/listings", addListing);


export default router;
