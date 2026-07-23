const Joi = require("joi");

const createStudyPost = () => {

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

        subject: Joi.string()
            .valid(
                "DSA",
                "Java",
                "Python",
                "JavaScript",
                "React",
                "Node.js",
                "DBMS",
                "OS",
                "CN",
                "AIML",
                "SQL",
                "Other"
            )
            .required(),

        studyMode: Joi.string()
            .valid(
                "Online",
                "Offline",
                "Hybrid"
            )
            .required(),

        location: Joi.string()
            .trim()
            .max(100)
            .optional(),

        preferredTime: Joi.string()
            .trim()
            .max(50)
            .optional(),

        level: Joi.string()
            .valid(
                "Beginner",
                "Intermediate",
                "Advanced"
            )
            .required(),

        createdById: Joi.number()
            .integer()
            .positive()
            .required()

    });

};


const updateStudyPost = () => {

    return Joi.object({

        title: Joi.string()
            .trim()
            .min(3)
            .max(100),

        description: Joi.string()
            .trim()
            .min(10)
            .max(500),

        subject: Joi.string()
            .valid(
                "DSA",
                "Java",
                "Python",
                "JavaScript",
                "React",
                "Node.js",
                "DBMS",
                "OS",
                "CN",
                "AIML",
                "SQL",
                "Other"
            ),

        studyMode: Joi.string()
            .valid(
                "Online",
                "Offline",
                "Hybrid"
            ),

        location: Joi.string()
            .trim()
            .max(100),

        preferredTime: Joi.string()
            .trim()
            .max(50),

        level: Joi.string()
            .valid(
                "Beginner",
                "Intermediate",
                "Advanced"
            )

    }).min(1);

};


module.exports = {
    createStudyPost,
    updateStudyPost
};