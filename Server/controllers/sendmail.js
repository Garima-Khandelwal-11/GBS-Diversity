import sgMail from '@sendgrid/mail';

export const connectMenteeWithMentor = async (req, res) => {
  const { menteeEmail, mentorEmail, menteeName, mentorName } = req.body;

  // Validate required fields
  if (!menteeEmail || !mentorEmail || !menteeName || !mentorName) {
    return res.status(400).json({
      error: 'Please provide menteeEmail, mentorEmail, menteeName, and mentorName.',
    });
  }

  // Hardcoded email template
  const subject = `Connection Request: ${menteeName} wants to connect with you`;
  const text = `Hi ${mentorName},\n\n${menteeName} is eager to connect with you as their mentor. Please find their email below for further communication.\n\nMentee Email: ${menteeEmail}\n\nLooking forward to a great mentoring journey!\n\nBest regards,\nThe Mentorship Team`;
  const html = `
    <p>Dear <strong>${mentorName}</strong>,</p>
    <p>We are excited to inform you that <strong>${menteeName}</strong> has expressed a keen interest in having you as their mentor to guide and support them in shaping their future career.</p>
    <p>Please find their contact details below for further communication:</p>
    <p><strong>Mentee Email:</strong> ${menteeEmail}</p>
    <p>Your expertise and guidance can make a significant impact on their journey, and we are confident this mentoring relationship will be a rewarding experience for both of you.</p>
    <p>If you have any questions or require assistance, please feel free to reach out to us anytime.</p>
    <p class="signature">Warm regards,<br><strong>The Mentorship Team</strong></p>
  `;

  const msg = {
    to: mentorEmail,
    from: 'yuvikagupta1104@gmail.com', // Use a verified sender email
    subject: subject,
    text: text,
    html: html,
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ message: 'Mentorship connection email sent successfully!' });
  } catch (error) {
     return res.status(200).json({ message: error});
  }
};
