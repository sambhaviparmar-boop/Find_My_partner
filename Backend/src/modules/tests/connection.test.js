const request = require("supertest");
const app = require("../../../app");
const prisma = require("../../core/config/prisma");
const { generateAccessToken } = require("../../core/utils/jwt");

describe("Connection API Testing", () => {
    let user1, user2;
    let token1;
    let connection;

    beforeAll(async () => {
        const timestamp = Date.now();
        user1 = await prisma.user.create({
            data: { name: "Conn User 1", email: `conn1_${timestamp}@example.com`, password: "password123" }
        });
        user2 = await prisma.user.create({
            data: { name: "Conn User 2", email: `conn2_${timestamp}@example.com`, password: "password123" }
        });
        token1 = generateAccessToken({ userId: user1.id });
    });

    afterAll(async () => {
        if (connection) {
            await prisma.connection.delete({ where: { id: connection.id } });
        }
        await prisma.user.deleteMany({ where: { id: { in: [user1.id, user2.id] } } });
    });

    test("Create Connection Request", async () => {
        const response = await request(app)
            .post("/api/v1/connection")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                category: "HACKATHON",
                senderId: user1.id,
                receiverId: user2.id,
                message: "Let's collaborate!"
            });

        expect(response.statusCode).toBe(201);
        connection = response.body.data;
        expect(connection).toHaveProperty("id");
    });

    test("Get Connection By ID", async () => {
        const response = await request(app)
            .get(`/api/v1/connection/${connection.id}`)
            .set("Authorization", `Bearer ${token1}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.data).toHaveProperty("id", connection.id);
    });

    test("Get All Connections", async () => {
        const response = await request(app)
            .get("/api/v1/connection")
            .set("Authorization", `Bearer ${token1}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
    });
});
