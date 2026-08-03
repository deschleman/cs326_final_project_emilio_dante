// import { readFile, writeFile } from "fs/promises";

// const FILE = "listings.json";

// export async function getListings() {
//   const data = await readFile(FILE, "utf-8");
//   return JSON.parse(data);
// }

// export async function saveListings(listings) {
//   await writeFile(FILE, JSON.stringify(listings, null, 2));
// }

import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    organization: { type: Date, required: true },
    description: { type: Number, min: 0, max: 100 },
    city: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Listings = mongoose.model("Listing", ListingSchema);

export const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);
export const getAll = async () => Listings.find().sort({ date: 1 }).lean();
export const findById = async (id) => Listings.findById(id).lean();
export const create = async (data) => (await Listings.create(data)).toObject();
export const updateById = async (id, data) =>
  Listings.findByIdAndUpdate(id, data, { new: true }).lean();
export const removeById = async (id) => {
  await Listings.findByIdAndDelete(id);
};
