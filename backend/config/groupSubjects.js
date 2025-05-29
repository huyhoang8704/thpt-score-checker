const groupSubjects = {
  A: ['toan', 'vat_li', 'hoa_hoc'],                 // Khối A: Toán - Lý - Hóa
  A1: ['toan', 'vat_li', 'ngoai_ngu'],              // Khối A1: Toán - Lý - Ngoại ngữ
  A2: ['toan', 'vat_li', 'sinh_hoc'],               // Khối A2: Toán - Lý - Sinh
  A3: ['toan', 'hoa_hoc', 'ngu_van'],               // Khối A3: Toán - Hóa - Văn
  A4: ['toan', 'dia_li', 'ngoai_ngu'],              // Khối A4: Toán - Địa - Ngoại ngữ

  B: ['toan', 'hoa_hoc', 'sinh_hoc'],               // Khối B: Toán - Hóa - Sinh
  B1: ['toan', 'sinh_hoc', 'ngu_van'],              // Khối B1: Toán - Sinh - Văn
  B2: ['toan', 'sinh_hoc', 'ngoai_ngu'],            // Khối B2: Toán - Sinh - Ngoại ngữ

  C: ['ngu_van', 'lich_su', 'dia_li'],              // Khối C: Văn - Sử - Địa
  C1: ['ngu_van', 'toan', 'vat_li'],                // Khối C1: Văn - Toán - Lý
  C2: ['ngu_van', 'toan', 'hoa_hoc'],               // Khối C2: Văn - Toán - Hóa

  D: ['toan', 'ngu_van', 'ngoai_ngu'],              // Khối D: Toán - Văn - Ngoại ngữ
  D1: ['toan', 'ngu_van', 'ngoai_ngu'],             // D1 là D truyền thống - tiếng Anh
  D7: ['toan', 'hoa_hoc', 'ngoai_ngu'],             // Toán - Hóa - Ngoại ngữ

};
module.exports = groupSubjects;