
const asyncHandler = require("../core/error/errorHandler");
const preferenceService = require("./preference.service");
const apiError = require("../core/error/apiError");
const apiResponse = require("../core/utils/apiResponse")


const createPreference = asyncHandler(async (req,res) => {
    

        const {userId,category,lookingFor,skillsNeeded,interests,locationPreference,maxDistance,isRemoteAllowed} = req.body;
        const preference = await preferenceService.createPreference({userId,category,lookingFor,skillsNeeded,interests,locationPreference,maxDistance,isRemoteAllowed});
        return res.status(201).json(new apiResponse(201,"Preference created successfully",preference));
   
        
   
}   )

const getPreference = asyncHandler(async (req,res) => {

    const {userId} = req.params;
    const preference = await preferenceService.getPreference(userId);
    return res.status(200).json(new apiResponse(200,"Preference fetched successfully",preference));

})

const updatePreference = asyncHandler(async (req,res) => {

    const {userId,category,lookingFor,skillsNeeded,interests,locationPreference,maxDistance,isRemoteAllowed} = req.body;
    const preference = await preferenceService.updatePreference({userId,category,lookingFor,skillsNeeded,interests,locationPreference,maxDistance,isRemoteAllowed});
    return res.status(200).json(new apiResponse(200,"Preference updated successfully",preference));

})

const deletePreference = asyncHandler(async (req,res) => {

    const {userId} = req.params;
    const preference = await preferenceService.deletePreference(userId);
    return res.status(200).json(new apiResponse(200,"Preference deleted successfully",preference));

})


const getPreferenceByUserId = asyncHandler(async (req,res) => {

    const {userId} = req.params;
    const preference = await preferenceService.getPreferenceByUserId(userId);
    return res.status(200).json(new apiResponse(200,"Preference fetched successfully",preference));

})

module.exports = {
    createPreference,
    getPreference,
    updatePreference,
    deletePreference,
    getPreferenceByUserId
}

