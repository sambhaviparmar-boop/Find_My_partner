const z = require('zod');

const createProfileSchema = z.object({
  body: z.object({
    bio: z.string().max(500).optional(),
    interests: z.array(z.string().min(1)).optional(),
    gender: z.string().optional(),
    location: z.string().optional(),
    ageRange: z.string().optional()
  })
});

const updateProfileSchema = z.object({
  body: z.object({
    bio: z.string().max(500).optional(),
    interests: z.array(z.string().min(1)).optional(),
    gender: z.string().optional(),
    location: z.string().optional(),
    ageRange: z.string().optional()
  })
});

const matchesSchema = z.object({
  query: z.object({
    interests: z.string().optional(),
    location: z.string().optional(),
    gender: z.string().optional()
  }).partial()
});

const connectSchema = z.object({
  params: z.object({
    userId: z.coerce.number().int().positive()
  }),
  body: z.object({
    message: z.string().max(500).optional()
  }).optional()
});

module.exports = {
  createProfileSchema,
  updateProfileSchema,
  matchesSchema,
  connectSchema
};
