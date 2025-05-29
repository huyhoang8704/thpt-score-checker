const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const Student = require('../models/studentSchema');
require('../models/studentSchema');

const results = [];

async function seed() {
  try {
    // Kết nối tới MongoDB
    await mongoose.connect(process.env.MONGO_URL, {
    });

    fs.createReadStream(path.join(__dirname, '../../diem_thi_thpt_2024.csv'))
      .pipe(csv())
      .on('data', (row) => {
        // ...existing code...
        const converted = {
          sbd: row.sbd,
          toan: parseFloat(row.toan) || undefined,
          ngu_van: parseFloat(row.ngu_van) || undefined,
          ngoai_ngu: parseFloat(row.ngoai_ngu) || undefined,
          vat_li: parseFloat(row.vat_li) || undefined,
          hoa_hoc: parseFloat(row.hoa_hoc) || undefined,
          sinh_hoc: parseFloat(row.sinh_hoc) || undefined,
          lich_su: parseFloat(row.lich_su) || undefined,
          dia_li: parseFloat(row.dia_li) || undefined,
          gdcd: parseFloat(row.gdcd) || undefined,
          ma_ngoai_ngu: row.ma_ngoai_ngu || undefined
        };
        results.push(converted);
      })
      .on('end', async () => {
        try {
          await Student.insertMany(results);
          console.log('Imported successfully!');
        } catch (err) {
          console.error('Import failed:', err);
        } finally {
          mongoose.connection.close();
        }
      });
  } catch (err) {
    console.error('MongoDB connection failed:', err);
  }
}

seed();

// start node seeders/seed.js