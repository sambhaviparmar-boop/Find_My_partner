const z = require('zod');

const createProfileSchema = z.object({
  body: z.object({
    industry: z.string().min(1).optional(),
    currentRole: z.string().min(1).optional(),
    experience: z.coerce.number().int().nonnegative().optional(),
    goals: z.string().optional(),
    availability: z.string().optional(),
    location: z.string().optional()
  })
});

const updateProfileSchema = z.object({
  body: z.object({
    industry: z.string().min(1).optional(),
    currentRole: z.string().min(1).optional(),
    experience: z.coerce.number().int().nonnegative().optional(),
    goals: z.string().optional(),
    availability: z.string().optional(),
    location: z.string().optional()
  })
});

const discoverSchema = z.object({
  query: z.object({
    industry: z.string().optional(),
    skills: z.string().optional(),
    experience: z.string().optional(),
    location: z.string().optional(),
    availability: z.string().optional()
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
  discoverSchema,
  connectSchema
};
