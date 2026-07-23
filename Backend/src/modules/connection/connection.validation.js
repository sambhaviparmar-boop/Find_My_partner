const z = require("zod");


const createConnectionValidation = z.object({
  body: z.object({
    senderId: z.coerce.number().int().positive(),
    receiverId: z.coerce.number().int().positive(),
    connectionType: z.enum(["work", "social", "friendship"]), // or whatever the actual enum values are
    status: z.enum(["pending", "accepted", "rejected"]).optional(),
  }),
});

const getConnectionValidation = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
});

const updateConnectionValidation = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
  body: z.object({
    status: z.enum(["pending", "accepted", "rejected"]),
  }),
});

const deleteConnectionValidation = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
});

module.exports = {
  createConnectionValidation,
  getConnectionValidation,
  updateConnectionValidation,
  deleteConnectionValidation,
};

