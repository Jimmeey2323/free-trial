# Trial Form with Campaign Tracking 🎯

A complete lead capture form with advanced UTM tracking, analytics dashboard, and Railway deployment setup for Physique 57.

## 🚀 Features

- ✅ **Smart UTM Tracking** - Captures all Google & Facebook campaign parameters
- ✅ **30-Day Persistence** - Tracks user source even after they return
- ✅ **Analytics Dashboard** - Visual tracking of leads by campaign
- ✅ **API Endpoints** - Extract data programmatically
- ✅ **CSV Export** - Download campaign data anytime
- ✅ **Multi-Platform Support** - Google, Facebook, Instagram, TikTok, Microsoft
- ✅ **Railway Ready** - One-click deployment
- ✅ **Real-time Tracking** - See leads as they come in

## 📁 Files

```
trial-form/
├── index.html                      # Lead capture form
├── server.js                       # Express server with API
├── analytics-dashboard.html        # Analytics dashboard
├── package.json                    # Node.js dependencies
├── railway.json                    # Railway config
├── .gitignore                      # Git ignore rules
├── DEPLOYMENT_GUIDE.md             # Railway deployment steps
├── CAMPAIGN_TRACKING_GUIDE.md      # Quick reference (START HERE!)
├── API_INTEGRATION_GUIDE.md        # Advanced integration
└── README.md                       # This file
```

## ⚡ Quick Start

### Local Testing

```bash
# Install dependencies
npm install

# Run server
npm start

# Open in browser
open http://localhost:3000

# View analytics
open http://localhost:3000/analytics

# Test with UTM parameters
open http://localhost:3000?utm_source=google&utm_campaign=test
```

### Deploy to Railway

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Deploy on Railway**:
   - Go to [railway.app](https://railway.app)
   - "New Project" → "Deploy from GitHub"
   - Select your repository
   - Done! Railway will auto-deploy

3. **Access Your App**:
   - Form: `https://your-app.up.railway.app`
   - Analytics: `https://your-app.up.railway.app/analytics`

## 📊 What Campaign Data Is Tracked

### Automatically Captured
- `utm_source` - Traffic source (google, facebook, instagram)
- `utm_medium` - Marketing medium (cpc, paid_social, organic)
- `utm_campaign` - Campaign identifier
- `utm_content` - Ad variant/content
- `utm_term` - Keywords
- `gclid` - Google Click ID (auto-added)
- `fbclid` - Facebook Click ID (auto-added)
- `landing_page` - Full URL
- `referrer` - Previous page

## 🔗 Setting Up Campaign URLs

### Google Ads
```
https://your-app.up.railway.app?utm_source=google&utm_medium=cpc&utm_campaign=december_trial&utm_content=headline_a
```

### Facebook/Instagram
```
https://your-app.up.railway.app?utm_source=facebook&utm_medium=paid_social&utm_campaign=ig_stories_dec&utm_content=video_1
```

**Use the Google Campaign URL Builder**: https://ga-dev-tools.google/campaign-url-builder/

## 📈 Accessing Your Data

### 1. Analytics Dashboard (Recommended)
Visit: `https://your-app.up.railway.app/analytics`

Features:
- Filter by source, medium, campaign, date
- Real-time statistics
- Export to CSV
- Visual breakdown

### 2. API Endpoints

```bash
# Get all leads
GET /api/leads

# Get campaign statistics
GET /api/campaigns/stats

# Get leads by source
GET /api/leads/source/google
GET /api/leads/source/facebook

# Get leads by campaign
GET /api/leads/campaign/december_trial_2024

# Export as CSV
GET /api/leads/export
```

### 3. Direct CSV Download
Simply visit: `https://your-app.up.railway.app/api/leads/export`

## 🎯 Example Use Cases

### Track Google Ads Performance
```
Ad URL: https://your-app.up.railway.app?utm_source=google&utm_medium=cpc&utm_campaign=yoga_classes_2024&utm_term=yoga+mumbai

Dashboard → Filter by "google" → See all Google leads
API: GET /api/leads/source/google
```

### Compare Facebook vs Instagram
```
Facebook: ?utm_source=facebook&utm_campaign=trial_promo
Instagram: ?utm_source=instagram&utm_campaign=trial_promo

Dashboard → Group by Source → Compare conversion rates
```

### Track Ad Variations
```
Headline A: ?utm_content=headline_a
Headline B: ?utm_content=headline_b
Video Ad: ?utm_content=video_1

Dashboard → Group by Content → See which performs best
```

## 🛠️ Testing

### Test 1: UTM Tracking
```bash
# Visit form with test parameters
open "http://localhost:3000?utm_source=test&utm_campaign=test_campaign"

# Check console (F12) for: "Active UTM Parameters"
# Submit form
# Check /analytics for the lead
```

### Test 2: API Endpoints
```bash
# Submit a test lead, then:
curl http://localhost:3000/api/leads
curl http://localhost:3000/api/campaigns/stats
```

### Test 3: CSV Export
```bash
# Visit in browser:
open http://localhost:3000/api/leads/export
```

## 📚 Documentation

- **[CAMPAIGN_TRACKING_GUIDE.md](./CAMPAIGN_TRACKING_GUIDE.md)** - Quick reference for daily use ⭐ START HERE
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Complete Railway deployment steps
- **[API_INTEGRATION_GUIDE.md](./API_INTEGRATION_GUIDE.md)** - Advanced features & database setup

## 🔄 Data Flow

```
User clicks ad → UTM parameters captured → Stored in localStorage (30 days)
                                              ↓
                                    User fills & submits form
                                              ↓
                    Data sent to: Momence API + Your API + Google Sheets
                                              ↓
                            View in Analytics Dashboard / Export CSV
```

## 🎓 Best Practices

1. **Tag All Campaigns**: Every ad should have UTM parameters
2. **Consistent Naming**: Use lowercase, underscores, and dates
3. **Regular Exports**: Download CSV weekly for backup
4. **Test First**: Always test URLs before launching campaigns
5. **Monitor Weekly**: Check analytics dashboard regularly

## 🔐 Production Notes

**Current Setup**: Data stored in memory (resets on restart)

**For Production**: Add PostgreSQL database in Railway:
- See `API_INTEGRATION_GUIDE.md` for setup
- Add Railway PostgreSQL plugin
- Update `server.js` with database connection

## 📊 Key Metrics to Track

- Total leads by source (Google vs Facebook)
- Cost per lead by campaign
- Best performing ad content
- Conversion rate by landing page
- Location preferences

## 🆘 Troubleshooting

### UTM parameters not showing?
- Check browser console for errors
- Verify localStorage is enabled
- Test with: `?utm_source=test&utm_campaign=test`

### Analytics dashboard shows no data?
- Submit a test lead first
- Check browser console for API errors
- Verify server is running

### Data not persisting?
- Current setup uses memory storage
- Add PostgreSQL for persistent storage
- See `API_INTEGRATION_GUIDE.md`

## 📞 Support

Need help?
- Check the guides in the repository
- Railway docs: [docs.railway.app](https://docs.railway.app)
- Railway Discord: [discord.gg/railway](https://discord.gg/railway)

## 🎉 You're Ready!

Your form now tracks every campaign detail automatically. Deploy to Railway and start capturing lead attribution data!

**Next Steps**:
1. ✅ Deploy to Railway
2. ✅ Add UTM parameters to all ads
3. ✅ Monitor /analytics dashboard
4. ✅ Optimize based on data

---

**Made with ❤️ for Physique 57**
