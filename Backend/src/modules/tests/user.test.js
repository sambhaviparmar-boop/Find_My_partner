const request = require("supertest");
const app = require("../../../app");
const prisma = require("../../core/config/prisma");
const { generateAccessToken } = require("../../core/utils/jwt");

describe("User API Testing", () => {
    let user;
    let token;

    beforeAll(async () => {
        const timestamp = Date.now();
        user = await prisma.user.create({
            data: {
                name: "User Tester",
                email: `user_${timestamp}@example.com`,
                password: "password123"
            }
        });
        token = generateAccessToken({ userId: user.id });
    });

    afterAll(async () => {
        await prisma.user.deleteMany({ where: { id: user.id } });
    });

    test("Get User By ID", async () => {
        const response = await request(app)
            .post(`/api/v1/user/${user.id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.data).toHaveProperty("email", user.email);
    });

    test("Update User", async () => {
        const response = await request(app)
            .post(`/api/v1/user/update/${user.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Updated Name"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.data).toHaveProperty("name", "Updated Name");
    });
});
