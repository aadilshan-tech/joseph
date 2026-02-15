# 📝 SETUP GUIDE - Jopips Signal Registration Form

Complete step-by-step instructions to connect your website form to Google Sheets.

---

## 🎯 What You'll Accomplish

By the end of this guide, you'll have:
1. ✅ A Google Sheet that automatically collects form submissions
2. ✅ Duplicate phone number prevention
3. ✅ Automatic WhatsApp redirect after signup
4. ✅ A fully functional lead capture system

---

## 📋 Prerequisites

- A Google account
- Your website files uploaded to Vercel
- Your WhatsApp number

---

## 🚀 STEP-BY-STEP SETUP

### STEP 1: Create Google Sheet

1. Go to https://sheets.google.com
2. Click **"+ Blank"** to create a new spreadsheet
3. Name it **"Jopips Signal Registrations"** (top-left corner)
4. Leave the sheet empty (the script will create headers automatically)

---

### STEP 2: Open Apps Script Editor

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. A new tab will open with the Apps Script editor
3. You'll see a file called `Code.gs` with some default code
4. **Delete all the default code**

---

### STEP 3: Paste the Script Code

1. Open the file **`GoogleAppsScript.gs`** from your project files
2. **Copy all the code** from that file
3. **Paste it** into the Apps Script editor (replacing everything)
4. Click the **💾 Save icon** (or Ctrl+S / Cmd+S)
5. Name your project: **"Jopips Form Handler"** when prompted

---

### STEP 4: Deploy as Web App

1. In Apps Script editor, click **Deploy** → **New deployment**
2. Click the **⚙️ gear icon** next to "Select type"
3. Choose **"Web app"**
4. Configure the deployment:
   - **Description:** "Jopips signal registration form"
   - **Execute as:** Me (your email)
   - **Who has access:** **Anyone** ⚠️ (This is important!)
5. Click **Deploy**
6. **Authorize the app:**
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" → "Go to Jopips Form Handler (unsafe)"
   - Click "Allow"
7. **Copy the Web App URL** that appears (it looks like: `https://script.google.com/macros/s/...../exec`)

⚠️ **IMPORTANT:** Save this URL somewhere safe - you'll need it in the next step!

---

### STEP 5: Update Your Website Code

1. Open the file **`script.js`** in your project
2. Find this line near the top:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with the URL you copied
4. Find this line:
   ```javascript
   const WHATSAPP_NUMBER = 'YOUR_WHATSAPP_NUMBER_HERE';
   ```
5. Replace with your WhatsApp number (include country code, no + or spaces)
   - Example for India: `919876543210`
   - Example for US: `1234567890`
   - Example for UK: `447123456789`

**Example of completed configuration:**
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyXXXXXXXXX/exec';
const WHATSAPP_NUMBER = '919876543210';
```

6. **Save the file**

---

### STEP 6: Update WhatsApp Links in HTML

1. Open **`index.html`**
2. Find all instances of `YOUR_WHATSAPP_NUMBER` (there are several)
3. Replace with your actual number (include country code, no spaces)
   - Use format: `919876543210` (no + sign)
4. Find `YOUR_TELEGRAM_USERNAME`
5. Replace with your actual Telegram username (no @ symbol)

**Example:**
```html
<!-- BEFORE -->
<a href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=...">

<!-- AFTER -->
<a href="https://wa.me/919876543210?text=...">
```

6. **Save the file**

---

### STEP 7: Deploy to Vercel

1. If using GitHub:
   ```bash
   git add .
   git commit -m "Added Jopips branding and Google Sheets integration"
   git push
   ```
   Vercel will automatically redeploy.

2. If uploading manually:
   - Go to your Vercel project
   - Upload the updated files
   - Wait for deployment to complete

---

### STEP 8: Test the Form

1. Visit your live website
2. Scroll to the **"Get Free Forex & Gold Signals"** form
3. Fill in ALL required fields:
   - Your name
   - WhatsApp number (with country code)
   - Select a market preference
   - Select experience level
4. Click **"Join Free Signals"**
5. You should see:
   - "✅ Registration successful! Redirecting to WhatsApp..."
   - Automatic redirect to WhatsApp after 2 seconds
6. Go to your Google Sheet
7. **Check if a new row appeared** with your data!

---

## ✅ Verification Checklist

After setup, verify:
- [ ] Form submissions appear in Google Sheet
- [ ] Sheet has proper headers (Timestamp, WhatsApp Number, etc.)
- [ ] Duplicate phone numbers are rejected
- [ ] Success message appears after submission
- [ ] WhatsApp opens automatically with pre-filled message
- [ ] All WhatsApp buttons on the site work
- [ ] Telegram button works

---

## 🔧 Troubleshooting

### Form shows "Setup incomplete" error
- **Problem:** Google Script URL not configured
- **Solution:** Make sure you replaced `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` in `script.js`

### Nothing happens when submitting form
- **Problem:** JavaScript error or wrong URL
- **Solution:**
  1. Open browser DevTools (F12)
  2. Go to Console tab
  3. Look for error messages
  4. Check that the Web App URL is correct

### Submissions not appearing in Google Sheet
- **Problem:** Deployment settings incorrect
- **Solution:**
  1. Go back to Apps Script
  2. Click Deploy → Manage deployments
  3. Ensure "Who has access" is set to "Anyone"
  4. Try creating a new deployment

### "Authorization required" error
- **Problem:** Didn't authorize the script
- **Solution:** Repeat Step 4, authorization process

### WhatsApp doesn't open
- **Problem:** WhatsApp number not configured
- **Solution:** Check that `WHATSAPP_NUMBER` in `script.js` has your actual number with country code

### Duplicate detection not working
- **Problem:** Script issue
- **Solution:** 
  1. Go to Apps Script
  2. Re-paste the code from `GoogleAppsScript.gs`
  3. Save and re-deploy

---

## 📊 Viewing Your Data

### In Google Sheets

Your Google Sheet will have these columns:
| Timestamp | WhatsApp Number | Full Name | Market Preference | Experience Level | Broker | Registration Date |
|-----------|----------------|-----------|-------------------|------------------|--------|-------------------|
| 2026-02-14T10:30:00Z | +919876543210 | John Doe | both | beginner | MetaTrader | 2/14/2026 |

### Exporting Data

1. File → Download → CSV or Excel
2. Or use Google Sheets built-in filters and charts

---

## 🔒 Security & Privacy

- ✅ Phone numbers are stored securely in your private Google Sheet
- ✅ Only you can access the data
- ✅ Duplicate prevention protects from spam
- ✅ No data is sent to third parties
- ⚠️ Remember to comply with data protection laws (GDPR, etc.)

---

## 🆘 Still Need Help?

### Common Issues:

**Q: Can I change the sheet name?**
A: Yes! In `GoogleAppsScript.gs`, change line 12:
```javascript
const SHEET_NAME = 'YourNewName';
```

**Q: Can I add more fields to the form?**
A: Yes, but you'll need to:
1. Add the field to `index.html`
2. Update `script.js` to collect the data
3. Update `GoogleAppsScript.gs` to save it

**Q: How do I test without deploying?**
A: In Apps Script, run the `testDoPost()` function (click Run button)

---

## 📞 Contact Information to Update

Before going live, make sure you've updated:
- ✅ `script.js` - Google Script URL
- ✅ `script.js` - WhatsApp number
- ✅ `index.html` - All WhatsApp links (search for `YOUR_WHATSAPP_NUMBER`)
- ✅ `index.html` - Telegram username (search for `YOUR_TELEGRAM_USERNAME`)

---

## 🎉 You're Done!

Your form is now:
- ✅ Collecting leads automatically
- ✅ Preventing duplicates
- ✅ Redirecting users to WhatsApp
- ✅ Storing all data in Google Sheets

**Next Steps:**
1. Monitor your Google Sheet for new signups
2. Respond to WhatsApp messages promptly
3. Add new members to your signals group
4. Build your community!

---

**Need further assistance?** Re-read this guide carefully. 99% of issues are solved by following each step exactly.
