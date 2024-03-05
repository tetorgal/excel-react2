const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceControllers");

router.get("/datos-asistencia", attendanceController.getAttendanceData);
router.get("/update-asistencias", attendanceController.updateAttendance);
router.post("/insertar-asistencia", attendanceController.insertAttendanceData);
router.get("/get-asistencias", attendanceController.getAllAttendance);

module.exports = router;
