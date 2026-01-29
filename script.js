// Kerala Bhoomi Style - Minimal JavaScript for Page Loader & Scroll Effects
// Professional, government portal aesthetics - No heavy animations

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
    // FADE-IN ON SCROLL - Subtle government style
    // ============================================
    function initScrollAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in-section');
        
        if (fadeElements.length === 0) return;

        // Check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            // Trigger when element is 80% visible
            return (
                rect.top <= windowHeight * 0.8 &&
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
    // INITIALIZE ON DOM READY
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initScrollAnimations();
        });
    } else {
        initScrollAnimations();
    }

    // Hide loader when page fully loads
    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
    }

})();