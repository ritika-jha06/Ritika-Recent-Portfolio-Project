const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true, maxlength: 100 },
  email:     { type: String, required: true, trim: true, lowercase: true },
  subject:   { type: String, trim: true, maxlength: 200, default: 'No Subject' },
  message:   { type: String, required: true, maxlength: 2000 },
  isRead:    { type: Boolean, default: false },
  ipAddress: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
