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
// Danh sách các môn cần thống kê
const subjects = [
  'toan', 'ngu_van', 'ngoai_ngu',
  'vat_li', 'hoa_hoc', 'sinh_hoc',
  'lich_su', 'dia_li', 'gdcd'
];

// Hàm tạo aggregation pipeline cho mỗi môn
const buildSubjectAggregation = (subject) => ([
  { $match: { [subject]: { $ne: null } } },
  {
    $bucket: {
      groupBy: `$${subject}`,
      boundaries: [0, 4, 6, 8, 10.1], // phải dùng 10.1 để bao trùm điểm 10
      default: 'unknown',
      output: { count: { $sum: 1 } }
    }
  }
]);

// Hàm ánh xạ range `_id` thành nhãn dễ hiểu
const convertRangeLabel = (value) => {
  if (value === 0) return '<4';
  if (value === 4) return '4-6';
  if (value === 6) return '6-8';
  if (value === 8) return '>=8';
  return 'unknown';
};

// Controller chính để thống kê mức điểm
const getScoreLevelReport = async (req, res) => {
  try {
    const allReports = await Promise.all(subjects.map(async (subject) => {
      const result = await Student.aggregate(buildSubjectAggregation(subject));
      const ranges = { '<4': 0, '4-6': 0, '6-8': 0, '>=8': 0 };
      result.forEach(r => {
        const label = convertRangeLabel(r._id);
        if (ranges[label] !== undefined) {
          ranges[label] = r.count;
        }
      });
      return { subject, ...ranges };
    }));

    res.json(allReports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};



module.exports = {
  getStudentBySBD,
  getAllStudents,
  getTopStudentsByGroup,
  getScoreLevelReport
};


// {
//     "toan": {
//         ">=8": 177465,
//         "6-8": 424314,
//         "4-6": 214309,
//         "<4": 71244
//     },
//     "ngu_van": {
//         ">=8": 325241,
//         "6-8": 427761,
//         "4-6": 120779,
//         "<4": 16504
//     },
//     "ngoai_ngu": {
//         ">=8": 121228,
//         "6-8": 189221,
//         "4-6": 296951,
//         "<4": 160199
//     },
//     "vat_li": {
//         ">=8": 83028,
//         "6-8": 122776,
//         "4-6": 64349,
//         "<4": 19383
//     },
//     "hoa_hoc": {
//         ">=8": 80419,
//         "6-8": 119040,
//         "4-6": 73805,
//         "<4": 16741
//     },
//     "sinh_hoc": {
//         ">=8": 27792,
//         "6-8": 149867,
//         "4-6": 100207,
//         "<4": 8594
//     },
//     "lich_su": {
//         ">=8": 118734,
//         "6-8": 290762,
//         "4-6": 170651,
//         "<4": 21762
//     },
//     "dia_li": {
//         ">=8": 185499,
//         "6-8": 324391,
//         "4-6": 83776,
//         "<4": 7133
//     },
//     "gdcd": {
//         ">=8": 323875,
//         "6-8": 153667,
//         "4-6": 14753,
//         "<4": 947
//     }
// }