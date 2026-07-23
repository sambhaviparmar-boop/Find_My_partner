const request = require("supertest");
const app = require("../../../app");
const prisma = require("../../core/config/prisma");
const { generateAccessToken } = require("../../core/utils/jwt");

describe("Admin API Testing", () => {
    let user;
    let token;

    beforeAll(async () => {
        const timestamp = Date.now();
        user = await prisma.user.create({
            data: { name: "Admin Tester", email: `admin_${timestamp}@example.com`, password: "password123" }
        });
        token = generateAccessToken({ userId: user.id });
    });

    afterAll(async () => {
        await prisma.user.delete({ where: { id: user.id } });
    });

    test("Get All Users as Admin", async () => {
        const response = await request(app)
            .get("/api/v1/admin/users")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
    });
});
