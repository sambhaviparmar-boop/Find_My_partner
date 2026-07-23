const ApiError = require("../utils/apiError")
 
const validate = (schema) => {
    return (req, res, next) => {
        const shape = schema?.shape || {};
        const hasNestedKeys = Object.keys(shape).some((key) => ['body', 'params', 'query'].includes(key));

        const dataToValidate = hasNestedKeys
            ? { body: req.body, params: req.params, query: req.query }
            : req.body;

        const result = schema.safeParse(dataToValidate);

        if (!result.success) {
            return next(
                new ApiError(400, result.error.issues[0].message)
            );
        }

        if (hasNestedKeys) {
            if (result.data.body !== undefined) req.body = result.data.body;
            if (result.data.params !== undefined) req.params = result.data.params;
            if (result.data.query !== undefined) req.query = result.data.query;
        } else {
            req.body = result.data;
        }

        next();
    };
};

module.exports = validate;