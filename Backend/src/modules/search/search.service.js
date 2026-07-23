const searchRepo = require("./search.repository");



const createSearchHistoryService = async (data) => {
     
    return await searchRepo.createSearchHistoryRepo(data);
}


const getMySearchHistoryService = async (data) => {

    return await searchRepo.getMySearchHistoryRepo(data);
}


const getAllSearchHistoryService = async ( ) => {

    return await searchRepo.getAllSearchHistoryRepo();
}


module.exports = {
    createSearchHistoryService,
    getMySearchHistoryService,
    getAllSearchHistoryService
}   
