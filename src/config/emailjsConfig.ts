export const EMAILJS_CONFIG = {
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY_HERE",
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "SERVICE_ID_HERE",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "TEMPLATE_ID_HERE",
};

/**
 * Instructions:
 * 1. Go to https://www.emailjs.com/ and create an account
 * 2. Set up an Email Service (Gmail, Outlook, etc.)
 * 3. Create an Email Template with these variables:
 *    - {{to_email}}
 *    - {{from_name}}
 *    - {{from_email}}
 *    - {{from_phone}}
 *    - {{subject}}
 *    - {{message}}
 *    - {{contact_type}}
 * 4. Get your Public Key from Account settings
 * 5. Update the values above with your credentials
 */
