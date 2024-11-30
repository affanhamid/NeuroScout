import { NextRequest } from "next/server";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { GET, POST } from "@/app/api/organizations/routes"; // Import API route handlers
import { OrganizationModel } from "@/db";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  // Start an in-memory MongoDB server
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  // Connect Mongoose to the in-memory database
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Disconnect and stop the in-memory server
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  // Clear the database before each test
  await OrganizationModel.deleteMany({});
});

describe("Organizations API", () => {
  it("should fetch all organizations (GET /api/organizations)", async () => {
    // Seed the database with test data
    await OrganizationModel.create([
      { name: "Organization 1" },
      { name: "Organization 2" },
    ]);

    // Simulate a GET request
    const req = new NextRequest("http://localhost/api/organizations");
    const res: any = await GET(req);

    // Parse the response
    const jsonResponse = await res.json();

    // Assertions
    expect(res.status).toBe(200);
    expect(jsonResponse.success).toBe(true);
    expect(jsonResponse.data).toHaveLength(2);
    expect(jsonResponse.data[0].name).toBe("Organization 1");
    expect(jsonResponse.data[1].name).toBe("Organization 2");
  });

  it("should create a new organization (POST /api/organizations)", async () => {
    const newOrg = { name: "New Organization" };

    // Simulate a POST request
    const req = new NextRequest("http://localhost/api/organizations", {
      method: "POST",
      body: JSON.stringify(newOrg),
      headers: { "Content-Type": "application/json" },
    });
    const res: any = await POST(req);

    // Parse the response
    const jsonResponse = await res.json();

    // Assertions
    expect(res.status).toBe(201);
    expect(jsonResponse.success).toBe(true);
    expect(jsonResponse.data.name).toBe(newOrg.name);

    // Verify in the database
    const orgInDb = await OrganizationModel.findOne({ name: newOrg.name });
    expect(orgInDb).not.toBeNull();
    expect(orgInDb!.name).toBe(newOrg.name);
  });

  it("should return an empty array if no organizations exist (GET /api/organizations)", async () => {
    // Simulate a GET request
    const req = new NextRequest("http://localhost/api/organizations");
    const res: any = await GET(req);

    // Parse the response
    const jsonResponse = await res.json();

    // Assertions
    expect(res.status).toBe(200);
    expect(jsonResponse.success).toBe(true);
    expect(jsonResponse.data).toHaveLength(0);
  });

  it("should handle invalid JSON in POST (POST /api/organizations)", async () => {
    // Simulate a POST request with invalid JSON
    const req = new NextRequest("http://localhost/api/organizations", {
      method: "POST",
      body: "invalid-json", // Invalid body
      headers: { "Content-Type": "application/json" },
    });

    // Expect the POST handler to handle the error
    try {
      await POST(req);
    } catch (error: any) {
      expect(error.status).toBe(400);
      expect(error.message).toContain("Invalid JSON");
    }
  });
});
