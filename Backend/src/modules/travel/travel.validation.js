const Joi = require("joi");

const createTravelPost = () => {

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

        source: Joi.string()
            .trim()
            .required(),

        destination: Joi.string()
            .trim()
            .required(),

        travelDate: Joi.date()
            .required(),

        transportation: Joi.string()
            .valid(
                "Car",
                "Bike",
                "Train",
                "Bus",
                "Flight",
                "Other"
            )
            .required(),

        budget: Joi.number()
            .integer()
            .positive()
            .optional(),

        genderPreference: Joi.string()
            .valid(
                "Male",
                "Female",
                "Any"
            )
            .optional(),

        createdById: Joi.number()
            .integer()
            .positive()
            .required()

    });

};


const updateTravelPost = () => {

    return Joi.object({

        title: Joi.string()
            .trim()
            .min(3)
            .max(100),

        description: Joi.string()
            .trim()
            .min(10)
            .max(500),

        source: Joi.string(),

        destination: Joi.string(),

        travelDate: Joi.date(),

        transportation: Joi.string()
            .valid(
                "Car",
                "Bike",
                "Train",
                "Bus",
                "Flight",
                "Other"
            ),

        budget: Joi.number()
            .integer()
            .positive(),

        genderPreference: Joi.string()
            .valid(
                "Male",
                "Female",
                "Any"
            )

    }).min(1);

};

module.exports = {
    createTravelPost,
    updateTravelPost
};