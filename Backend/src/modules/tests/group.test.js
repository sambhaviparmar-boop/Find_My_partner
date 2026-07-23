const request = require("supertest");
const app = require("../../../app");
const prisma = require("../../core/config/prisma");
const { generateAccessToken } = require("../../core/utils/jwt");

describe("Group API Testing", () => {
    let user;
    let token;
    let group;

    beforeAll(async () => {
        const timestamp = Date.now();
        user = await prisma.user.create({
            data: { name: "Group Tester", email: `group_${timestamp}@example.com`, password: "password123" }
        });
        token = generateAccessToken({ userId: user.id });
    });

    afterAll(async () => {
        if (group) {
            await prisma.group.deleteMany({ where: { id: group.id } });
        }
        await prisma.user.delete({ where: { id: user.id } });
    });

    test("Create Group", async () => {
        const response = await request(app)
            .post("/api/v1/group/create")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: `Test Group ${Date.now()}`,
                description: "Test Group Description",
                category: "WEB",
                vertical: "WEB",
                maxMembers: 5,
                isPublic: true
            });

        expect(response.statusCode).toBe(201);
        group = response.body.data;
        expect(group).toHaveProperty("id");
    });

    test("Get Group By ID", async () => {
        const response = await request(app)
            .get(`/api/v1/group/${group.id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.data).toHaveProperty("id", group.id);
    });

    test("Get All Groups", async () => {
        const response = await request(app)
            .get("/api/v1/group")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
    });
});
