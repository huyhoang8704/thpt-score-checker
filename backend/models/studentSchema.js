const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  sbd: { type: String, unique: true },
  toan: Number,
  ngu_van: Number,
  ngoai_ngu: Number,
  vat_li: Number,
  hoa_hoc: Number,
  sinh_hoc: Number,
  lich_su: Number,
  dia_li: Number,
  gdcd: Number,
  ma_ngoai_ngu: String
});

module.exports = mongoose.model('Student', studentSchema, 'students');
