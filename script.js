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

function loadingAnimation() {

    var tl = gsap.timeline()
    tl.from("#page1", {
        opacity: 0,
        duration: 0.2,
        delay: 0.2
    })
    tl.from("#page1", {
        transform: "scaleX(0.7) scaleY(0.2) translateY(80%)",
        borderRadius: "150px",
        duration: 2,
        ease: "expo.out"
    })
    tl.from("nav", {
        opacity: 0,
        delay: -0.2
    })
    tl.from("#page1 h1, #page1 p, #page1 div", {
        opacity: 0,
        duration: 0.5,
        stagger: 0.2
    })
}

function navAnimation() {
    var nav = document.querySelector("nav")

    nav.addEventListener("mouseenter", function () {
        let tl = gsap.timeline()

        tl.to("#nav-bottom", {
            height: "21vh",
            duration: 0.5
        })
        tl.to(".nav-part2 h5", {
            display: "block",
            duration: 0.1

        })
        tl.to(".nav-part2 h5 span", {
            y: 0,
            // duration:0.3,
            stagger: {
                amount: 0.5
            }
        })
    })
    nav.addEventListener("mouseleave", function () {
        let tl = gsap.timeline()
        tl.to(".nav-part2 h5 span", {
            y: 25,
            stagger: {
                amount: 0.2
            }
        })
        tl.to(".nav-part2 h5", {
            display: "none",
            duration: 0.1
        })
        tl.to("#nav-bottom", {
            height: 0,
            duration: 0.2
        })
    })
}

function page2Animation() {
    var rightElems = document.querySelectorAll(".right-elem")

    rightElems.forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {




            gsap.to(elem.childNodes[3], {
                opacity: 1,
                scale: 1
            })
        })
        elem.addEventListener("mouseleave", function () {
            gsap.to(elem.childNodes[3], {
                opacity: 0,
                scale: 0
            })
        })
        elem.addEventListener("mousemove", function (dets) {

            gsap.to(elem.childNodes[3], {
                x: dets.x - elem.getBoundingClientRect().x - 90,
                y: dets.y - elem.getBoundingClientRect().y - 215
            })
        })
    })
}

function page3VideoAnimation() {
    var page3Center = document.querySelector(".page3-center")
    var video = document.querySelector("#page3 video")

    page3Center.addEventListener("click", function () {
        video.play()
        gsap.to(video, {
            transform: "scaleX(1) scaleY(1)",
            opacity: 1,
            borderRadius: 0
        })
    })
    video.addEventListener("click", function () {
        video.pause()
        gsap.to(video, {
            transform: "scaleX(0.7) scaleY(0)",
            opacity: 0,
            borderRadius: "30px"
        })
    })


    var sections = document.querySelectorAll(".sec-right")

    sections.forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
            elem.childNodes[3].style.opacity = 1
            elem.childNodes[3].play()
        })
        elem.addEventListener("mouseleave", function () {
            elem.childNodes[3].style.opacity = 0
            elem.childNodes[3].load()
        })
    })

}

function page6Animations() {
    gsap.from("#btm6-part2 h4", {
        x: 0,
        duration: 1,
        scrollTrigger: {
            trigger: "#btm6-part2",
            scroller: "#main",
            // markers:true,
            start: "top 80%",
            end: "top 10%",
            scrub: true
        }
    })
}

function contactFormModal() {
    const modal = document.getElementById('contact-modal');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const contactForm = document.getElementById('contact-form');

    // Get all "Let's Talk" buttons
    const navTalkBtn = document.querySelector('nav button');
    const footerTalkBtn = document.getElementById('footer-talk-btn');

    // Function to open modal
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Function to close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners for opening modal
    if (navTalkBtn) {
        navTalkBtn.addEventListener('click', openModal);
    }

    if (footerTalkBtn) {
        footerTalkBtn.addEventListener('click', openModal);
    }

    // Event listeners for closing modal
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Close modal on ESC key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Form submission handler
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data (you can send this to server)
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Log data (in real app, you'd send this to a server)
            console.log('Form submitted:', data);

            // Show success animation
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="ri-check-line"></i> Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';

            // Redirect to home page after a short delay
            setTimeout(function () {
                closeModal();
                contactForm.reset();
                submitBtn.innerHTML = 'Send Message <i class="ri-arrow-right-up-line"></i>';
                submitBtn.style.background = '';

                // Scroll to top using locomotive scroll
                if (locoScrollInstance) {
                    locoScrollInstance.scrollTo(0, { duration: 1000 });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 1500);
        });
    }
}

// Initialize all functionality
locomotiveAnimation()
smoothScrollNavigation()
scrollAnimations()
navAnimation()
page2Animation()
page3VideoAnimation()
page6Animations()
loadingAnimation()
contactFormModal()