/**
 * Animations Module
 * Contains all GSAP animations and scroll-triggered effects
 */

/**
 * Page loading animation
 * Initial entrance animation when page loads
 */
function loadingAnimation() {
    const tl = gsap.timeline();

    tl.from("#page1", {
        opacity: 0,
        duration: 0.2,
        delay: 0.2
    });
    tl.from("#page1", {
        transform: "scaleX(0.7) scaleY(0.2) translateY(80%)",
        borderRadius: "150px",
        duration: 2,
        ease: "expo.out"
    });
    tl.from("nav", {
        opacity: 0,
        delay: -0.2
    });
    tl.from("#page1 h1, #page1 p, #page1 div", {
        opacity: 0,
        duration: 0.5,
        stagger: 0.2
    });
}

/**
 * Page 2 hover animation
 * Shows images on article hover
 */
function page2Animation() {
    const rightElems = document.querySelectorAll(".right-elem");

    rightElems.forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
            gsap.to(elem.childNodes[3], {
                opacity: 1,
                scale: 1
            });
        });

        elem.addEventListener("mouseleave", function () {
            gsap.to(elem.childNodes[3], {
                opacity: 0,
                scale: 0
            });
        });

        elem.addEventListener("mousemove", function (dets) {
            gsap.to(elem.childNodes[3], {
                x: dets.x - elem.getBoundingClientRect().x - 90,
                y: dets.y - elem.getBoundingClientRect().y - 215
            });
        });
    });
}

/**
 * Page 3 video animation
 * Handles video play/pause on click
 */
function page3VideoAnimation() {
    const page3Center = document.querySelector(".page3-center");
    const video = document.querySelector("#page3 video");

    if (page3Center && video) {
        page3Center.addEventListener("click", function () {
            video.play();
            gsap.to(video, {
                transform: "scaleX(1) scaleY(1)",
                opacity: 1,
                borderRadius: 0
            });
        });

        video.addEventListener("click", function () {
            video.pause();
            gsap.to(video, {
                transform: "scaleX(0.7) scaleY(0)",
                opacity: 0,
                borderRadius: "30px"
            });
        });
    }

    // Case study video hover
    const sections = document.querySelectorAll(".sec-right");

    sections.forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
            if (elem.childNodes[3]) {
                elem.childNodes[3].style.opacity = 1;
                elem.childNodes[3].play();
            }
        });
        elem.addEventListener("mouseleave", function () {
            if (elem.childNodes[3]) {
                elem.childNodes[3].style.opacity = 0;
                elem.childNodes[3].load();
            }
        });
    });
}

/**
 * Page 6 scroll animations
 * Animates process section items on scroll
 */
function page6Animations() {
    gsap.from("#btm6-part2 h4", {
        x: 0,
        duration: 1,
        scrollTrigger: {
            trigger: "#btm6-part2",
            scroller: "#main",
            start: "top 80%",
            end: "top 10%",
            scrub: true
        }
    });
}

/**
 * Scroll-triggered animations for page sections
 * Elements fade in as they enter the viewport
 * Note: Excludes #page1 (hero) since it has its own loading animation
 */
function scrollAnimations() {
    // Animate section headings (excluding hero section which has loadingAnimation)
    gsap.utils.toArray('.page-section h1, .page-section h2').forEach(heading => {
        // Skip hero section elements - they're animated by loadingAnimation
        if (heading.closest('#page1') || heading.closest('#home')) {
            return;
        }

        gsap.from(heading, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: heading,
                scroller: "#main",
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Animate footer columns with stagger
    gsap.from('.footer-col', {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.footer-main',
            scroller: "#main",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    // Animate footer CTA
    gsap.from('.footer-cta', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.footer-top',
            scroller: "#main",
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });

    // Animate case study sections
    gsap.utils.toArray('.section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 80,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: section,
                scroller: "#main",
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });
}
