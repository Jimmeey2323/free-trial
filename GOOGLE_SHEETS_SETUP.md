# 🔄 Google Sheets Automation Setup

This guide will help you set up automatic synchronization of form submissions to your Google Sheet.

## 📊 Your Google Sheet

**Spreadsheet URL**: https://docs.google.com/spreadsheets/d/14m4nZQ4Rs0sbC8Q75cPcSFR61MmHijII1Vds12YObWY/edit?gid=0#gid=0

**Sheet Name**: Website

---

## 🚀 Quick Setup

### Step 1: Install Dependencies

```bash
npm install
```

This will install the `googleapis` package needed for Google Sheets integration.

### Step 2: Configure Environment Variables

#### For Local Development:

Create a `.env` file in your project root:

```bash
# Google Sheets Configuration
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REFRESH_TOKEN=your_refresh_token_here
GOOGLE_SPREADSHEET_ID=14m4nZQ4Rs0sbC8Q75cPcSFR61MmHijII1Vds12YObWY
GOOGLE_SHEET_NAME=Website
```

**Note**: Replace the placeholder values with your actual credentials. These are provided separately for security.

#### For Railway Deployment:

1. Go to your Railway project
2. Click on your service
3. Go to "Variables" tab
4. Add these environment variables:

```
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REFRESH_TOKEN=your_refresh_token_here
GOOGLE_SPREADSHEET_ID=14m4nZQ4Rs0sbC8Q75cPcSFR61MmHijII1Vds12YObWY
GOOGLE_SHEET_NAME=Website
```

**Important**: Use the actual credentials provided to you separately. Never commit credentials to git.

5. Railway will automatically redeploy with the new variables

### Step 3: Setup Sheet Headers (One-Time)

Run this once to create the column headers in your Google Sheet:

```bash
# Local
curl -X POST http://localhost:3000/api/sheets/setup

# Production (after deployment)
curl -X POST https://your-app.up.railway.app/api/sheets/setup
```

Or visit in your browser:
- Local: http://localhost:3000/api/sheets/setup
- Production: https://your-app.up.railway.app/api/sheets/setup

### Step 4: Test Connection

```bash
# Local
curl http://localhost:3000/api/sheets/test

# Production
curl https://your-app.up.railway.app/api/sheets/test
```

### Step 5: Start Server

```bash
npm start
```

---

## 📋 What Gets Saved to Google Sheets

Every form submission will automatically create a new row with these columns:

| Column | Description |
|--------|-------------|
| Timestamp | Date and time of submission (IST) |
| First Name | Lead's first name |
| Last Name | Lead's last name |
| Email | Email address |
| Phone Number | Phone number with country code |
| Preferred Time | When they want to be contacted |
| Studio Location | Selected studio |
| Class Type | Selected class type |
| UTM Source | Traffic source (google, facebook, etc.) |
| UTM Medium | Marketing medium (cpc, paid_social, etc.) |
| UTM Campaign | Campaign identifier |
| UTM Content | Ad content/variant |
| UTM Term | Search keywords |
| Google Click ID | gclid parameter |
| Facebook Click ID | fbclid parameter |
| Microsoft Click ID | msclkid parameter |
| TikTok Click ID | ttclid parameter |
| Landing Page | Full URL where user arrived |
| Referrer | Previous page URL |

---

## 🔄 How Automation Works

1. **User submits form** on your website
2. **Data sent to Momence API** (your CRM)
3. **Simultaneously stored in your analytics database**
4. **Automatically appended to Google Sheets** in real-time
5. **User redirected** to booking page

The process is **automatic** and **non-blocking** - if Google Sheets is temporarily unavailable, it won't affect form submissions.

---

## 🧪 Testing

### Test 1: Submit a Form

1. Visit your form: http://localhost:3000
2. Add UTM parameters: `?utm_source=google&utm_campaign=test`
3. Fill and submit the form
4. Check your Google Sheet - new row should appear instantly

### Test 2: Check Logs

After submitting a form, you should see in the console:

```
📊 New lead captured: { name: 'John Doe', source: 'google', campaign: 'test' }
✅ Lead appended to Google Sheet: John Doe
✅ Lead synced to Google Sheets
```

### Test 3: Verify API

```bash
# Check if Google Sheets is connected
curl http://localhost:3000/api/sheets/test

# Expected response:
{"success":true,"message":"Connected"}
```

---

## 🎨 Customizing Sheet Columns

If you want to add or remove columns, edit `googleSheets.js`:

```javascript
// In setupHeaders() method - add/remove header names
const headers = [
  'Timestamp',
  'First Name',
  // ... add your custom fields here
];

// In appendLead() method - add/remove data values
const row = [
  new Date().toLocaleString(),
  leadData.firstName || '',
  // ... add your custom data here
];
```

---

## 🔐 Security Notes

- **Never commit `.env` file** - it's already in `.gitignore`
- **Use Railway environment variables** for production
- **Refresh token is secure** - it's used server-side only
- **OAuth2 credentials** should be kept confidential

---

## 🐛 Troubleshooting

### Issue: "Google Sheets API not initialized"

**Solution**: Ensure environment variables are set correctly.

```bash
# Check if variables are loaded
echo $GOOGLE_CLIENT_ID
```

### Issue: "Failed to sync to Google Sheets"

**Solution**: 
1. Check your refresh token is valid
2. Ensure the spreadsheet ID is correct
3. Verify the sheet name "Website" exists
4. Check Google Sheets API is enabled in your Google Cloud Console

### Issue: "Permission denied"

**Solution**: Make sure the Google account associated with the OAuth credentials has edit access to the spreadsheet.

### Issue: Headers not showing up

**Solution**: Run the setup endpoint:
```bash
curl -X POST http://localhost:3000/api/sheets/setup
```

---

## 📊 Sheet Format Example

After setup, your Google Sheet will look like this:

```
| Timestamp          | First Name | Last Name | Email           | Phone        | ... | UTM Source | UTM Campaign    |
|--------------------|------------|-----------|-----------------|--------------|-----|------------|-----------------|
| 01/12/2024, 2:30pm | John       | Doe       | john@email.com  | +919876543210| ... | google     | trial_dec_2024  |
| 01/12/2024, 3:45pm | Jane       | Smith     | jane@email.com  | +918765432109| ... | facebook   | instagram_promo |
```

---

## 🎉 You're All Set!

Every form submission will now automatically:
- ✅ Save to Momence CRM
- ✅ Store in your analytics database
- ✅ Append to Google Sheets in real-time
- ✅ Include all UTM tracking data

Monitor your Google Sheet to see leads flowing in automatically! 📊

---

## 📞 API Endpoints

### Setup Endpoints

```bash
POST /api/sheets/setup    # Setup sheet headers (run once)
GET  /api/sheets/test     # Test Google Sheets connection
```

### Lead Endpoints

```bash
POST /api/leads           # Submit lead (automatic Google Sheets sync)
GET  /api/leads           # Get all leads
GET  /api/campaigns/stats # Get campaign statistics
GET  /api/leads/export    # Download CSV
```

---

**Need help?** Check the server logs for detailed error messages.
