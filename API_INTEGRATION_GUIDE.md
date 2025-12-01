# 📊 Extracting Campaign & Ad Details - Complete Guide

## Overview

Your form now captures comprehensive campaign and ad tracking data. Here's how to extract and analyze this information.

---

## 🎯 What Data Is Being Captured

Every form submission includes:

### Standard UTM Parameters
- `utm_source` - Traffic source (e.g., "google", "facebook", "instagram")
- `utm_medium` - Marketing medium (e.g., "cpc", "paid_social", "organic")
- `utm_campaign` - Campaign name (e.g., "december_trial_2024")
- `utm_content` - Ad content/variant (e.g., "headline_a", "video_carousel")
- `utm_term` - Keyword terms (e.g., "yoga classes mumbai")
- `utm_id` - Campaign ID from your platform

### Platform-Specific Click IDs
- `gclid` - Google Ads Click ID (auto-added by Google)
- `fbclid` - Facebook/Instagram Click ID (auto-added by Meta)
- `msclkid` - Microsoft Ads Click ID
- `ttclid` - TikTok Ads Click ID

### Additional Context
- `landing_page` - Full URL where user landed
- `referrer` - Previous page URL

---

## 📍 Where This Data Goes

### 1. Momence API
All UTM data is sent to your Momence webhook endpoints:
- **Bengaluru**: `https://api.momence.com/integrations/customer-leads/33905/collect`
- **Mumbai**: `https://api.momence.com/integrations/customer-leads/13752/collect`

### 2. Browser Console
Check the console log to see captured data:
```javascript
console.log('Active UTM Parameters:', utmParams);
```

---

## 🔍 How to Extract & Analyze Campaign Data

### Method 1: Via Momence Dashboard
1. Log into your Momence account
2. Go to **Leads** or **Customers** section
3. Look for custom fields containing UTM data
4. Export to CSV/Excel for analysis

### Method 2: Google Sheets Integration
The form already sends data to Google Sheets for non-Bengaluru centers.

**Enhance it to capture UTM data:**

1. Open your Google Apps Script:
   - Go to: `https://script.google.com/macros/s/AKfycbxVNIARfFs0R_KHCxNn_rOCAWI2R-pv1FaLB5IIsI8RcFWDnbFaZUgUKxA--69TMaJ0/exec`
   - Click "Extensions" > "Apps Script"

2. Modify the script to include UTM columns:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  var data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    data.firstName,
    data.lastName,
    data.email,
    data.phoneNumber,
    data.center,
    data.active,
    // Add UTM parameters
    data.utm_source || '',
    data.utm_medium || '',
    data.utm_campaign || '',
    data.utm_content || '',
    data.utm_term || '',
    data.gclid || '',
    data.fbclid || '',
    data.landing_page || '',
    data.referrer || ''
  ]);
  
  return ContentService.createTextOutput("Success");
}
```

3. Add these headers to your Google Sheet:
```
Date | First Name | Last Name | Email | Phone | Studio | Membership | UTM Source | UTM Medium | UTM Campaign | UTM Content | UTM Term | Google Click ID | Facebook Click ID | Landing Page | Referrer
```

### Method 3: Custom API Endpoint (Recommended)

Create your own API to receive and store leads:

```javascript
// Add this to your server.js
const express = require('express');
const app = express();
app.use(express.json());

let leads = []; // In production, use a database

// Endpoint to receive lead data
app.post('/api/leads', (req, res) => {
  const leadData = {
    ...req.body,
    timestamp: new Date().toISOString(),
    id: Date.now()
  };
  
  leads.push(leadData);
  
  console.log('New lead received:', leadData);
  
  res.json({ success: true, id: leadData.id });
});

// Endpoint to get all leads
app.get('/api/leads', (req, res) => {
  res.json(leads);
});

// Endpoint to get campaign statistics
app.get('/api/campaigns/stats', (req, res) => {
  const stats = leads.reduce((acc, lead) => {
    const campaign = lead.utm_campaign || 'No Campaign';
    if (!acc[campaign]) {
      acc[campaign] = {
        campaign,
        source: lead.utm_source || 'Unknown',
        medium: lead.utm_medium || 'Unknown',
        count: 0,
        leads: []
      };
    }
    acc[campaign].count++;
    acc[campaign].leads.push({
      name: `${lead.firstName} ${lead.lastName}`,
      email: lead.email,
      date: lead.timestamp
    });
    return acc;
  }, {});
  
  res.json(Object.values(stats));
});
```

Then modify your form to also send to your endpoint:

```javascript
// In index.html, after successful Momence submission, add:
fetch('/api/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
}).catch(err => console.error('Error logging lead:', err));
```

### Method 4: Use the Analytics Dashboard

I've created `analytics-dashboard.html` for you! To use it:

1. **Update the data source** in the dashboard:
   - Replace the `loadLeadsData()` function to fetch from your API
   - Or connect to Google Sheets
   - Or integrate with Momence API

2. **Example: Fetch from your API**:
```javascript
async function loadLeadsData() {
  const response = await fetch('/api/leads');
  leadsData = await response.json();
  renderDashboard();
}
```

3. **Access the dashboard**: `https://your-railway-app.up.railway.app/analytics-dashboard.html`

---

## 📊 Sample Data Extraction Queries

### Get leads by campaign:
```javascript
const campaignLeads = leads.filter(lead => 
  lead.utm_campaign === 'december_trial_2024'
);
```

### Get leads by source:
```javascript
const googleLeads = leads.filter(lead => 
  lead.utm_source === 'google' || lead.gclid
);
```

### Calculate conversion by campaign:
```javascript
const campaignStats = leads.reduce((acc, lead) => {
  const campaign = lead.utm_campaign || 'Unknown';
  acc[campaign] = (acc[campaign] || 0) + 1;
  return acc;
}, {});
```

---

## 🎯 Setting Up Campaign Tracking URLs

### Google Ads
Google automatically adds `gclid`, but you should add UTM parameters:

**Campaign URL Builder**: https://ga-dev-tools.google/campaign-url-builder/

**Example**:
```
https://your-railway-app.up.railway.app?utm_source=google&utm_medium=cpc&utm_campaign=december_trial_2024&utm_content=headline_a&utm_term=yoga_classes_mumbai
```

### Facebook/Instagram Ads
In your ad settings, add URL parameters:

```
utm_source=facebook&utm_medium=paid_social&utm_campaign=instagram_stories_dec&utm_content=video_carousel
```

Facebook automatically adds `fbclid`.

---

## 🔧 Database Setup (Production Ready)

For production, store leads in a database:

### Option 1: Railway PostgreSQL

1. Add PostgreSQL to your Railway project
2. Install dependencies:
```bash
npm install pg
```

3. Update `server.js`:
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Create table
pool.query(`
  CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT NOW(),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(50),
    center VARCHAR(255),
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(255),
    utm_content VARCHAR(255),
    utm_term VARCHAR(255),
    gclid VARCHAR(255),
    fbclid VARCHAR(255),
    landing_page TEXT,
    referrer TEXT
  )
`);

// Insert lead
app.post('/api/leads', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, center,
          utm_source, utm_medium, utm_campaign, utm_content, utm_term,
          gclid, fbclid, landing_page, referrer } = req.body;
  
  const result = await pool.query(`
    INSERT INTO leads (first_name, last_name, email, phone, center,
                      utm_source, utm_medium, utm_campaign, utm_content, utm_term,
                      gclid, fbclid, landing_page, referrer)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING id
  `, [firstName, lastName, email, phoneNumber, center,
      utm_source, utm_medium, utm_campaign, utm_content, utm_term,
      gclid, fbclid, landing_page, referrer]);
  
  res.json({ success: true, id: result.rows[0].id });
});
```

### Option 2: Airtable
Easy to set up and visualize:

```bash
npm install airtable
```

```javascript
const Airtable = require('airtable');
const base = new Airtable({apiKey: 'YOUR_API_KEY'}).base('YOUR_BASE_ID');

app.post('/api/leads', async (req, res) => {
  await base('Leads').create([{
    fields: req.body
  }]);
  res.json({ success: true });
});
```

---

## 📈 Analytics Best Practices

1. **Tag all your ad campaigns** with UTM parameters
2. **Use consistent naming conventions**:
   - `utm_source`: lowercase, no spaces (e.g., "google", "facebook")
   - `utm_campaign`: descriptive, dated (e.g., "december_trial_2024")
   - `utm_content`: variant identifier (e.g., "headline_a", "video_1")

3. **Track these metrics**:
   - Leads by source (Google vs Facebook vs Instagram)
   - Leads by campaign
   - Conversion rate by ad content
   - Cost per lead (if you track ad spend)

4. **Regular reporting**:
   - Export data weekly
   - Analyze which campaigns drive most leads
   - Optimize based on data

---

## 🆘 Troubleshooting

### UTM parameters not showing up?
- Check browser console for errors
- Verify localStorage is enabled
- Test with: `?utm_source=test&utm_campaign=test`

### Data not in Momence?
- Check if Momence API accepts custom fields
- Contact Momence support to enable UTM field mapping

### Need real-time analytics?
- Set up the PostgreSQL database
- Use the analytics dashboard
- Or integrate with Google Analytics 4

---

## 📞 Next Steps

1. ✅ Choose your data extraction method (Momence, Google Sheets, or custom API)
2. ✅ Set up proper UTM parameters in all your ads
3. ✅ Test with sample campaigns
4. ✅ Monitor and optimize based on data

**Your form is ready to track every campaign and ad detail!** 🎉
