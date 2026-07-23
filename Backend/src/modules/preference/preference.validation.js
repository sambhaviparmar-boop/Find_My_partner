const z = require("zod")

const createPreferenceValidation = z.object({
    userId: z.string(),
    category: z.string(),
    lookingFor: z.string(),
    skillsNeeded: z.array(z.string()),
    interests: z.array(z.string()),
    locationPreference: z.string(),
    maxDistance: z.number(),
    isRemoteAllowed: z.boolean()
});

const updatePreferenceValidation = z.object({
    userId: z.string(),
    category: z.string(),
    lookingFor: z.string(),
    skillsNeeded: z.array(z.string()),
    interests: z.array(z.string()),
    locationPreference: z.string(),
    maxDistance: z.number(),
    isRemoteAllowed: z.boolean()
});

module.exports = {
    createPreferenceValidation,
    updatePreferenceValidation
};      
