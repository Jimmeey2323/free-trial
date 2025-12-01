# 🎯 Campaign Tracking - Quick Reference

## What You Have Now

✅ **Form with UTM Tracking** - Captures all campaign data  
✅ **Analytics Dashboard** - Visual tracking of leads by campaign  
✅ **API Endpoints** - Extract data programmatically  
✅ **Auto Storage** - All leads stored automatically  
✅ **CSV Export** - Download data anytime  

---

## 🚀 Quick Access URLs

After deploying to Railway:

```
📝 Lead Form: https://your-app.up.railway.app
📊 Analytics: https://your-app.up.railway.app/analytics
📥 CSV Export: https://your-app.up.railway.app/api/leads/export
📋 All Leads (JSON): https://your-app.up.railway.app/api/leads
```

---

## 📊 What Campaign Data Is Tracked

Every form submission captures:

### UTM Parameters
- **utm_source**: Where traffic came from (google, facebook, instagram)
- **utm_medium**: Type of traffic (cpc, paid_social, organic)
- **utm_campaign**: Campaign name (december_trial_2024)
- **utm_content**: Ad variant (headline_a, video_carousel)
- **utm_term**: Keywords (yoga classes mumbai)

### Auto-Captured Click IDs
- **gclid**: Google Ads (automatic)
- **fbclid**: Facebook/Instagram (automatic)
- **msclkid**: Microsoft Ads (automatic)
- **ttclid**: TikTok Ads (automatic)

### Additional Context
- **landing_page**: Full URL where user arrived
- **referrer**: Previous page URL

---

## 🔗 Setting Up Campaign URLs

### Google Ads
Add to your ad destination URL:
```
?utm_source=google&utm_medium=cpc&utm_campaign=december_trial&utm_content=headline_a
```

**URL Builder**: https://ga-dev-tools.google/campaign-url-builder/

### Facebook/Instagram Ads
In Ad Manager > URL Parameters, add:
```
utm_source=facebook&utm_medium=paid_social&utm_campaign=instagram_december&utm_content=video_1
```

### Example Complete URLs
```
Google: 
https://your-app.up.railway.app?utm_source=google&utm_medium=cpc&utm_campaign=trial_dec_2024&utm_term=yoga_mumbai

Facebook: 
https://your-app.up.railway.app?utm_source=facebook&utm_medium=paid_social&utm_campaign=ig_stories_dec&utm_content=carousel_1

Instagram:
https://your-app.up.railway.app?utm_source=instagram&utm_medium=paid_social&utm_campaign=reels_promo_dec&utm_content=video_a
```

---

## 📈 How to Extract Your Data

### Method 1: Analytics Dashboard (Visual)
1. Go to `https://your-app.up.railway.app/analytics`
2. View stats and filter by source/campaign/date
3. Click "Export CSV" to download

### Method 2: Direct CSV Download
Visit: `https://your-app.up.railway.app/api/leads/export`

### Method 3: API Endpoints

**Get all leads:**
```bash
curl https://your-app.up.railway.app/api/leads
```

**Get Google leads only:**
```bash
curl https://your-app.up.railway.app/api/leads/source/google
```

**Get Facebook leads only:**
```bash
curl https://your-app.up.railway.app/api/leads/source/facebook
```

**Get specific campaign:**
```bash
curl https://your-app.up.railway.app/api/leads/campaign/december_trial_2024
```

**Campaign statistics:**
```bash
curl https://your-app.up.railway.app/api/campaigns/stats
```

### Method 4: View in Browser Console
1. Open your form page
2. Press F12 (or Cmd+Option+I on Mac)
3. Go to Console tab
4. Look for: "Active UTM Parameters:"

---

## 📋 Sample API Response

```json
{
  "id": 1733068800000,
  "timestamp": "2024-12-01T14:30:00.000Z",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phoneNumber": "+919876543210",
  "center": "Supreme Headquarters, Bandra",
  "active": "Yes",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "december_trial_2024",
  "utm_content": "headline_a",
  "utm_term": "yoga classes mumbai",
  "gclid": "Cj0KCQiA...",
  "fbclid": "",
  "landing_page": "https://your-app.up.railway.app?utm_source=google...",
  "referrer": "https://google.com"
}
```

---

## 🎯 Key Metrics to Track

1. **Leads by Source**
   - How many from Google vs Facebook vs Instagram?

2. **Cost Per Lead**
   - Divide ad spend by number of leads per campaign

3. **Best Performing Campaigns**
   - Which campaign name drives most conversions?

4. **Best Performing Ad Content**
   - Which headline/video variant works best?

5. **Location Performance**
   - Which studio gets most interest?

---

## 🔄 Data Flow

```
User clicks ad with UTM → Form captures parameters → Stored in localStorage → 
User submits form → Data sent to:
  1. Momence API (for CRM)
  2. Your API (for analytics)
  3. Google Sheets (for Mumbai/Kemps Corner)
```

---

## 🛠️ Testing Your Setup

### Test 1: Basic UTM Tracking
```
Visit: https://your-app.up.railway.app?utm_source=test&utm_campaign=test_campaign

1. Open browser console (F12)
2. Look for "Active UTM Parameters: {utm_source: 'test', ...}"
3. Fill and submit form
4. Check /analytics dashboard for the new lead
```

### Test 2: Google Ads Simulation
```
https://your-app.up.railway.app?utm_source=google&utm_medium=cpc&utm_campaign=trial_test&gclid=test123
```

### Test 3: Facebook Ads Simulation
```
https://your-app.up.railway.app?utm_source=facebook&utm_medium=paid_social&utm_campaign=fb_test&fbclid=test456
```

---

## 📊 Excel/Google Sheets Analysis

After exporting CSV:

1. **Pivot Table by Source**:
   - Rows: utm_source
   - Values: Count of Email

2. **Pivot Table by Campaign**:
   - Rows: utm_campaign
   - Values: Count of Email
   - Filter: Date range

3. **Calculate ROI**:
   - Add column: Ad Spend
   - Formula: `=Ad_Spend/Lead_Count` (Cost per lead)

---

## 🔐 Production Database (Optional Upgrade)

Current setup stores data in memory (resets on restart).

For production, add PostgreSQL:

1. In Railway, click "+ New" → "Database" → "PostgreSQL"
2. Update `package.json`:
   ```json
   "dependencies": {
     "express": "^4.18.2",
     "pg": "^8.11.0"
   }
   ```
3. See `API_INTEGRATION_GUIDE.md` for database setup code

---

## 🎓 Best Practices

1. **Consistent Naming**
   - Use lowercase for sources (google, facebook, instagram)
   - Use underscores for spaces (december_trial_2024)
   - Date your campaigns (campaign_name_dec_2024)

2. **Track Everything**
   - All paid ads should have UTM parameters
   - Test parameters before launching campaigns
   - Review analytics weekly

3. **Regular Exports**
   - Download CSV weekly for backup
   - Analyze trends monthly
   - A/B test different ad content

4. **Privacy & Compliance**
   - Store data securely
   - Follow GDPR/local privacy laws
   - Have a data retention policy

---

## 📞 Common Questions

**Q: Will parameters work if user visits multiple times?**  
A: Yes! Parameters are stored for 30 days in localStorage.

**Q: What if user shares the URL without parameters?**  
A: Original source is preserved for 30 days.

**Q: Can I track which specific ad/headline converted?**  
A: Yes! Use `utm_content` to differentiate ad variants.

**Q: How do I see which keyword drove the lead?**  
A: Check the `utm_term` field (mainly for Google Ads).

**Q: Can I integrate this with Google Analytics?**  
A: Yes! Your Google Analytics will automatically track these UTMs.

---

## ✅ Deployment Checklist

- [ ] Deploy to Railway
- [ ] Test form submission
- [ ] Verify UTM tracking in console
- [ ] Check analytics dashboard works
- [ ] Test CSV export
- [ ] Add UTM parameters to all ad campaigns
- [ ] Test with sample campaign URLs
- [ ] Monitor first real leads

---

**You're all set to track every lead's source and campaign! 🎉**

Check `/analytics` after deployment to see your dashboard.
