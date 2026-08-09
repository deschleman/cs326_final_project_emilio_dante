import express from "express";
import { showListings, addListing } from "../controllers/listingController.js";

const router = express.Router();



router.get("/", showListings);

router.post("/", addListing);


export default router;
