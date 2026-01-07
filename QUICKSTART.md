# Quick Start Guide

## What Was Implemented

### ✅ Admin Dashboard Authentication
Users must login with username/password to access admin panel (`/admin`)

### ✅ Contact Form Modal  
Users can click "Contact Us" to open a modal and send messages via EmailJS

### ✅ Real Backend Integration
All admin operations now use real API data for products and news

---

## 🚀 Get Started in 5 Minutes

### 1. Install EmailJS Credentials (Required)

Go to https://www.emailjs.com and:
1. Create account & verify email
2. Add email service (Gmail/Outlook)
3. Create email template with these variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{from_phone}}`
   - `{{subject}}`
   - `{{message}}`
   - `{{contact_type}}`
   - `{{to_email}}`

4. Copy your **Public Key**, **Service ID**, **Template ID**

### 2. Update Configuration

Edit `src/config/emailjsConfig.ts`:
```typescript
export const EMAILJS_CONFIG = {
  publicKey: 'paste_your_public_key_here',
  serviceId: 'paste_your_service_id_here',
  templateId: 'paste_your_template_id_here',
};
```

### 3. Update Contact Emails

Edit `src/components/molecule/ContactModal.tsx` (lines 30-41):
```typescript
const contactInfo = {
  info: {
    email: 'your_info_email@example.com',      // Change this
    phone: '+374 (00) 000-000',
  },
  sales: {
    email: 'your_sales_email@example.com',     // Change this
    phone: '+374 (11) 111-111',
  },
};
```

### 4. Test It

Start your app:
```bash
npm run dev
```

**Test Admin Login:**
- Go to http://localhost:5173/admin
- Login modal should appear
- Enter your admin credentials
- Dashboard should load

**Test Contact Form:**
- Go to http://localhost:5173 (home page)
- Click "Contact Us" button (top right or in hero section)
- Fill form and submit
- Check your email inbox for the message

---

## 📦 What's New

### New Hooks
- `useAuth` - Manages admin login/logout
- `useCreateProduct`, `useUpdateProduct`, `useDeleteProduct`
- `useCreateNews`, `useUpdateNews`, `useDeleteNews`

### New Components
- `AuthModal` - Login form (pops up at `/admin`)
- `ContactModal` - Contact form (opens from "Contact Us" buttons)

### New Features
- Admin authentication with JWT tokens
- Category/Subcategory dropdown in product form
- Real data from backend for all operations
- Email sending via EmailJS
- Delete functionality for products/news

---

## 🔗 Backend API Requirements

Your backend should have these endpoints:

**Authentication**
```
POST /auth/login
  Request: { username: string, password: string }
  Response: { token: string, user: { id, username, email } }
```

**Products**
```
GET /products
POST /products
PUT /products/:id
DELETE /products/:id
```

**News**
```
GET /news
POST /news
PUT /news/:id
DELETE /news/:id
```

**Categories**
```
GET /categories
  Response: [{ id, name: { hy, ru, en }, subcategories: [...] }]
```

---

## 🔑 Key Files

| File | Purpose |
|------|---------|
| `src/hooks/useAuth.ts` | Authentication logic |
| `src/config/emailjsConfig.ts` | EmailJS credentials |
| `src/components/pages/admin/AuthModal.tsx` | Login form |
| `src/components/molecule/ContactModal.tsx` | Contact form |
| `src/components/pages/AdminDashboard.tsx` | Admin panel with auth |
| `src/components/molecule/Hero.tsx` | Contact button integration |

---

## ❓ Troubleshooting

**Login doesn't work?**
- Check backend `/auth/login` endpoint is working
- Verify credentials are correct
- Check browser console for error messages

**Contact form doesn't send emails?**
- Verify `src/config/emailjsConfig.ts` has your credentials
- Check EmailJS dashboard - is service active?
- Look in browser console for errors

**Category dropdown empty?**
- Check `/categories` endpoint returns data
- Verify category data has required structure

---

## 📚 Full Documentation

- `SETUP_GUIDE.md` - Detailed setup instructions
- `EMAILJS_SETUP.md` - EmailJS-specific guide
- `IMPLEMENTATION_SUMMARY.md` - Complete feature list

---

## 💡 Tips

1. **Test locally first** - Set up EmailJS and test before deploying
2. **Use environment variables** - Don't hardcode credentials in production
3. **Check backend logs** - Most issues are from backend API
4. **Browser DevTools** - Check Console and Network tabs for errors

---

**Need help?** Check the full documentation files or contact backend team to verify API responses.
