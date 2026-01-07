# Authentication & Contact Form Setup Guide

This guide covers the complete setup for admin authentication and the contact form feature.

## Overview

The application now includes:
1. **Admin Dashboard Authentication** - Secure login for admin panel
2. **Contact Form Modal** - User-facing contact form with EmailJS integration

---

## Part 1: Admin Dashboard Authentication

### Architecture

- **Hook**: `useAuth` - Manages authentication state and login
- **Component**: `AuthModal` - Login form modal
- **Protected**: `AdminDashboard` - Requires authentication

### How It Works

1. When user navigates to `/admin`, the `AdminDashboard` component loads
2. If not authenticated, `AuthModal` opens
3. User enters username and password
4. Credentials are sent to `/auth/login` endpoint
5. On success, token is stored in localStorage and user is authenticated
6. On logout, token is cleared and user is redirected to home

### Backend Requirements

Your backend must have an `/auth/login` endpoint that:

**Request:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response (200 OK):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com"
  }
}
```

**Error Response (401):**
```json
{
  "message": "Invalid credentials"
}
```

### Implementation Details

**File**: `src/hooks/useAuth.ts`
- Manages authentication state
- Stores token in localStorage
- Automatically sets Authorization header for API calls

**File**: `src/components/pages/admin/AuthModal.tsx`
- Login form with username and password fields
- Loading and error states
- Calls `useAuth().login()` on submit

**File**: `src/components/pages/AdminDashboard.tsx`
- Checks authentication on mount
- Shows `AuthModal` if not authenticated
- Includes logout button with redirect

### Testing

1. Navigate to `http://localhost:5173/admin`
2. AuthModal should appear
3. Enter test credentials
4. On success, dashboard loads with logout button

---

## Part 2: Contact Form with EmailJS

### Architecture

- **Component**: `ContactModal` - Contact form with email sending
- **Config**: `src/config/emailjsConfig.ts` - EmailJS credentials
- **Integration**: Called from `Hero` component

### Setup Steps

#### Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email

#### Step 2: Set Up Email Service

1. In dashboard, go to **Email Services**
2. Click **Add Service**
3. Select your email provider (Gmail recommended)
4. Connect your email account:
   - **For Gmail**: 
     - Enable 2-factor authentication
     - Create an App Password (16 characters)
     - Use the App Password in EmailJS
   - **For other providers**: Follow their specific instructions

5. Name your service (e.g., "Gmail Service")
6. Save and note your **Service ID** (looks like: `service_xxxxxxxxxxxxx`)

#### Step 3: Create Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Set Template Name: "Contact Form Template"
4. In the template editor, use these variables:

```
From: {{from_name}}
Email: {{from_email}}
Phone: {{from_phone}}
Type: {{contact_type}}
Subject: {{subject}}

Message:
{{message}}
```

5. Set the recipient email to `{{to_email}}`
6. Save and note your **Template ID** (looks like: `template_xxxxxxxxxxxxx`)

#### Step 4: Get Public Key

1. Click on your avatar → **Account**
2. Find **API Keys** section
3. Copy your **Public Key** (looks like: `xxxxxxxxxxxxxxxxxxxxxxxx`)

#### Step 5: Update Configuration

Open `src/config/emailjsConfig.ts` and replace:

```typescript
export const EMAILJS_CONFIG = {
  publicKey: 'YOUR_PUBLIC_KEY_HERE',      // Paste your Public Key
  serviceId: 'SERVICE_ID_HERE',           // Paste your Service ID
  templateId: 'TEMPLATE_ID_HERE',         // Paste your Template ID
};
```

### How the Contact Form Works

1. User clicks "Contact Us" button on home page
2. `ContactModal` opens
3. User selects department (General Info or Sales)
4. User fills form with name, email, phone, subject, message
5. On submit:
   - Email is sent via EmailJS
   - Success message shows
   - Modal closes after 2 seconds
6. Email is received by the specified department email

### Contact Information

The form sends to:
- **General Information**: `info@palyan.am`
- **Sales**: `sales@palyan.am`

Update these in `src/components/molecule/ContactModal.tsx` (lines 30-41) to match your actual email addresses.

### Testing EmailJS

1. Go to home page
2. Click "Contact Us" button (top right or in hero section)
3. Fill out the form
4. Click "Send Message"
5. Check your inbox for the email

### Alternative: Backend Integration

If you prefer to handle emails through your backend instead:

1. Remove EmailJS dependency: `npm uninstall @emailjs/browser`
2. Modify `ContactModal.tsx` to call your backend API:

```typescript
// Replace the emailjs.send call with:
const response = await api.post('/contact', {
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  subject: formData.subject,
  message: formData.message,
  contactType: formData.contactType,
});
```

---

## Files Created/Modified

### Created:
- `src/hooks/useAuth.ts` - Authentication hook
- `src/components/pages/admin/AuthModal.tsx` - Login modal
- `src/components/molecule/ContactModal.tsx` - Contact form modal
- `src/config/emailjsConfig.ts` - EmailJS configuration
- `EMAILJS_SETUP.md` - EmailJS setup guide

### Modified:
- `src/components/pages/AdminDashboard.tsx` - Added auth protection
- `src/components/molecule/Hero.tsx` - Added contact modal trigger
- `src/hooks/useProducts.ts` - Added delete mutation
- `src/hooks/useNews.ts` - Added delete mutation

---

## Environment Variables (Optional)

You can also use environment variables instead of hardcoding credentials:

```bash
# .env
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
```

Then update `emailjsConfig.ts`:

```typescript
export const EMAILJS_CONFIG = {
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY_HERE',
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'SERVICE_ID_HERE',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'TEMPLATE_ID_HERE',
};
```

---

## Troubleshooting

### Authentication Issues

**Modal doesn't appear when visiting /admin**
- Check browser console for errors
- Verify axios is configured correctly

**Login fails**
- Check backend API is running on correct port
- Verify credentials are correct
- Check CORS settings on backend

**Token not persisting**
- Check localStorage is enabled in browser
- Verify token is being saved: Open DevTools → Application → Local Storage

### EmailJS Issues

**"Email service is not configured" error**
- Update `emailjsConfig.ts` with actual credentials
- Verify credentials are correct from EmailJS dashboard

**Emails not sending**
- Check template variables match exactly
- Verify service is active in EmailJS dashboard
- Check inbox spam folder
- Verify recipient email addresses are correct

**Template not found**
- Double-check Template ID in config
- Verify template is active in EmailJS dashboard

---

## Security Notes

1. **Admin Authentication**
   - Token is stored in localStorage (acceptable for internal admin panels)
   - For production, consider HttpOnly cookies instead
   - Implement token refresh mechanism

2. **Contact Form**
   - EmailJS Public Key is exposed in client (this is intentional and secure)
   - Implement rate limiting on backend to prevent abuse
   - Consider adding reCAPTCHA for production

3. **Environment Variables**
   - Never commit `.env.local` to version control
   - Use `.env.example` to document required variables

---

## Support

For EmailJS support: https://www.emailjs.com/docs/
For authentication issues: Check backend logs
