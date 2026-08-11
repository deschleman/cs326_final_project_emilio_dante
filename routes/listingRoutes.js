import express from "express";
import {
  showListings,
  addListing,
  destroy,
} from "../controllers/listingController.js";
import { requireLogin } from "../middleware/requireLogin.js";

const router = express.Router();

router.get("/", showListings);

router.post("/", requireLogin, addListing);

router.delete("/:id", requireLogin, destroy);

export default router;
