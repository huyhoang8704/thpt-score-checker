const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');

// [GET] /students/:sbd - Tra cứu điểm theo SBD
router.get('/:sbd', studentController.getStudentBySBD);

// [GET] /students - Lấy tất cả học sinh (test)
router.get('/', studentController.getAllStudents);

// [GET] /students/top/:group - Top 10 theo khối
router.get('/top/:group', studentController.getTopStudentsByGroup);


router.get('/report/score-levels', studentController.getScoreLevelReport);

module.exports = router;
