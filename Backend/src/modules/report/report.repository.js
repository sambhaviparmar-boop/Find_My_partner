const prisma = require("../../core/config/prisma");

const createReportRepository = async (reporterId, reportedUserId, reason, description) => {
    return await prisma.report.create({
        data: {
            reporterId: Number(reporterId),
            reportedUserId: Number(reportedUserId),
            reason,
            description
        }
    });
};

const getReportByIdRepository = async (id) => {
    return await prisma.report.findUnique({
        where: {
            id: Number(id)
        }
    });
};

const getAllReportsRepository = async () => {
    return await prisma.report.findMany({
        include: {
            reporter: true,
            reportedUser: true
        }
    });
};

const getReportsByStatusRepository = async (status) => {
    return await prisma.report.findMany({
        where: {
            status
        }
    });
};

const updateReportStatusRepository = async (id, status) => {
    return await prisma.report.update({
        where: {
            id: Number(id)
        },
        data: {
            status
        }
    });
};

const deleteReportRepository = async (id) => {
    return await prisma.report.delete({
        where: {
            id: Number(id)
        }
    });
};

module.exports = {
    createReportRepository,
    getReportByIdRepository,
    getAllReportsRepository,
    getReportsByStatusRepository,
    updateReportStatusRepository,
    deleteReportRepository
};