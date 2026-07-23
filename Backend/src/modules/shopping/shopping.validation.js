const Joi = require("joi");

const createShoppingPost = () => {

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

        category: Joi.string()
            .valid(
                "Clothing",
                "Groceries",
                "Electronics",
                "Furniture",
                "Books",
                "Accessories",
                "Beauty",
                "Other"
            )
            .required(),

        budget: Joi.number()
            .integer()
            .positive()
            .optional(),

        createdById: Joi.number()
            .integer()
            .positive()
            .required()

    });

};


const updateShoppingPost = () => {

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

        category: Joi.string()
            .valid(
                "Clothing",
                "Groceries",
                "Electronics",
                "Furniture",
                "Books",
                "Accessories",
                "Beauty",
                "Other"
            ),

        budget: Joi.number()
            .integer()
            .positive()

    }).min(1);

};


module.exports = {
    createShoppingPost,
    updateShoppingPost
};