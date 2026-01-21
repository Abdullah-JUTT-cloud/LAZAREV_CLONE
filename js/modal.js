/**
 * Modal Module
 * Handles contact form modal functionality
 */

/**
 * Contact form modal functionality
 * Opens modal on "Let's Talk" click, handles form submission
 */
function contactFormModal() {
    const modal = document.getElementById('contact-modal');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const contactForm = document.getElementById('contact-form');

    // Get all "Let's Talk" buttons
    const navTalkBtn = document.querySelector('#nav-talk-btn');
    const footerTalkBtn = document.getElementById('footer-talk-btn');

    /**
     * Open the modal and disable body scroll
     */
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close the modal and enable body scroll
     */
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
                if (typeof locoScrollInstance !== 'undefined' && locoScrollInstance) {
                    locoScrollInstance.scrollTo(0, { duration: 1000 });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 1500);
        });
    }
}
