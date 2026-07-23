const request = require("supertest");
const app = require("../../../app");
const prisma = require("../../core/config/prisma");
const { generateAccessToken } = require("../../core/utils/jwt");

describe("Builder Passport API Testing", () => {
    let user;
    let token;

    beforeAll(async () => {
        const timestamp = Date.now();
        user = await prisma.user.create({
            data: { name: "Passport Tester", email: `passport_${timestamp}@example.com`, password: "password123" }
        });
        token = generateAccessToken({ userId: user.id });
    });

    afterAll(async () => {
        await prisma.builderPassport.deleteMany({ where: { userId: user.id } });
        await prisma.user.delete({ where: { id: user.id } });
    });

    test("Create Builder Passport", async () => {
        const response = await request(app)
            .post("/api/v1/builderPassport")
            .set("Authorization", `Bearer ${token}`)
            .send({
                github: "https://github.com/tester",
                linkedin: "https://linkedin.com/in/tester",
                leetcode: "tester",
                portfolio: "https://tester.com"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.data).toHaveProperty("github", "https://github.com/tester");
    });

    test("Get My Builder Passport", async () => {
        const response = await request(app)
            .get("/api/v1/builderPassport")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.data).toHaveProperty("github", "https://github.com/tester");
    });

    test("Update Builder Passport", async () => {
        const response = await request(app)
            .put("/api/v1/builderPassport")
            .set("Authorization", `Bearer ${token}`)
            .send({
                github: "https://github.com/tester-updated",
                portfolio: "https://tester-updated.com"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.data).toHaveProperty("github", "https://github.com/tester-updated");
    });
});
