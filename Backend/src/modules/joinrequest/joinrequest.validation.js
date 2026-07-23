const z = require("zod");

const joinRequestCreateSchema = z.object({
  params: z.object({
    groupId: z.coerce.number().int().positive().optional(),
  }).partial(),
  body: z.object({
    groupId: z.coerce.number().int().positive().optional(),
    message: z.string().max(500).optional(),
  }).passthrough(),
});



const joinRequestActionSchema = z.object({
  params: z.object({
    requestId: z.coerce.number().int().positive().optional(),
  }).partial(),
  body: z.object({
    requestId: z.coerce.number().int().positive().optional(),
    action: z.enum(["accept", "reject"]).optional(),
  }).passthrough(),
});


const groupRequestSchema = z.object({
  params: z.object({
    groupId: z.coerce.number().int().positive().optional(),
  }).partial(),
});

const cancelJoinRequestSchema = z.object({
  params: z.object({
    requestId: z.coerce.number().int().positive().optional(),
  }).partial(),
  body: z.object({
    requestId: z.coerce.number().int().positive().optional(),
  }).partial().passthrough(),
});









module.exports = {
    joinRequestCreateSchema,
    joinRequestActionSchema,
    groupRequestSchema,
    cancelJoinRequestSchema
};


