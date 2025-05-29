const Student = require('../models/studentSchema');


const getStudentBySBD = async (req, res) => {
  try {
    if (!/^\d{8}$/.test(req.params.sbd)) return res.status(400).json({ message: 'Số báo danh không hợp lệ' });

    const student = await Student.findOne({ sbd: req.params.sbd });
    if (!student) {
      return res.status(404).json({ message: 'Không tìm thấy thí sinh' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
}

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().limit(100);
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
}

module.exports = {
  getStudentBySBD,
  getAllStudents
};