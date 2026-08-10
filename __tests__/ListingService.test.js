

import { jest } from "@jest/globals";




jest.unstable_mockModule("../repositories/listingRepository.js", () => ({

  isValidId: jest.fn(() => true),
  getAll: jest.fn(),
  findById: jest.fn(),

  create: jest.fn(),
  updateById: jest.fn(),
  removeById: jest.fn(),

}));

const { createListing, getAllListings } =
  await import("../services/listingService.js");


const {
  create,
  getAll,
} = await import("../repositories/listingRepository.js");


beforeEach(() => {
  jest.clearAllMocks();

});

test("throws if title is missing", async () => {
  await expect(
    createListing({

      organization: "Mayo Clinic",
      city: "Boston",
      description: "Cancer clinic hours, 5 hours per shift",
    }),
  ).rejects.toThrow("All fields are required");
});



test("throws if city is missing", async () => {
  await expect(
    createListing({

      organization: "Mayo Clinic",
      title: "Come help now!",
      description: "Cancer clinic hours, 5 hours per shift",
    }),
  ).rejects.toThrow("All fields are required");

});



test("throws if organization is missing", async () => {
  await expect(
    createListing({
      title: "Come help now!",
      city: "Boston",
      description: "Cancer clinic hours, 5 hours per shift",
    }),
  ).rejects.toThrow("All fields are required");
});



test("throws if description is missing", async () => {
  await expect(
    createListing({
      title: "Come help now!",
      city: "Boston",
      organization: "Mayo Clinic",
    }),
  ).rejects.toThrow("All fields are required");
});

test("creates a valid listing", async () => {
  const savedListing = {
    _id: "fake-id",
    organization: "Mayo Clinic",
    title: "Volunteer Shift",
    city: "Boston",
    description: "Help visitors.",
  };


  create.mockResolvedValue(savedListing);

  await expect(

    createListing({
      organization: "Mayo Clinic",
      title: "Volunteer Shift",
      city: "Boston",
      description: "Help visitors.",
    }),
  ).resolves.toEqual(savedListing);

  expect(create).toHaveBeenCalledWith({
    organization: "Mayo Clinic",

    title: "Volunteer Shift",
    city: "Boston",
    description: "Help visitors.",
  });
});



test("rejects an organization containing only spaces", async () => {
  await expect(
    createListing({
      organization: "   ",
      title: "Volunteer Shift",

      city: "Boston",
      description: "Help visitors.",
    }),
  ).rejects.toThrow("All fields are required");

  expect(create).not.toHaveBeenCalled();

});



test("rejects a title containing only spaces", async () => {
  await expect(
    createListing({
      organization: "Mayo Clinic",

      title: "   ",
      city: "Boston",
      description: "Help visitors.",
    }),
  ).rejects.toThrow("All fields are required");


  expect(create).not.toHaveBeenCalled();
});

test("trims values before saving a listing", async () => {
  create.mockResolvedValue({ _id: "fake-id" });

  await createListing({
    organization: "  Mayo Clinic  ",
    title: "  Volunteer Shift  ",
    city: "  Boston  ",
    description: "  Help visitors.  ",
  });

  expect(create).toHaveBeenCalledWith({
    organization: "Mayo Clinic",

    title: "Volunteer Shift",
    city: "Boston",
    description: "Help visitors.",
  });
});



test("returns all listings", async () => {
  const listings = [{ title: "Volunteer Shift" }];
  getAll.mockResolvedValue(listings);

  await expect(getAllListings()).resolves.toEqual(listings);
});
