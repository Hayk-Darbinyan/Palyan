# EmailJS Setup Guide

This guide will help you set up EmailJS for the contact form functionality.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/) and sign up for a free account
2. Verify your email address

## Step 2: Create an Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add Service**
3. Choose your email provider (Gmail, Outlook, Yahoo, or others)
4. Follow the prompts to connect your email account
5. Note down your **Service ID** (it will look like `service_xxxxx`)

## Step 3: Create an Email Template

1. In the dashboard, go to **Email Templates**
2. Click **Create New Template**
3. Set up your template with the following variables:
   - `{{to_email}}` - Recipient email
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{from_phone}}` - Sender's phone
   - `{{subject}}` - Email subject
   - `{{message}}` - Email message body
   - `{{contact_type}}` - Type of contact (Sales or Info)

4. Example template structure:
   ```
   From: {{from_name}} ({{from_email}})
   Phone: {{from_phone}}
   Contact Type: {{contact_type}}
   Subject: {{subject}}
   
   Message:
   {{message}}
   ```

5. Note down your **Template ID** (it will look like `template_xxxxx`)

## Step 4: Get Your Public Key

1. In the dashboard, go to **Account**
2. Look for **Public Key** under API Keys
3. Copy your **Public Key** (it will look like `xxxxxxxxxxxxxxxxxxxxxxxx`)

## Step 5: Update Your Code

In the file `src/components/molecule/ContactModal.tsx`, update the following lines:

**Line 114-115:**
```typescript
// Replace SERVICE_ID with your actual EmailJS Service ID
'SERVICE_ID',
// Replace TEMPLATE_ID with your actual EmailJS Template ID
'TEMPLATE_ID',
```

**In your main app setup (e.g., in `src/main.tsx`), initialize EmailJS:**

```typescript
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your Public Key
emailjs.init('YOUR_PUBLIC_KEY');
```

## Step 6: Test Your Setup

1. Make sure your backend `/auth/login` endpoint is working
2. Open the application and go to the home page
3. Click the "Contact Us" button
4. Fill out the contact form and submit
5. Check that the email is received in your inbox

## Troubleshooting

- **Emails not sending**: Make sure your Service ID, Template ID, and Public Key are correct
- **Template variables not working**: Double-check that your template variables match those in `ContactModal.tsx`
- **Service unavailable**: Ensure your EmailJS account is active and your email service is properly connected

## Alternative: Using Backend Email Service

If you prefer to send emails through your backend instead of EmailJS:

1. Remove the EmailJS integration from `ContactModal.tsx`
2. Instead, make an API call to your backend endpoint (e.g., `/api/contact`)
3. Handle email sending on the backend

```typescript
// Example alternative approach
const response = await api.post('/contact', {
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  subject: formData.subject,
  message: formData.message,
  contactType: formData.contactType,
});
```
