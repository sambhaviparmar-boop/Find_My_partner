const z = require('zod');

const createPreferenceSchema = z.object({
  body: z.object({
    categories: z.array(z.string().min(1)).optional(),
    budgetRange: z.string().optional(),
    shoppingType: z.string().optional(),
    preferredLocation: z.string().optional()
  })
});

const updatePreferenceSchema = z.object({
  body: z.object({
    categories: z.array(z.string().min(1)).optional(),
    budgetRange: z.string().optional(),
    shoppingType: z.string().optional(),
    preferredLocation: z.string().optional()
  })
});

const matchesSchema = z.object({
  query: z.object({
    category: z.string().optional(),
    location: z.string().optional(),
    shoppingType: z.string().optional()
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
  createPreferenceSchema,
  updatePreferenceSchema,
  matchesSchema,
  connectSchema
};
