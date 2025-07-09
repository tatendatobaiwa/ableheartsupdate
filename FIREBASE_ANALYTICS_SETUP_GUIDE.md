# 🔥 Firebase Analytics Setup Guide for AbleHearts Foundation

## 📋 **Complete Step-by-Step Firebase Integration**

### **Phase 1: Firebase Console Setup**

#### **Step 1: Access Firebase Console**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Sign in with your Google account
3. Select your existing AbleHearts project (or create new one)

#### **Step 2: Enable Google Analytics**
1. In Firebase Console, click on your project
2. Go to **Project Settings** (gear icon in left sidebar)
3. Click on **Integrations** tab
4. Find **Google Analytics** section
5. Click **Enable Google Analytics**
6. Choose existing Google Analytics account or create new one
7. Select or create a **Google Analytics 4 property**
8. Click **Enable Analytics**

#### **Step 3: Get Your Measurement ID**
1. After enabling Analytics, go to **Project Settings**
2. Scroll down to **Your apps** section
3. Find your web app configuration
4. Copy the **measurementId** (starts with G-XXXXXXXXXX)
5. This is your `VITE_GA4_MEASUREMENT_ID`

### **Phase 2: Firebase Project Configuration**

#### **Step 4: Update Firebase Config**
1. In Firebase Console, go to **Project Settings**
2. Scroll to **Your apps** section
3. Click on your web app (or add web app if none exists)
4. Copy the Firebase configuration object

#### **Step 5: Verify Your Firebase Config**
Your `src/firebase/config.js` should look like this:
```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_GA4_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (with consent checking)
export const initializeFirebaseAnalytics = async () => {
  try {
    const supported = await isSupported();
    if (supported) {
      const analytics = getAnalytics(app);
      return analytics;
    }
    return null;
  } catch (error) {
    console.error('Firebase Analytics not supported:', error);
    return null;
  }
};

export default app;
```

### **Phase 3: Environment Variables Setup**

#### **Step 6: Update Environment Variables**
Add these to your `.env` file:
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Google Analytics 4 (from Firebase)
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Analytics Settings
VITE_ENABLE_ANALYTICS=true
VITE_REQUIRE_CONSENT=true
```

### **Phase 4: Firebase Analytics Configuration**

#### **Step 7: Configure Analytics in Firebase Console**
1. Go to **Analytics** in left sidebar
2. Click **Events** to see tracked events
3. Go to **Conversions** to set up conversion goals
4. Click **Audiences** to create user segments

#### **Step 8: Set Up Custom Events**
1. In Firebase Console, go to **Analytics > Events**
2. Click **Manage custom definitions**
3. Add these custom events:
   - `donation` - Track donations
   - `volunteer_signup` - Track volunteer registrations
   - `newsletter_signup` - Track newsletter subscriptions
   - `program_view` - Track program page views
   - `contact_form_submit` - Track contact form submissions

#### **Step 9: Configure Enhanced E-commerce**
1. Go to **Analytics > Events**
2. Look for `purchase` events (for donations)
3. Mark `purchase` as a conversion event
4. Set up custom parameters:
   - `currency` - Donation currency
   - `value` - Donation amount
   - `payment_method` - Payment method used

### **Phase 5: Advanced Firebase Analytics Setup**

#### **Step 10: Create Custom Dimensions**
1. In Firebase Console, go to **Analytics > Custom definitions**
2. Click **Create custom dimension**
3. Add these dimensions:
   - **User Consent Status** - Track consent preferences
   - **Program Type** - Track which programs users engage with
   - **Volunteer Location** - Track volunteer geographic data
   - **Donation Source** - Track donation campaign sources

#### **Step 11: Set Up Conversion Goals**
1. Go to **Analytics > Conversions**
2. Mark these events as conversions:
   - `donation` - Primary conversion goal
   - `volunteer_signup` - Secondary conversion
   - `newsletter_signup` - Engagement conversion
   - `contact_form_submit` - Lead conversion

#### **Step 12: Configure Audiences**
1. Go to **Analytics > Audiences**
2. Create these audiences:
   - **Donors** - Users who completed donations
   - **Volunteers** - Users who signed up to volunteer
   - **Engaged Users** - Users with high engagement
   - **Newsletter Subscribers** - Users who subscribed

### **Phase 6: Testing & Verification**

#### **Step 13: Test Analytics Implementation**
1. Deploy your website with new configuration
2. Visit your website and perform test actions:
   - Navigate between pages
   - Accept analytics cookies
   - Fill out forms
   - Click external links

#### **Step 14: Verify Data in Firebase Console**
1. Go to **Analytics > Events** in Firebase Console
2. Check **Realtime** tab to see live events
3. Verify these events are appearing:
   - `page_view` - Page navigation
   - `click` - Button clicks
   - `form_submit` - Form submissions
   - Custom events you implemented

#### **Step 15: Debug Analytics (if needed)**
1. Open browser Developer Tools
2. Go to **Console** tab
3. Look for analytics debug messages
4. Check **Network** tab for gtag requests
5. Use [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) Chrome extension

### **Phase 7: Production Deployment**

#### **Step 16: Production Environment Setup**
1. Set up production environment variables in your hosting platform:
   ```env
   VITE_FIREBASE_API_KEY=your_production_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_production_domain
   VITE_FIREBASE_PROJECT_ID=your_production_project
   VITE_GA4_MEASUREMENT_ID=your_production_measurement_id
   VITE_ENABLE_ANALYTICS=true
   ```

#### **Step 17: Deploy and Monitor**
1. Deploy your application to production
2. Monitor Firebase Analytics for 24-48 hours
3. Verify data accuracy and completeness
4. Check privacy compliance and consent rates

### **Phase 8: Advanced Configuration**

#### **Step 18: Set Up Data Retention**
1. In Firebase Console, go to **Analytics > Data settings**
2. Set **Data retention** to appropriate period (2 months to 14 months)
3. Configure **Reset user data on new activity**

#### **Step 19: Configure Data Sharing**
1. Go to **Analytics > Data settings > Data sharing**
2. Review and configure data sharing settings
3. Ensure compliance with your privacy policy

#### **Step 20: Set Up Reporting**
1. Go to **Analytics > Reports**
2. Create custom reports for:
   - Donation funnel analysis
   - Volunteer signup conversion
   - Program engagement metrics
   - User journey analysis

## 🔧 **Troubleshooting Common Issues**

### **Issue 1: Analytics Not Tracking**
**Solution:**
- Verify `VITE_GA4_MEASUREMENT_ID` is correct
- Check browser console for errors
- Ensure analytics consent is granted
- Verify Firebase config is correct

### **Issue 2: Events Not Appearing**
**Solution:**
- Check if custom events are properly defined
- Verify event parameters are correct
- Ensure user has granted analytics consent
- Wait 24-48 hours for data to appear in reports

### **Issue 3: Consent Issues**
**Solution:**
- Verify cookie consent integration
- Check consent storage and retrieval
- Ensure analytics only loads with consent
- Test consent withdrawal functionality

## ✅ **Verification Checklist**

### **Firebase Setup:** ✅
- [ ] Firebase project created/selected
- [ ] Google Analytics enabled in Firebase
- [ ] Measurement ID obtained
- [ ] Firebase config updated
- [ ] Environment variables set

### **Analytics Configuration:** ✅
- [ ] Custom events defined
- [ ] Conversion goals set up
- [ ] Custom dimensions created
- [ ] Audiences configured
- [ ] Data retention set

### **Testing & Verification:** ✅
- [ ] Test events firing correctly
- [ ] Real-time data appearing
- [ ] Consent integration working
- [ ] Privacy compliance verified
- [ ] Production deployment successful

## 🎊 **Success Indicators**

You'll know your Firebase Analytics integration is successful when:

1. **Real-time Events** appear in Firebase Console
2. **Page Views** are tracked automatically
3. **Custom Events** fire on user interactions
4. **Conversion Goals** track donations and signups
5. **User Consent** is properly respected
6. **Privacy Compliance** is maintained

## 📞 **Support Resources**

- **Firebase Documentation**: https://firebase.google.com/docs/analytics
- **Google Analytics Help**: https://support.google.com/analytics
- **Firebase Console**: https://console.firebase.google.com/
- **Analytics Debugger**: Chrome Web Store

**Your Firebase Analytics integration will provide AbleHearts Foundation with powerful insights while maintaining the highest privacy standards!** 🚀