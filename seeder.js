const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
// Load env vars
dotenv.config({
  path: './config/config.env',
});
// Load models
const Govpedia = require('./models/Govpedia');
// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
// Read JSON files
const govpedias = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/govpedias.json`, 'utf-8')
);
// Import into DB
const importData = async () => {
  try {
    await Govpedia.create(govpedias);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};
// Delete data
const deleteData = async () => {
  try {
    await Govpedia.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}