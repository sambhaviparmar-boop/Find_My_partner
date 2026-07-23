const request = require("supertest");
const app = require("../../../app");
const prisma = require("../../core/config/prisma");
const { generateAccessToken } = require("../../core/utils/jwt");

describe("Chat API Testing", () => {
    let user1, user2;
    let token1;
    let chat;

    beforeAll(async () => {
        const timestamp = Date.now();
        user1 = await prisma.user.create({
            data: { name: "Chat User 1", email: `chat1_${timestamp}@example.com`, password: "password123" }
        });
        user2 = await prisma.user.create({
            data: { name: "Chat User 2", email: `chat2_${timestamp}@example.com`, password: "password123" }
        });
        token1 = generateAccessToken({ userId: user1.id });
    });

    afterAll(async () => {
        if (chat) {
            await prisma.message.deleteMany({ where: { chatId: chat.id } });
            await prisma.chat.delete({ where: { id: chat.id } });
        }
        await prisma.user.deleteMany({ where: { id: { in: [user1.id, user2.id] } } });
    });

    test("Create Chat", async () => {
        const response = await request(app)
            .post("/api/v1/chat")
            .set("Authorization", `Bearer ${token1}`)
            .send({
                senderId: String(user1.id),
                receiverId: String(user2.id)
            });

        expect(response.statusCode).toBe(200);
        chat = response.body.data;
        expect(chat).toHaveProperty("id");
    });

    test("Get Chat By ID", async () => {
        const response = await request(app)
            .get(`/api/v1/chat/${chat.id}`)
            .set("Authorization", `Bearer ${token1}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.data).toHaveProperty("id", chat.id);
    });

    test("Get Online Users", async () => {
        const response = await request(app)
            .get("/api/v1/chat/online-users")
            .set("Authorization", `Bearer ${token1}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
    });
});
