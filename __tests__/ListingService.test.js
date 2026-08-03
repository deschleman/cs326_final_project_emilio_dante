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
const { create, getAll } = await import("../repositories/listingRepository.js");

// instead of changing listingservice service out from a try/catch architecture and changing the test suite to more traditional ".toBe", ".ok", "expect"; change test suite to throwing the expression itself which would have been stored in a variable in 220-like test suite(?) except the suite isnt wrapped in a describe container this time as shown in unit 13 notes. Instead write individual test cases that reject/fail when missing a required field declared in our repo .js . Do this for all fields.

test("throws if title is missing", async () => {
  await expect(
    createListing({
      organization: "Mayo Clinic",
      city: "Boston",
      description: "Cancer clinic hours, 5 hours per shift",
    }),
  ).rejects.toThrow();
});

test("throws if city is missing", async () => {
  await expect(
    createListing({
      organization: "Mayo Clinic",
      title: "Come help now!",
      description: "Cancer clinic hours, 5 hours per shift",
    }),
  ).rejects.toThrow();
});

test("throws if org is missing", async () => {
  await expect(
    createListing({
      title: "Come help now!",
      city: "Boston",
      description: "Cancer clinic hours, 5 hours per shift",
    }),
  ).rejects.toThrow();
});

test("throws if description is missing", async () => {
  await expect(
    createListing({
      title: "Come help now!",
      city: "Boston",
      organization: "Mayo Clinic",
    }),
  ).rejects.toThrow();
});
