import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const resendApiKey = process.env.RESEND_API_KEY;
const adminEmail = process.env.ADMIN_EMAIL;
const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev'; // Resend's default testing domain

let resend: Resend | null = null;
if (resendApiKey) {
  resend = new Resend(resendApiKey);
} else {
  console.warn('RESEND_API_KEY is not set. Email notifications will be disabled.');
}

export const sendQRCodeEmail = async (qrCodeDataURL: string) => {
  if (!resend || !adminEmail) {
    console.warn('Cannot send QR code email. Resend API key or ADMIN_EMAIL is missing.');
    return;
  }

  try {
    // Strip the "data:image/png;base64," prefix from the Data URL to get raw base64
    const base64Data = qrCodeDataURL.replace(/^data:image\/png;base64,/, '');
    
    await resend.emails.send({
      from: `Bhubaneswar Kitchen <${fromEmail}>`,
      to: adminEmail,
      subject: 'Action Required: WhatsApp QR Code Scan Needed',
      html: `
        <h2>WhatsApp Session Requires Authentication</h2>
        <p>Your Bhubaneswar Kitchen server requires you to scan a new WhatsApp QR code to continue sending messages.</p>
        <p>Please scan the attached QR code using the WhatsApp app on your host phone.</p>
      `,
      attachments: [
        {
          filename: 'whatsapp-qr.png',
          content: base64Data,
        }
      ]
    });
    
    console.log(`WhatsApp QR code emailed successfully to ${adminEmail}`);
  } catch (error) {
    console.error('Failed to send QR code email:', error);
  }
};

export const sendAlertEmail = async (subject: string, message: string) => {
  if (!resend || !adminEmail) {
    console.warn('Cannot send alert email. Resend API key or ADMIN_EMAIL is missing.');
    return;
  }

  try {
    await resend.emails.send({
      from: `Bhubaneswar Kitchen <${fromEmail}>`,
      to: adminEmail,
      subject: `Server Alert: ${subject}`,
      html: `
        <h2>WhatsApp Service Alert</h2>
        <p>${message}</p>
        <p>The server may attempt to auto-restart the connection. Check PM2 logs for details.</p>
      `,
    });
    
    console.log(`Alert email sent to ${adminEmail}`);
  } catch (error) {
    console.error('Failed to send alert email:', error);
  }
};
