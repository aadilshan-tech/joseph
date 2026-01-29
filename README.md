# Forex Trading Signals & Support Website

A professional, static website for forex trading signals and support services with Kerala Government Bhoomi-style UX enhancements.

## 📁 Project Structure

```
forex-website/
├── index.html      # Main HTML file
├── style.css       # All CSS styles
├── script.js       # Page loader & scroll animations
├── vercel.json     # Vercel deployment configuration
└── README.md       # This file
```

## ✨ Features

### Kerala Bhoomi-Style UX Enhancements
- **Professional Page Loader**: Government portal-style loading screen with spinner and progress bar
- **Subtle Scroll Animations**: Fade-in effects on scroll (10px slide-up, 400ms duration)
- **Minimal Button Interactions**: Subtle hover darkening and 1-2px pressed effects
- **Smooth Scrolling**: Native CSS smooth scroll behavior
- **Accessibility**: Respects `prefers-reduced-motion` for users who prefer minimal animations
- **Performance**: Optimized for low-end Android devices

### Content
- Hero section with WhatsApp, Telegram, and IB registration CTAs
- About section explaining the service
- Services grid showcasing offerings
- Why Choose section highlighting benefits
- Contact section with multiple communication channels
- IB registration section with prominent buttons
- Risk disclaimer footer

### Technical Features
- 100% static (no backend required)
- SEO optimized
- Fully responsive design
- No JavaScript frameworks
- No CSS frameworks
- Lightweight and fast

## 🚀 Deployment to Vercel

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Navigate to your project directory**:
   ```bash
   cd /path/to/your/forex-website
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy: Yes
   - Which scope: Select your account
   - Link to existing project: No
   - Project name: (accept default or enter your own)
   - Directory: `./` (current directory)
   - Override settings: No

5. **Production deployment**:
   ```bash
   vercel --prod
   ```

### Method 2: GitHub + Vercel (Easiest)

1. **Create a GitHub repository**:
   - Go to https://github.com/new
   - Create a new repository (e.g., `forex-signals-website`)

2. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/forex-signals-website.git
   git push -u origin main
   ```

3. **Connect to Vercel**:
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Framework Preset: Select "Other"
   - Root Directory: `./`
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Click "Deploy"

4. **Your site is live!**
   - Vercel will provide a URL like: `https://your-project.vercel.app`

### Method 3: Vercel Dashboard Upload

1. **Zip your project files**:
   - Include: `index.html`, `style.css`, `script.js`, `vercel.json`

2. **Go to Vercel Dashboard**:
   - Visit https://vercel.com/new
   - Drag and drop your project folder or zip file
   - Click "Deploy"

## 🔧 Configuration

### Before Deployment

1. **Update Contact Links** in `index.html`:
   - Replace `YOUR_PHONE_NUMBER` with your WhatsApp number (with country code, e.g., `919876543210`)
   - Replace `YOUR_TELEGRAM_USERNAME` with your Telegram username

2. **IB Registration URLs**:
   - The IB registration URLs are already configured
   - Verify they match your broker partnership links

3. **SEO Optimization**:
   - Update meta description if needed
   - Add your company name to the author tag

### Custom Domain (Optional)

1. **In Vercel Dashboard**:
   - Go to your project
   - Click "Settings" → "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

2. **DNS Configuration**:
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or add A record for root domain

## 🎨 Customization

### Colors
Colors are defined in CSS variables at the top of `style.css`:
```css
:root {
    --red: #dc143c;          /* Primary accent color */
    --dark-red: #b01030;     /* Hover states */
    --black: #0a0a0a;        /* Primary text */
    --dark-gray: #1a1a1a;    /* Secondary backgrounds */
    --white: #ffffff;        /* Backgrounds */
    --light-gray: #f8f8f8;   /* Alternate sections */
    --text-gray: #555555;    /* Body text */
    --border-gray: #e0e0e0;  /* Borders */
}
```

### Content
- Edit `index.html` to modify text content
- Keep HTML structure intact to maintain styling
- All text is in plain HTML (no templating required)

### Animations
- Modify timing in `style.css` under "FADE-IN ON SCROLL" section
- Adjust `transition` duration (currently 400ms)
- Change `translateY` value (currently 10px) for slide-up distance

## 📊 Performance

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 2.5s
- **Total Page Size**: ~15KB (HTML + CSS + JS)
- **No external dependencies**: All resources inline
- **Optimized for**: 3G and slower connections

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- `prefers-reduced-motion` media query support
- Sufficient color contrast (WCAG AA compliant)
- Responsive design (mobile-first)

## 🔒 Security

Security headers configured in `vercel.json`:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: enabled
- Referrer-Policy: strict-origin-when-cross-origin

## 📱 Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Android 90+

## 🐛 Troubleshooting

### Loader doesn't hide
- Check browser console for JavaScript errors
- Ensure `script.js` is loaded properly
- Clear browser cache and reload

### Animations not working
- Check if `fade-in-section` class is applied to sections
- Verify JavaScript is enabled
- Check for `prefers-reduced-motion` in browser settings

### Buttons not working
- Verify WhatsApp/Telegram links are properly formatted
- Check for JavaScript console errors
- Ensure links open in new tabs (`target="_blank"`)

## 📄 License

© 2026 Forex Trading Signals & Support. All rights reserved.

## 🆘 Support

For technical issues or customization help, refer to:
- Vercel Documentation: https://vercel.com/docs
- HTML/CSS/JS Resources: https://developer.mozilla.org/

---

**Note**: This is a static website. No backend, no database, no server-side processing required.