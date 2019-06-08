var mongoose = require("mongoose");

var StudentSchema = new mongoose.Schema({
  STUDENT_NAME: String,
  STUDENT_EMAIL: String,
  STUDENT_AGE: Number,
  STUDENT_PHONE_NUMBER: String,
  STUDENT_COMMUNICATION: String,
  STUDENT_ENGLISH_LEVEL: String,
  STUDENT_START_DATE: { type: Date },
  STUDENT_SKILLS_COURSES: String,
  STUDENT_PRESENTATION: String,
  STUDENT_HOME_STUDY: Boolean,
  UPDATED_AT: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Student", StudentSchema);
