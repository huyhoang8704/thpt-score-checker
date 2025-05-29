const Student = require('../models/studentSchema');
const groupSubjects = require('../config/groupSubjects');



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
const getTopStudentsByGroup = async (req, res) => {
  const groupKey = req.params.group;
  const subjects = groupSubjects[groupKey];

  if (!subjects) {
    return res.status(400).json({ message: `Khối '${groupKey}' không được hỗ trợ` });
  }

  try {
    const students = await Student.aggregate([
      {
        $addFields: {
          totalScore: {
            $sum: subjects.map(subject => ({
              $ifNull: [`$${subject}`, 0]
            }))
          }
        }
      },
      { $sort: { totalScore: -1 } },
      { $limit: 10 }
    ]);

    res.json({ group: groupKey, subjects, top10: students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi thống kê top 10' });
  }
}

module.exports = {
  getStudentBySBD,
  getAllStudents,
  getTopStudentsByGroup
};