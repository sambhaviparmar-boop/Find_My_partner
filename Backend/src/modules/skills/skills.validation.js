const z = require("zod");


// =======================
// Skill Validation
// =======================


const createSkillSchema = z.object({

    body: z.object({

        name: z
            .string()
            .min(2, "Skill name must be at least 2 characters"),

        category: z
            .string()
            .min(2, "Category is required")

    })

});



const updateSkillSchema = z.object({

    params: z.object({

        id: z.string()

    }),

    body: z.object({

        name: z
            .string()
            .min(2)
            .optional(),

        category: z
            .string()
            .min(2)
            .optional()

    })

});



const getSkillByIdSchema = z.object({

    params: z.object({

        id: z.string()

    })

});



const deleteSkillSchema = z.object({

    params: z.object({

        id: z.string()

    })

});




// =======================
// User Skill Validation
// =======================


const createUserSkillSchema = z.object({

    body: z.object({

        skillId: z
            .number()
            .positive(),

        level: z
            .string()
            .min(2),

        experience: z
            .number()
            .min(0)
            .optional()

    })

});



const updateUserSkillSchema = z.object({

    params: z.object({

        id: z.string()

    }),

    body: z.object({

        level: z
            .string()
            .min(2)
            .optional(),

        experience: z
            .number()
            .min(0)
            .optional()

    })

});



const getUserSkillByIdSchema = z.object({

    params: z.object({

        id: z.string()

    })

});


const deleteUserSkillSchema = z.object({

    params: z.object({

        id: z.string()

    })

});



module.exports = {

    createSkillSchema,
    updateSkillSchema,
    getSkillByIdSchema,
    deleteSkillSchema,


    createUserSkillSchema,
    updateUserSkillSchema,
    getUserSkillByIdSchema,
    deleteUserSkillSchema

};