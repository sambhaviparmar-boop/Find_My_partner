const Joi = require("joi");

const createFitnessPost = () => {

    return Joi.object({

        title: Joi.string()
            .trim()
            .min(3)
            .max(100)
            .required(),

        description: Joi.string()
            .trim()
            .min(10)
            .max(500)
            .required(),

        location: Joi.string()
            .trim()
            .max(100)
            .optional(),

        fitnessType: Joi.string()
            .valid(
                "Gym",
                "Yoga",
                "Running",
                "Cycling",
                "Swimming",
                "CrossFit",
                "Zumba",
                "Other"
            )
            .required(),

        createdById: Joi.number()
            .integer()
            .positive()
            .required()

    });

};


const updateFitnessPost = () => {

    return Joi.object({

        title: Joi.string()
            .trim()
            .min(3)
            .max(100),

        description: Joi.string()
            .trim()
            .min(10)
            .max(500),

        location: Joi.string()
            .trim()
            .max(100),

        fitnessType: Joi.string()
            .valid(
                "Gym",
                "Yoga",
                "Running",
                "Cycling",
                "Swimming",
                "CrossFit",
                "Zumba",
                "Other"
            )

    }).min(1);

};


module.exports = {
    createFitnessPost,
    updateFitnessPost
};