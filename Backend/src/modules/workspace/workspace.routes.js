const express = require("express");
const {
    createWorkspaceController,
    getWorkspaceByIdController,
    getWorkspaceByTeamIdController,
    updateWorkspaceController,
    deleteWorkspaceController
} = require("./workspace.controller");
const { createWorkspaceValidation, updateWorkspaceValidation } = require("./workspace.validation");
const validate = require("../../core/middleware/validate.middleware");
const { authMiddleware } = require("../../core/middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);
/*
@swagger
/api/workspace:
  post:
    summary: Create workspace
    tags: [Workspace]
    security: [{bearerAuth: []}]
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/CreateWorkspaceInput"
    responses:
      201:
        description: Workspace created successfully
      400:
        description: Invalid input
*/
router.post("/", validate(createWorkspaceValidation), createWorkspaceController);
/*
@swagger
/api/workspace/team/:teamId:
  get:
    summary: Get workspace by team ID
    tags: [Workspace]
    security: [{bearerAuth: []}]
    parameters:
      - in: path
        name: teamId
        required: true
        schema:
          type: string
    responses:
      200:
        description: Workspace fetched successfully
      404:
        description: Workspace not found
*/
router.get("/team/:teamId", getWorkspaceByTeamIdController);
/*
@swagger
/api/workspace/:id:
  get:
    summary: Get workspace by ID
    tags: [Workspace]
    security: [{bearerAuth: []}]
    parameters:
      - in: path
        name: id
        required: true
        schema:
          type: string
    responses:
      200:
        description: Workspace fetched successfully
      404:
        description: Workspace not found
*/
router.get("/:id", getWorkspaceByIdController);
/*
@swagger
/api/workspace/:id:
  put:
    summary: Update workspace
    tags: [Workspace]
    security: [{bearerAuth: []}]
    parameters:
      - in: path
        name: id
        required: true
        schema:
          type: string
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/UpdateWorkspaceInput"
    responses:
      200:
        description: Workspace updated successfully
      404:
        description: Workspace not found
*/
router.put("/:id", validate(updateWorkspaceValidation), updateWorkspaceController);
/*
@swagger
/api/workspace/:id:
  delete:
    summary: Delete workspace
    tags: [Workspace]
    security: [{bearerAuth: []}]
    parameters:
      - in: path
        name: id
        required: true
        schema:
          type: string
    responses:
      200:
        description: Workspace deleted successfully
      404:
        description: Workspace not found
*/
router.delete("/:id", deleteWorkspaceController);

module.exports = router;