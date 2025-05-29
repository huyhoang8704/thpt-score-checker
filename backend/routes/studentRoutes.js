const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');

// [GET] /students/:sbd - Tra cứu điểm theo SBD
router.get('/:sbd', studentController.getStudentBySBD);

// [GET] /students - Lấy tất cả học sinh (test)
router.get('/', studentController.getAllStudents);

module.exports = router;
