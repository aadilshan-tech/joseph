// Jopips - Forex & Gold Trading Mentorship
// Google Sheets Integration + WhatsApp Confirmation

/*
 * ============================================
 * GOOGLE SHEETS SETUP INSTRUCTIONS
 * ============================================
 * 
 * STEP 1: CREATE GOOGLE SHEET
 * ----------------------------
 * 1. Go to https://sheets.google.com
 * 2. Click "+ Blank" to create new spreadsheet
 * 3. Name it: "Jopips Leads"
 * 4. Add these headers in Row 1:
 *    A1: Name
 *    B1: WhatsApp
 *    C1: Market
 *    D1: Experience
 *    E1: Broker
 *    F1: Timestamp
 * 
 * STEP 2: OPEN APPS SCRIPT
 * -------------------------
 * 1. In your Google Sheet, click: Extensions → Apps Script
 * 2. Delete any default code
 * 3. Copy the doPost(e) code from GoogleAppsScript.gs file
 * 4. Paste it into the editor
 * 5. Click Save (💾 icon)
 * 6. Name project: "Jopips Form Handler"
 * 
 * STEP 3: DEPLOY AS WEB APP
 * --------------------------
 * 1. Click: Deploy → New deployment
 * 2. Click gear icon ⚙️ next to "Select type"
 * 3. Choose: "Web app"
 * 4. Settings:
 *    - Execute as: Me (your email)
 *    - Who has access: Anyone ⚠️ IMPORTANT!
 * 5. Click: Deploy
 * 6. Authorize access (click through security warnings)
 * 7. COPY the Web App URL (looks like: https://script.google.com/macros/s/.../exec)
 * 
 * STEP 4: UPDATE THIS FILE
 * -------------------------
 * 1. Find line 67 below: const GOOGLE_SCRIPT_URL = '...';
 * 2. Replace with your copied URL
 * 3. Save this file
 * 4. Deploy to Vercel
 * 
 * WHERE YOUR LEADS APPEAR
 * ------------------------
 * • Every registration creates a new row in "Jopips Leads" sheet
 * • Access anytime: https://sheets.google.com
 * • Each row shows: Name, WhatsApp number, preferences, timestamp
 * • You can export to Excel: File → Download → Excel
 * • You can filter, sort, or create charts with the data
 * 
 * HOW TO CONTACT LEADS
 * --------------------
 * Method 1: WhatsApp redirect happens automatically after signup
 * Method 2: Copy WhatsApp numbers from sheet and contact manually
 * Method 3: Export to CSV and import to CRM/marketing tool
 * 
 */

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION
    // ============================================
    
    // ⚠️ PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE
    // Get this from: Apps Script → Deploy → Web app URL
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxb0y3K_QpapnCb3-UcQ1S78Fa46ivN7HAQd6oCaWGRoKjBGVG4dY3G8LXTUrXevCM6jg/exec';
    
    // ⚠️ Your WhatsApp number for confirmations (already set)
    const WHATSAPP_NUMBER = '919895687959';

    // ============================================
    // PAGE LOADER
    // ============================================
    
    function hideLoader() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            setTimeout(function() {
                loader.classList.add('hidden');
                setTimeout(function() {
                    loader.style.display = 'none';
                }, 500);
            }, 100);
        }
    }

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    
    function initScrollAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in-section');
        
        if (fadeElements.length === 0) return;

        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            return (
                rect.top <= windowHeight * 0.8 &&
                rect.bottom >= 0
            );
        }

        function handleScroll() {
            fadeElements.forEach(function(element) {
                if (isInViewport(element) && !element.classList.contains('visible')) {
                    element.classList.add('visible');
                }
            });
        }

        handleScroll();

        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ============================================
    // FAQ ACCORDION
    // ============================================
    
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(function(item) {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(function(otherItem) {
                    otherItem.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // ============================================
    // FORM SUBMISSION WITH GOOGLE SHEETS + WHATSAPP
    // ============================================
    
    function initForm() {
        const form = document.getElementById('signalForm');
        if (!form) return;

        form.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevent page reload/jump

            // Get form values
            const formData = {
                fullName: document.getElementById('fullName').value.trim(),
                whatsappNumber: document.getElementById('whatsappNumber').value.trim(),
                marketPreference: document.getElementById('marketPreference').value,
                experience: document.getElementById('experience').value,
                broker: document.getElementById('broker').value.trim() || 'Not provided',
                timestamp: new Date().toISOString()
            };

            // Basic validation
            if (!formData.fullName || !formData.whatsappNumber || !formData.marketPreference || !formData.experience) {
                showMessage('Please fill in all required fields', 'error');
                return;
            }

            // Phone number validation
            const phonePattern = /^\+?[1-9]\d{1,14}$/;
            if (!phonePattern.test(formData.whatsappNumber)) {
                showMessage('Please enter a valid WhatsApp number with country code', 'error');
                return;
            }

            // Check if Google Script URL is configured
            if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('YOUR_GOOGLE_APPS_SCRIPT')) {
            showMessage('⚠️ Google Sheets is not connected yet.', 'error');
            return;
}


            // Show loading state
            setLoading(true);
            hideMessage();

            try {
                // Submit to Google Sheets
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors', // Required for Google Apps Script
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                // Success! (mode: 'no-cors' means we can't read response, but no error = success)
                
                // Show success message
                showMessage('✅ Registration successful. Opening WhatsApp...', 'success');
                
                // Reset form
                form.reset();
                
                // ============================================
                // WHATSAPP CONFIRMATION WITH USER DETAILS
                // ============================================
                
                // Build dynamic message with user's information
                const whatsappMessage = 
                    `Hi, I just registered for the free signals on Jopips. ` +
                    `My name is ${formData.fullName}. ` +
                    `My WhatsApp number is ${formData.whatsappNumber}.`;
                
                // Encode the message for URL
                const encodedMessage = encodeURIComponent(whatsappMessage);
                
                // Build WhatsApp URL
                const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
                
                // Redirect to WhatsApp after 1.5 seconds
                setTimeout(function() {
                    window.location.href = whatsappURL; // Direct redirect (not popup)
                }, 1500);

            } catch (error) {
                console.error('Submission error:', error);
                showMessage('⚠️ Something went wrong. Please try again or contact us on WhatsApp.', 'error');
                setLoading(false); // Re-enable button on error
            }
        });
    }

    function setLoading(isLoading) {
        const submitBtn = document.getElementById('submitBtn');
        const submitText = document.getElementById('submitText');
        const loadingText = document.getElementById('loadingText');
        
        if (isLoading) {
            submitBtn.disabled = true;
            submitText.textContent = 'Submitting...'; // Update text
            submitText.classList.remove('hidden');
            loadingText.classList.add('hidden');
        } else {
            submitBtn.disabled = false;
            submitText.textContent = 'Join Free Signals'; // Reset text
            submitText.classList.remove('hidden');
            loadingText.classList.add('hidden');
        }
    }

    function showMessage(text, type) {
        const messageEl = document.getElementById('formMessage');
        messageEl.textContent = text;
        messageEl.className = `form-message ${type}`;
        messageEl.classList.remove('hidden');
    }

    function hideMessage() {
        const messageEl = document.getElementById('formMessage');
        messageEl.classList.add('hidden');
    }

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ============================================
    // INITIALIZATION
    // ============================================
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initScrollAnimations();
            initFAQ();
            initForm();
            initSmoothScroll();
        });
    } else {
        initScrollAnimations();
        initFAQ();
        initForm();
        initSmoothScroll();
    }

    // Hide loader when page fully loads
    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
    }

})();


/* 
 * ============================================
 * HOW TO ACCESS YOUR LEADS
 * ============================================
 * 
 * VIEWING LEADS IN GOOGLE SHEETS:
 * --------------------------------
 * 1. Go to: https://sheets.google.com
 * 2. Find: "Jopips Leads" spreadsheet
 * 3. Each row = one registration
 * 4. Columns show: Name, WhatsApp, Market preference, Experience, Broker, Timestamp
 * 
 * WHAT HAPPENS AFTER SOMEONE REGISTERS:
 * --------------------------------------
 * 1. Their data saves to Google Sheet (new row added)
 * 2. Success message appears on website
 * 3. After 1.5 seconds, they're redirected to WhatsApp
 * 4. WhatsApp opens with pre-filled message containing their details
 * 5. They send you the message (you receive notification)
 * 6. You can reply immediately
 * 
 * HOW TO CONTACT YOUR LEADS:
 * --------------------------
 * Option 1: Wait for WhatsApp messages (they come automatically)
 * Option 2: Copy phone numbers from Google Sheet
 * Option 3: Export sheet to Excel/CSV
 * Option 4: Use Google Sheets filters to segment leads
 * 
 * EXAMPLE GOOGLE SHEET DATA:
 * ---------------------------
 * | Name      | WhatsApp      | Market | Experience | Broker     | Timestamp           |
 * |-----------|---------------|--------|------------|------------|---------------------|
 * | John Doe  | +919876543210 | both   | beginner   | MetaTrader | 2026-02-15 10:30:00 |
 * | Jane Smith| +917123456789 | forex  | learning   | IG Markets | 2026-02-15 11:45:00 |
 * 
 * TROUBLESHOOTING:
 * ----------------
 * - Leads not appearing? Check Google Script deployment settings
 * - WhatsApp not opening? Check WHATSAPP_NUMBER constant (line 67)
 * - Form not submitting? Check GOOGLE_SCRIPT_URL is set (line 64)
 * 
 * For detailed setup: See SETUP_GUIDE.md
 */