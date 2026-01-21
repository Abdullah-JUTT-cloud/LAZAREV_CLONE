/**
 * Main JavaScript Entry Point
 * Initializes all modules and functionality
 * 
 * This file loads all modular components and runs initialization
 * Load order matters: locomotive scroll must be initialized first
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all modules
    initializeApp();
});

/**
 * Initialize the application
 * Called when DOM is ready
 */
function initializeApp() {
    console.log('🚀 LAZAREV. - Initializing...');

    // 1. Initialize Locomotive Scroll (must be first)
    locomotiveAnimation();
    console.log('✅ Locomotive Scroll initialized');

    // 2. Initialize smooth scroll navigation
    smoothScrollNavigation();
    console.log('✅ Smooth scroll navigation initialized');

    // 3. Initialize scroll-triggered animations
    scrollAnimations();
    console.log('✅ Scroll animations initialized');

    // 4. Initialize navigation dropdown
    navAnimation();
    console.log('✅ Nav animation initialized');

    // 5. Initialize page 2 hover effects
    page2Animation();
    console.log('✅ Page 2 animation initialized');

    // 6. Initialize video player
    page3VideoAnimation();
    console.log('✅ Video player initialized');

    // 7. Initialize page 6 scroll effects
    page6Animations();
    console.log('✅ Page 6 animation initialized');

    // 8. Initialize loading animation
    loadingAnimation();
    console.log('✅ Loading animation initialized');

    // 9. Initialize contact form modal
    contactFormModal();
    console.log('✅ Contact form modal initialized');

    console.log('🎉 LAZAREV. - All modules loaded successfully!');
}
