const swaggerJsdoc = require("swagger-jsdoc");


const options = {

    definition: {

        openapi: "3.0.0",

        info: {
            title: "Find My Partner API",
            version: "1.0.0",
            description:
                "API Documentation for Find My Partner Backend"
        },


        servers: [
            {
                url: "http://localhost:5000",
                description: "Local Server"
            }
        ],


        components: {

            securitySchemes: {

                bearerAuth: {

                    type: "http",

                    scheme: "bearer",

                    bearerFormat: "JWT"

                }

            }

        }

    },


    apis: [
        "./src/modules/**/*.routes.js"
    ]

};


const swaggerSpec = swaggerJsdoc(options);


module.exports = swaggerSpec;
