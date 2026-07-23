const request = require("supertest");
const app = require("../../../app");
const prisma = require("../../core/config/prisma");
const { generateAccessToken } = require("../../core/utils/jwt");

describe("Profile API Testing", () => {
    let user;
    let token;

    beforeAll(async () => {
        const timestamp = Date.now();
        user = await prisma.user.create({
            data: {
                name: "Profile Tester",
                email: `profile_${timestamp}@example.com`,
                password: "password123"
            }
        });
        token = generateAccessToken({ userId: user.id });
    });

    afterAll(async () => {
        await prisma.profile.deleteMany({ where: { userId: user.id } });
        await prisma.user.delete({ where: { id: user.id } });
    });

    test("Create Profile", async () => {
        const response = await request(app)
            .post("/api/v1/profile/create")
            .set("Authorization", `Bearer ${token}`)
            .send({
                bio: "Software developer tester.",
                avatar: "https://example.com/avatar.png",
                location: "New York",
                college: "Harvard",
                branch: "CS",
                year: 4
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.data).toHaveProperty("city", "New York");
    });

    test("Get My Profile", async () => {
        const response = await request(app)
            .get("/api/v1/profile/me")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.data).toHaveProperty("city", "New York");
    });

    test("Update Profile", async () => {
        const response = await request(app)
            .put("/api/v1/profile/update")
            .set("Authorization", `Bearer ${token}`)
            .send({
                bio: "Updated software developer tester.",
                location: "San Francisco",
                college: "Harvard",
                branch: "CS",
                year: 4
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.data).toHaveProperty("city", "San Francisco");
    });
});
