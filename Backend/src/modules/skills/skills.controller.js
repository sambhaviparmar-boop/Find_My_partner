const skillServices = require("./skills.services")
const asyncHandler = require("../../core/utils/asyncHandler")
const ApiResponse = require("../../core/utils/apiResponce")

const createSkillController = asyncHandler(async (req,res) => { 
    const {name,category} = req.body
    const skill = await skillServices.createSkillService({name,category})
    return res.status(201).json(new ApiResponse(200,"Skill created successfully",skill))
})

const getAllSkillsController = asyncHandler(async (req,res) => {
    const skills = await skillServices.getAllSkillsService()
    return res.status(200).json(new ApiResponse(200,"Skills fetched successfully",skills))
})

const getSkillByIdController = asyncHandler(async (req,res) => {
    const {id} = req.params
    const skill = await skillServices.getSkillByIdService({id})
    return res.status(200).json(new ApiResponse(200,"Skill fetched successfully",skill))
})

const updateSkillController = asyncHandler(async (req,res) => {
    const {id} = req.params
    const {name,category} = req.body
    const skill = await skillServices.updateSkillService({id,name,category})
    return res.status(200).json(new ApiResponse(200,"Skill updated successfully",skill))
})

const deleteSkillController = asyncHandler(async (req,res) => {
    const {id} = req.params
    const skill = await skillServices.deleteSkillService({id})
    return res.status(200).json(new ApiResponse(200,"Skill deleted successfully",skill))
})

const createUserskillController = asyncHandler(async (req,res) => {
    const {userId,skillId,level,experience} = req.body
    const skill = await skillServices.createUserskillService({userId,skillId,level,experience})
    return res.status(201).json(    new ApiResponse(200,"User skill created successfully",skill))
})
const getAllUserskillController = asyncHandler(async (req,res) => {
    const skills = await skillServices.getAllUserskillService()
    return res.status(200).json(new ApiResponse(200,"User skills fetched successfully",skills))
})
const getUserskillByIdController = asyncHandler(async (req,res) => {
    const {id} = req.params
    const skill = await skillServices.getUserskillByIdService({id})
    return res.status(200).json(new ApiResponse(200,"User skill fetched successfully",skill))
})
const updateUserskillController = asyncHandler(async (req,res) => {
    const {id} = req.params
    const {userId,skillId,level,experience} = req.body
    const skill = await skillServices.updateUserskillService({id,userId,skillId,level,experience})
    return res.status(200).json(new ApiResponse(200,"User skill updated successfully",skill))
})
const deleteUserskillController = asyncHandler(async (req,res) => {
        const {id} = req.params
    const skill = await skillServices.deleteUserskillService({id})
    return res.status(200).json(new ApiResponse(200,"User skill deleted successfully",skill))
})


module.exports = {
    createSkillController,
    getAllSkillsController,
    getSkillByIdController,
    updateSkillController,
    deleteSkillController,
    createUserskillController,
    getAllUserskillController,
    getUserskillByIdController,
    updateUserskillController,
    deleteUserskillController
}           