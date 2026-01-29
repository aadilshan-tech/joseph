// Kerala Bhoomi Style - Enhanced JavaScript for Premium Animated Experience
// Red, White & Black Theme with Smooth Animations

(function() {
    'use strict';

    // ============================================
    // PAGE LOADER - Hide after page fully loads
    // ============================================
    function hideLoader() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            // Wait for page to fully load
            setTimeout(function() {
                loader.classList.add('hidden');
                // Remove from DOM after transition
                setTimeout(function() {
                    loader.style.display = 'none';
                }, 500);
            }, 100);
        }
    }

    // ============================================
    // FADE-IN ON SCROLL - Enhanced smooth animations
    // ============================================
    function initScrollAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in-section');
        
        if (fadeElements.length === 0) return;

        // Check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            // Trigger when element is 75% visible for smoother experience
            return (
                rect.top <= windowHeight * 0.75 &&
                rect.bottom >= 0
            );
        }

        // Handle scroll
        function handleScroll() {
            fadeElements.forEach(function(element) {
                if (isInViewport(element) && !element.classList.contains('visible')) {
                    element.classList.add('visible');
                }
            });
        }

        // Initial check
        handleScroll();

        // Throttle scroll events for performance
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
    // ENHANCED BUTTON HOVER EFFECTS
    // ============================================
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.btn, .btn-ib-large, .btn-master-ib-large');
        
        buttons.forEach(function(button) {
            button.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });
    }

    // ============================================
    // CARD STAGGER ANIMATION
    // ============================================
    function initCardStagger() {
        const serviceCards = document.querySelectorAll('.service-card');
        const featureItems = document.querySelectorAll('.feature-item');
        
        // Add stagger delay to service cards
        serviceCards.forEach(function(card, index) {
            card.style.transitionDelay = (index * 0.1) + 's';
        });
        
        // Add stagger delay to feature items
        featureItems.forEach(function(item, index) {
            item.style.transitionDelay = (index * 0.1) + 's';
        });
    }

    // ============================================
    // INITIALIZE ON DOM READY
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initScrollAnimations();
            initButtonEffects();
            initCardStagger();
        });
    } else {
        initScrollAnimations();
        initButtonEffects();
        initCardStagger();
    }

    // Hide loader when page fully loads
    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
    }

})();