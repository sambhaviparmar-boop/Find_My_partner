const request = require("supertest");
const app = require("../../../app");
const prisma = require("../../core/config/prisma");
const { generateAccessToken } = require("../../core/utils/jwt");

describe("AI Matching API Testing", () => {
    let user;
    let token;

    beforeAll(async () => {
        const timestamp = Date.now();
        user = await prisma.user.create({
            data: { name: "AI Tester", email: `ai_${timestamp}@example.com`, password: "password123" }
        });
        token = generateAccessToken({ userId: user.id });
    });

    afterAll(async () => {
        await prisma.user.delete({ where: { id: user.id } });
    });

    test("Find Similar Users via AI", async () => {
        const response = await request(app)
            .get(`/api/v1/ai/findSimilarUsers/${user.id}`)
            .set("Authorization", `Bearer ${token}`);

        expect([200, 404]).toContain(response.statusCode);
    });
});
