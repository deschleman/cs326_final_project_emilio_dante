

import "dotenv/config";
import mongoose from "mongoose";

import bcrypt from "bcrypt";
import User from "./models/userModel.js";

// the last thing i need for others to be abnle to seed intop out DB when running a clone on a new machine not configed yet

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  organization: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

});



const Listing = mongoose.model("Listing", listingSchema);


try {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing from .env");
  }


  await mongoose.connect(process.env.MONGODB_URI);


  console.log("Connected to MongoDB.");


  const seedEmail = "seed@example.com";
  const seedPassword = "SeedPassword";

  let user = await User.findOne({ email: seedEmail });


  if (!user) {
    const passwordHash = await bcrypt.hash(seedPassword, 10);



    user = await User.create({
      email: seedEmail,
      passwordHash,
      role: "member",
    });


    console.log("Created seed user.");
  } else {
    console.log("Seed user already exists.");
  }


  await Listing.deleteMany({});


  await Listing.insertMany([
    {
      title: "Community Cleanup",
      organization: "Community Volunteers",
      description: "Help clean up a local community area.",
      city: "Amherst",
      ownerId: user._id,
    },


    {
      title: "Food Drive",
      organization: "Amherst Food Bank",
      description: "Help organize and distribute donated food.",
      city: "Amherst",
      ownerId: user._id,
    },

    {
      title: "Youth Mentoring",
      organization: "Community Youth Center",
      description: "Volunteer to support local students and young people.",
      city: "Amherst",
      ownerId: user._id,
    },

  ]);



  console.log("Database seeded successfully.");
  console.log("");
  console.log("Seed user:");
  console.log(`Email: ${seedEmail}`);
  console.log(`Password: ${seedPassword}`);
  console.log("");
  console.log("Created 3 listings.");
} catch (error) {

  console.error("Database seed failed:", error);
  process.exitCode = 1;
} finally {

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB.");
}
