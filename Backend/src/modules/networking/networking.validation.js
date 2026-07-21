const Joi = require("joi");


const createNetworkingPost = () => {

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

        profession: Joi.string()
            .trim()
            .max(100)
            .required(),

        industry: Joi.string()
            .trim()
            .max(100)
            .optional(),

        networkingGoal: Joi.string()
            .valid(
                "Knowledge Sharing",
                "Career Guidance",
                "Job Referral",
                "Mentorship",
                "Collaboration",
                "Business Networking",
                "Open Source",
                "Hackathon Team",
                "Startup Networking"
            )
            .required(),

        experienceLevel: Joi.string()
            .valid(
                "Student",
                "Beginner",
                "Intermediate",
                "Experienced"
            )
            .required(),

        location: Joi.string()
            .trim()
            .max(100)
            .optional(),

        mode: Joi.string()
            .valid(
                "Online",
                "Offline",
                "Hybrid"
            )
            .required(),

        createdById: Joi.number()
            .integer()
            .positive()
            .required()

    });

};


const updateNetworkingPost = () => {

    return Joi.object({

        title: Joi.string()
            .trim()
            .min(3)
            .max(100),

        description: Joi.string()
            .trim()
            .min(10)
            .max(500),

        profession: Joi.string()
            .trim()
            .max(100),

        industry: Joi.string()
            .trim()
            .max(100),

        networkingGoal: Joi.string()
            .valid(
                "Knowledge Sharing",
                "Career Guidance",
                "Job Referral",
                "Mentorship",
                "Collaboration",
                "Business Networking",
                "Open Source",
                "Hackathon Team",
                "Startup Networking"
            ),

        experienceLevel: Joi.string()
            .valid(
                "Student",
                "Beginner",
                "Intermediate",
                "Experienced"
            ),

        location: Joi.string()
            .trim()
            .max(100),

        mode: Joi.string()
            .valid(
                "Online",
                "Offline",
                "Hybrid"
            )

    }).min(1);

};


module.exports = {
    createNetworkingPost,
    updateNetworkingPost
};