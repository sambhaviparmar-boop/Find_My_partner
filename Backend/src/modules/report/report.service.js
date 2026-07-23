const reportRepo = require("./report.repository");
const ApiError = require("../../core/utils/apiError");

const createReportService = async (reporterId, reportedUserId, reason, description) => {
    if (!reporterId || !reportedUserId || !reason || !description) {
        throw new ApiError(400, "All fields are required");
    }
    return await reportRepo.createReportRepository(Number(reporterId), Number(reportedUserId), reason, description);
};

const getReportByIdService = async (id) => {
    if (!id) {
        throw new ApiError(400, "Report id is required");
    }
    return await reportRepo.getReportByIdRepository(Number(id));
};

const getAllReportsService = async () => {
    return await reportRepo.getAllReportsRepository();
};

const getReportsByStatusService = async (status) => {
    if (!status) {
        throw new ApiError(400, "Status is required");
    }
    return await reportRepo.getReportsByStatusRepository(status);
};

const updateReportStatusService = async (id, status) => {
    if (!id) {
        throw new ApiError(400, "Report id is required");
    }
    if (!status) {
        throw new ApiError(400, "Status is required");
    }
    return await reportRepo.updateReportStatusRepository(Number(id), status);
};

const deleteReportService = async (id) => {
    if (!id) {
        throw new ApiError(400, "Report id is required");
    }
    const report = await reportRepo.getReportByIdRepository(Number(id));
    if (!report) {
        throw new ApiError(404, "Report not found");
    }
    return await reportRepo.deleteReportRepository(Number(id));
};

module.exports = {
    createReportService,
    getReportByIdService,
    getAllReportsService,
    getReportsByStatusService,
    updateReportStatusService,
    deleteReportService
};
