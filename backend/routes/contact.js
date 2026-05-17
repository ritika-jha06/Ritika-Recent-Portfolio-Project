const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

// POST /api/contact — Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address.' });
    }

    // Save to MongoDB
    const contact = await Contact.create({
      name, email,
      subject: subject || 'No Subject',
      message,
      ipAddress: req.ip
    });

    // Send email notification (if credentials configured)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
      });
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `📬 Portfolio: ${subject || 'New Message'} — from ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;background:#f5f5ff;border-radius:12px;">
            <h2 style="color:#6d28d9;">New Portfolio Contact</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px;font-weight:bold;color:#555;">Name</td><td>${name}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#555;">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#555;">Subject</td><td>${subject || 'N/A'}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#555;">Message</td><td style="white-space:pre-wrap;">${message}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#555;">Received</td><td>${new Date().toLocaleString('en-IN')}</td></tr>
            </table>
          </div>`
      });
    }

    res.status(201).json({ success: true, message: 'Message sent successfully!', id: contact._id });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// GET /api/contact — Get all messages
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(100);
    res.json({ success: true, data: contacts, count: contacts.length });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PATCH /api/contact/:id/read — Mark as read
router.patch('/:id/read', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    if (!contact) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: contact });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
