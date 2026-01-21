/**
 * Locomotive Scroll Module
 * Handles smooth scrolling initialization and GSAP ScrollTrigger integration
 */

// Global locomotive scroll instance for smooth navigation
let locoScrollInstance = null;

/**
 * Initialize Locomotive Scroll with GSAP ScrollTrigger integration
 * This provides smooth scrolling throughout the page
 */
function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    locoScrollInstance = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
        // for tablet smooth
        tablet: { smooth: true },
        // for mobile
        smartphone: { smooth: true }
    });

    locoScrollInstance.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? locoScrollInstance.scrollTo(value, 0, 0)
                : locoScrollInstance.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        }
    });

    ScrollTrigger.addEventListener("refresh", () => locoScrollInstance.update());
    ScrollTrigger.refresh();
}

/**
 * Smooth scroll navigation - handles clicking nav items to scroll to sections
 */
function smoothScrollNavigation() {
    // Get all navigation elements with data-section attribute
    const navElements = document.querySelectorAll('[data-section]');

    navElements.forEach(elem => {
        elem.style.cursor = 'pointer';

        elem.addEventListener('click', function (e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);

            if (targetSection && locoScrollInstance) {
                // Use locomotive scroll's scrollTo method for smooth navigation
                locoScrollInstance.scrollTo(targetSection, {
                    offset: -80, // Offset for fixed navbar
                    duration: 1000,
                    easing: [0.25, 0.0, 0.35, 1.0]
                });
            }
        });
    });

    // Also handle logo click to scroll to top
    const navLogo = document.querySelector('.nav-logo');
    if (navLogo) {
        navLogo.addEventListener('click', function () {
            if (locoScrollInstance) {
                locoScrollInstance.scrollTo(0, {
                    duration: 1000,
                    easing: [0.25, 0.0, 0.35, 1.0]
                });
            }
        });
    }
}
