# Trial Form - Railway Deployment Guide

## 🚀 What's Been Set Up

Your trial form is now ready to be deployed on Railway with full UTM tracking capabilities!

### Files Created:
- `server.js` - Express server to host your form
- `package.json` - Node.js dependencies configuration
- `railway.json` - Railway deployment configuration
- `.gitignore` - Git ignore rules

### Enhanced Features:

#### ✅ UTM Parameter Tracking
Your form now tracks:
- **Standard UTM parameters**: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_id`, `utm_term`
- **Platform Click IDs**: `gclid` (Google), `fbclid` (Facebook), `msclkid` (Microsoft), `ttclid` (TikTok)
- **Additional tracking**: Landing page URL and referrer

#### ✅ Smart Parameter Persistence
- UTM parameters are stored in browser's localStorage for 30 days
- Even if users visit without UTM parameters later, their original source is tracked
- Parameters are automatically sent with every form submission

---

## 📋 Step-by-Step Deployment to Railway

### Step 1: Initialize Git Repository (if not already done)
```bash
cd "/Users/jimmeeygondaa/Manual Library/Developer/Momence Login/trial-form"
git init
git add .
git commit -m "Initial commit with Railway setup"
```

### Step 2: Push to GitHub (Recommended)
```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Railway

1. **Go to Railway**: Visit [railway.app](https://railway.app)
2. **Sign in/Sign up**: Use GitHub authentication
3. **Create New Project**: Click "New Project"
4. **Deploy from GitHub**: 
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway will auto-detect the Node.js app
5. **Wait for deployment**: Railway will automatically:
   - Install dependencies
   - Start your server
   - Generate a public URL

### Step 4: Get Your Live URL
- Once deployed, Railway will provide a URL like: `https://your-app.up.railway.app`
- Click "Settings" → "Domains" to see or customize your domain

---

## 🧪 Testing UTM Tracking

### Test URLs:
```
# Google Ads test
https://your-app.up.railway.app?utm_source=google&utm_medium=cpc&utm_campaign=trial_signup&gclid=test123

# Facebook Ads test
https://your-app.up.railway.app?utm_source=facebook&utm_medium=paid_social&utm_campaign=q4_trial&fbclid=test456

# Complete test
https://your-app.up.railway.app?utm_source=instagram&utm_medium=story&utm_campaign=december_promo&utm_content=video_ad&utm_term=yoga_classes
```

### Verify Tracking:
1. Open the form URL with UTM parameters
2. Open browser console (F12 or Cmd+Option+I)
3. Look for: `UTM Parameters stored:` message
4. Submit the form
5. Check that UTM data is sent to your Momence webhook

---

## 🔧 Local Testing (Optional)

Test locally before deploying:

```bash
# Install dependencies
npm install

# Run the server
npm start

# Visit in browser
open http://localhost:3000?utm_source=test&utm_medium=test
```

---

## 📊 How UTM Tracking Works

1. **User clicks ad** with UTM parameters (e.g., from Google/Facebook)
2. **Parameters are captured** from URL on page load
3. **Stored in localStorage** for 30 days
4. **Sent with form submission** to Momence API
5. **Available in your CRM** for attribution and reporting

### Example Data Flow:
```
User clicks: https://your-form.com?utm_source=facebook&utm_campaign=trial
         ↓
    Parameters stored
         ↓
    User fills form
         ↓
Data sent to Momence:
{
  firstName: "John",
  email: "john@example.com",
  utm_source: "facebook",
  utm_campaign: "trial",
  fbclid: "abc123",
  ...
}
```

---

## 🎯 Using Your Form with Ads

### Google Ads:
- Use your Railway URL in your ad destination
- Google automatically adds `gclid` parameter
- Use UTM builder: [ga-dev-tools.google](https://ga-dev-tools.google/ga4/campaign-url-builder/)

### Facebook/Instagram Ads:
- Add UTM parameters in the ad URL parameters section
- Facebook automatically adds `fbclid`

### Example Ad URL:
```
https://your-app.up.railway.app?utm_source=facebook&utm_medium=cpc&utm_campaign=december_trial&utm_content=video_carousel
```

---

## 🔒 Environment Variables (Optional)

If you need to store sensitive data, add environment variables in Railway:
1. Go to your project in Railway
2. Click "Variables" tab
3. Add any needed variables
4. Redeploy

---

## 📱 Next Steps

1. ✅ Deploy to Railway
2. ✅ Test with UTM parameters
3. ✅ Update your Google/Facebook ads with the new URL
4. ✅ Monitor form submissions in Momence
5. ✅ Check UTM attribution in your analytics

---

## 🆘 Troubleshooting

### Form not loading:
- Check Railway logs in the "Deployments" tab
- Ensure `npm start` command works locally

### UTM parameters not tracking:
- Check browser console for errors
- Verify localStorage is enabled
- Test with the test URLs provided above

### Railway deployment failed:
- Ensure all files are committed to git
- Check that package.json has correct dependencies
- Review Railway build logs

---

## 📞 Support

Need help? Check:
- Railway docs: [docs.railway.app](https://docs.railway.app)
- Railway community: [Railway Discord](https://discord.gg/railway)

---

**All set! Your form is ready to track UTM parameters from Google and Meta ads.** 🎉
