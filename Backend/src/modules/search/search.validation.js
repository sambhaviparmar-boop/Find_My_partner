const  z = require("zod");


const createSearchHistoryValidation = z.object({
    userId: z.number(),
    query: z.string(),
    resultsCount: z.number()
})


const getMySearchHistoryValidation = z.object({
    userId: z.number()
})


const getAllSearchHistoryValidation = z.object({
    
})


module.exports = {
    
    createSearchHistoryValidation,
    getMySearchHistoryValidation,
    getAllSearchHistoryValidation
}       

