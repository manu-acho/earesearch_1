import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send an email notification using Resend
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    console.log("📧 Sending email to:", options.to);
    
    const result = await resend.emails.send({
      from: 'E.A Research <emmanuel@earesearch.net>',
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
    
    console.log("✅ Email sent successfully:", result);
    return true;
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    return false;
  }
}

/**
 * Send notification when admin access request is approved
 */
export async function sendAccessApprovedEmail(
  to: string,
  name: string,
  tempPassword: string
): Promise<boolean> {
  const subject = "Admin Access Approved - E.A Research";
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(to right, #3b82f6, #06b6d4); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .credentials { background: white; padding: 20px; border-left: 4px solid #3b82f6; margin: 20px 0; border-radius: 4px; }
        .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; color: #6b7280; margin-top: 20px; font-size: 14px; }
        .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to E.A Research Admin Portal</h1>
        </div>
        <div class="content">
          <h2>Hello ${name},</h2>
          <p>Great news! Your request for admin access has been approved.</p>
          
          <div class="credentials">
            <h3>Your Login Credentials</h3>
            <p><strong>Email:</strong> ${to}</p>
            <p><strong>Temporary Password:</strong> <code style="background: #f3f4f6; padding: 4px 8px; border-radius: 4px;">${tempPassword}</code></p>
          </div>
          
          <div class="warning">
            <strong>⚠️ Important Security Notice</strong>
            <p style="margin: 10px 0 0 0;">Please change your password immediately after your first login for security purposes.</p>
          </div>
          
          <center>
            <a href="https://earesearch.netlify.app/admin/login" class="button">Login to Admin Portal</a>
          </center>
          
          <p>Once logged in, you can:</p>
          <ul>
            <li>Manage research publications and papers</li>
            <li>Add and update datasets</li>
            <li>Create prototypes and research updates</li>
            <li>Collaborate on research themes</li>
          </ul>
          
          <p>If you have any questions or need assistance, please don't hesitate to reach out.</p>
          
          <p>Best regards,<br>
          E.A Research Team<br>
          <em>Partnership: E.A Research ◇ Addis AI</em></p>
        </div>
        <div class="footer">
          <p>This is an automated message. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const text = `
Hello ${name},

Your request for admin access to E.A Research has been approved!

Login Credentials:
Email: ${to}
Temporary Password: ${tempPassword}

⚠️ Important: Please change your password immediately after your first login.

Login at: https://earesearch.netlify.app/admin/login

Best regards,
E.A Research Team
Partnership: E.A Research ◇ Addis AI
  `;
  
  return sendEmail({ to, subject, html, text });
}

/**
 * Send notification when admin access request is rejected
 */
export async function sendAccessRejectedEmail(
  to: string,
  name: string,
  reason?: string
): Promise<boolean> {
  const subject = "Admin Access Request Update - E.A Research";
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #6b7280; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .footer { text-align: center; color: #6b7280; margin-top: 20px; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Admin Access Request Update</h1>
        </div>
        <div class="content">
          <h2>Hello ${name},</h2>
          <p>Thank you for your interest in contributing to E.A Research.</p>
          <p>After careful review, we are unable to approve your admin access request at this time.</p>
          ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
          <p>If you believe this was an error or would like to discuss this further, please feel free to contact us directly.</p>
          <p>Best regards,<br>
          E.A Research Team<br>
          <em>Partnership: E.A Research ◇ Addis AI</em></p>
        </div>
        <div class="footer">
          <p>This is an automated message. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const text = `
Hello ${name},

Thank you for your interest in contributing to E.A Research.

After careful review, we are unable to approve your admin access request at this time.

${reason ? `Reason: ${reason}` : ''}

If you believe this was an error or would like to discuss this further, please contact us directly.

Best regards,
E.A Research Team
Partnership: E.A Research ◇ Addis AI
  `;
  
  return sendEmail({ to, subject, html, text });
}
