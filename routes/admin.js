const express = require("express");

const { verificationByAdmin } = require("../controllers/admin");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();
/**
 * @swagger
 * /api/captain:
 *  post:
 *    tags:
 *     - Auth
 *    description: Creates a new user
 *    parameters:
 *     - in: body
 *       name: captainProfileData
 *       description: Captain profile to create
 *       schema:
 *         type: object
 *         required:
 *           - name
 *             idPhoto
 *             licensePhoto
 *         properties:
 *           name:
 *             type: string
 *           idPhoto:
 *             type: string
 *           licensePhoto:
 *             type: string
 *    responses:
 *      '201':
 *        description: User created
 *      '409':
 *        description: User already exists
 *      '400':
 *        description: Bad request
 */
router.post("/verification", protect, authorize("admin"), verificationByAdmin);

module.exports = router;
