# Configuration Checklist

## Step 1: EmailJS Setup (Required)

### 1.1 Create EmailJS Account
- [ ] Go to https://www.emailjs.com
- [ ] Click "Sign Up Free"
- [ ] Verify your email
- [ ] Log in to dashboard

### 1.2 Create Email Service
- [ ] Click "Email Services"
- [ ] Click "Add Service"
- [ ] Select "Gmail" (or your email provider)
- [ ] Connect your email account
  - For Gmail: Use "App Password" not regular password
  - Settings → Security → App Passwords
- [ ] Click "Create Service"
- [ ] **COPY YOUR SERVICE ID** (looks like: service_xxxxxxxxxxxxx)

### 1.3 Create Email Template
- [ ] Click "Email Templates"
- [ ] Click "Create New Template"
- [ ] Set these variables:
  ```
  {{from_name}}
  {{from_email}}
  {{from_phone}}
  {{subject}}
  {{message}}
  {{contact_type}}
  {{to_email}}
  ```
- [ ] Recipient: {{to_email}}
- [ ] Click "Save"
- [ ] **COPY YOUR TEMPLATE ID** (looks like: template_xxxxxxxxxxxxx)

### 1.4 Get Public Key
- [ ] Click your avatar → "Account"
- [ ] Find "Public Key" section
- [ ] **COPY YOUR PUBLIC KEY** (looks like: xxxxxxxxxxxxxxxxxxxxxxxx)

---

## Step 2: Update Application Configuration

### 2.1 Configure EmailJS
**File**: `src/config/emailjsConfig.ts`

```typescript
export const EMAILJS_CONFIG = {
  publicKey: 'YOUR_PUBLIC_KEY_HERE',      // ← Paste here
  serviceId: 'SERVICE_ID_HERE',           // ← Paste here
  templateId: 'TEMPLATE_ID_HERE',         // ← Paste here
};
```

- [ ] Open `src/config/emailjsConfig.ts`
- [ ] Replace `'YOUR_PUBLIC_KEY_HERE'` with your Public Key
- [ ] Replace `'SERVICE_ID_HERE'` with your Service ID
- [ ] Replace `'TEMPLATE_ID_HERE'` with your Template ID
- [ ] Save file

### 2.2 Update Email Addresses
**File**: `src/components/molecule/ContactModal.tsx`

Look for lines 30-41:
```typescript
const contactInfo = {
  info: {
    email: 'info@palyan.am',              // ← Change this
    phone: '+374 (00) 000-000',
    label: 'General Information',
  },
  sales: {
    email: 'sales@palyan.am',             // ← Change this
    phone: '+374 (11) 111-111',
    label: 'Sales Department',
  },
};
```

- [ ] Replace `'info@palyan.am'` with your actual email
- [ ] Replace `'sales@palyan.am'` with your actual email
- [ ] Save file

---

## Step 3: Verify Backend Setup

### 3.1 Authentication Endpoint
- [ ] Backend has `/auth/login` endpoint
- [ ] Returns: `{ token: string, user: { id, username, email } }`
- [ ] API is running on correct port

### 3.2 Product Endpoints
- [ ] Backend has `GET /products`
- [ ] Backend has `POST /products`
- [ ] Backend has `PUT /products/:id`
- [ ] Backend has `DELETE /products/:id`

### 3.3 News Endpoints
- [ ] Backend has `GET /news`
- [ ] Backend has `POST /news`
- [ ] Backend has `PUT /news/:id`
- [ ] Backend has `DELETE /news/:id`

### 3.4 Category Endpoint
- [ ] Backend has `GET /categories`
- [ ] Returns data with subcategories array

---

## Step 4: Test Everything

### 4.1 Start Development Server
```bash
npm run dev
```
- [ ] No build errors
- [ ] Server runs on http://localhost:5173

### 4.2 Test Admin Authentication
- [ ] Navigate to http://localhost:5173/admin
- [ ] AuthModal should appear
- [ ] Enter test admin credentials
- [ ] Should successfully authenticate
- [ ] Dashboard should load
- [ ] Logout button works

### 4.3 Test Contact Form
- [ ] Navigate to http://localhost:5173
- [ ] Click "Contact Us" button (top right corner)
- [ ] ContactModal should open
- [ ] Fill in form:
  - Name: Test Name
  - Email: your-email@example.com
  - Phone: +374 00 000 000
  - Subject: Test Subject
  - Message: Test message
- [ ] Click "Send Message"
- [ ] Success message should appear
- [ ] Check your email inbox
- [ ] Email should arrive with the message

### 4.4 Test Category Selection
- [ ] Go to Admin → Products → Add New
- [ ] Category dropdown should show options
- [ ] Select a category
- [ ] Subcategory dropdown should populate
- [ ] Select subcategory
- [ ] Fill rest of form and submit
- [ ] Product should include category/subcategory IDs

---

## Step 5: Troubleshooting

### Admin Login Not Working?
- [ ] Check that `/auth/login` endpoint exists
- [ ] Verify credentials are correct
- [ ] Check browser console for error messages
- [ ] Verify API URL in `src/api/axios.ts`

### Contact Form Not Sending?
- [ ] Verify EmailJS config credentials are correct
- [ ] Check browser console for errors
- [ ] Go to EmailJS dashboard → Activity to see if requests arrive
- [ ] Verify template variables match exactly
- [ ] Check email addresses are updated correctly

### Category Dropdown Empty?
- [ ] Check `/categories` endpoint returns data
- [ ] Verify response has correct structure:
  ```json
  [
    {
      "id": 1,
      "name": { "hy": "...", "ru": "...", "en": "..." },
      "subcategories": [...]
    }
  ]
  ```

### Products Not Loading?
- [ ] Check `/products` endpoint returns data
- [ ] Verify backend API is running
- [ ] Check CORS settings
- [ ] Look at Network tab in DevTools

---

## ✅ Completion Checklist

When you're done, check everything:

- [ ] EmailJS account created
- [ ] EmailJS service configured
- [ ] EmailJS template created
- [ ] EmailJS credentials copied
- [ ] `src/config/emailjsConfig.ts` updated
- [ ] `src/components/molecule/ContactModal.tsx` email addresses updated
- [ ] Backend running
- [ ] `/auth/login` endpoint working
- [ ] `/products` endpoints working
- [ ] `/news` endpoints working
- [ ] `/categories` endpoint working
- [ ] Admin login works
- [ ] Contact form works
- [ ] Category selection works
- [ ] All tests passed

---

## 📞 Support

If something doesn't work:

1. **Check browser console** (F12 → Console)
2. **Check Network tab** (F12 → Network)
3. **Read the error messages carefully**
4. **Check backend logs**
5. **Read SETUP_GUIDE.md for detailed help**

---

Generated: January 7, 2026
Status: Complete and Ready to Use
