const reportService = require("./report.service");
const asyncHandler = require("../../core/utils/asyncHandler");
const ApiResponse = require("../../core/utils/apiResponce");

const createReportController = asyncHandler(async(req, res) => {
    const reporterId = req.user.id;
    const { reportedUserId, reason, description } = req.body;
    const report = await reportService.createReportService(reporterId, reportedUserId, reason, description);
    return res.status(201).json(new ApiResponse(201, report, "Report created successfully"));
});

const getReportByIdController = asyncHandler(async(req, res) => {
    const { id } = req.params;
    const report = await reportService.getReportByIdService(id);
    return res.status(200).json(new ApiResponse(200, report, "Report fetched successfully"));
});

const getAllReportsController = asyncHandler(async(req, res) => {
    const reports = await reportService.getAllReportsService();
    return res.status(200).json(new ApiResponse(200, reports, "Reports fetched successfully"));
});

const getReportsByStatusController = asyncHandler(async(req, res) => {
    const { status } = req.params;
    const reports = await reportService.getReportsByStatusService(status);
    return res.status(200).json(new ApiResponse(200, reports, "Reports fetched successfully"));
});

const updateReportStatusController = asyncHandler(async(req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const report = await reportService.updateReportStatusService(id, status);
    return res.status(200).json(new ApiResponse(200, report, "Report updated successfully"));
});

const deleteReportController = asyncHandler(async(req, res) => {
    const { id } = req.params;
    const report = await reportService.deleteReportService(id);
    return res.status(200).json(new ApiResponse(200, report, "Report deleted successfully"));
});

module.exports = {
    createReportController,
    getReportByIdController,
    getAllReportsController,
    getReportsByStatusController,
    updateReportStatusController,
    deleteReportController
};
