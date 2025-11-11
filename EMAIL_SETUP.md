# Email Setup Guide

## Current Status
The email notification system is implemented but currently logs to the console instead of sending actual emails. To enable real email sending, follow one of the options below.

## Option 1: Resend (Recommended - Modern, Simple)

1. **Sign up for Resend**: https://resend.com
   - Free tier: 100 emails/day, 3,000/month

2. **Install the package**:
   ```bash
   npm install resend
   ```

3. **Add to environment variables** (`.env.local`):
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   EMAIL_FROM=noreply@earesearch.com
   ```

4. **Update `src/lib/email.ts`**:
   ```typescript
   import { Resend } from 'resend';
   const resend = new Resend(process.env.RESEND_API_KEY);
   
   export async function sendEmail(options: EmailOptions): Promise<boolean> {
     try {
       await resend.emails.send({
         from: process.env.EMAIL_FROM || 'noreply@earesearch.com',
         to: options.to,
         subject: options.subject,
         html: options.html,
       });
       return true;
     } catch (error) {
       console.error('Email error:', error);
       return false;
     }
   }
   ```

## Option 2: SendGrid

1. **Sign up for SendGrid**: https://sendgrid.com
   - Free tier: 100 emails/day

2. **Install the package**:
   ```bash
   npm install @sendgrid/mail
   ```

3. **Add to environment variables**:
   ```
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
   EMAIL_FROM=noreply@earesearch.com
   ```

4. **Update `src/lib/email.ts`**:
   ```typescript
   import sgMail from '@sendgrid/mail';
   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
   
   export async function sendEmail(options: EmailOptions): Promise<boolean> {
     try {
       await sgMail.send({
         from: process.env.EMAIL_FROM || 'noreply@earesearch.com',
         to: options.to,
         subject: options.subject,
         html: options.html,
       });
       return true;
     } catch (error) {
       console.error('Email error:', error);
       return false;
     }
   }
   ```

## Option 3: AWS SES

1. **Set up AWS SES**: https://aws.amazon.com/ses/
   - Very cost-effective at scale

2. **Install AWS SDK**:
   ```bash
   npm install @aws-sdk/client-ses
   ```

3. **Add environment variables**:
   ```
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=xxxxx
   AWS_SECRET_ACCESS_KEY=xxxxx
   EMAIL_FROM=noreply@earesearch.com
   ```

## Domain Setup

For production email sending, you'll need to:

1. **Verify your domain** with your email provider
2. **Add DNS records** (SPF, DKIM, DMARC) for better deliverability
3. **Use a real email address** (e.g., `noreply@earesearch.com`)

## Testing Emails Locally

For development, you can use:
- **Mailtrap**: https://mailtrap.io (catches emails without sending)
- **Ethereal Email**: https://ethereal.email (temporary test accounts)

## Email Templates

Email templates are defined in `src/lib/email.ts`:
- `sendAccessApprovedEmail()` - Sent when access request is approved
- `sendAccessRejectedEmail()` - Sent when access request is rejected

Templates include:
- HTML version (styled, responsive)
- Plain text fallback
- Login credentials and instructions
- Security warnings

## Deployment

Don't forget to add your email environment variables to Netlify:

```bash
netlify env:set RESEND_API_KEY "your-key-here"
netlify env:set EMAIL_FROM "noreply@earesearch.com"
```
