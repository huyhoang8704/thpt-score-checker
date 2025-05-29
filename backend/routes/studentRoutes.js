const express = require('express');
const router = express.Router();
const Student = require('../models/studentSchema');

// [GET] /students/:sbd - Tra cứu điểm theo SBD
router.get('/:sbd', async (req, res) => {
  try {
    const student = await Student.findOne({ sbd: req.params.sbd });
    if (!student) {
      return res.status(404).json({ message: 'Không tìm thấy thí sinh' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// [GET] /students - Lấy tất cả học sinh (test)
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().limit(100);
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
});

module.exports = router;
