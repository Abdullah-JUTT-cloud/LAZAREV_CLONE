/**
 * Component Loader
 * Fetches and injects HTML sections dynamically
 * 
 * NOTE: This requires running on a local server (http://localhost:...)
 * Browsers block fetch() requests to file:// URLs for security
 */

const components = [
    { id: 'nav-placeholder', file: 'sections/nav.html' },
    { id: 'home-placeholder', file: 'sections/hero.html' },
    { id: 'insights-placeholder', file: 'sections/insights.html' },
    { id: 'showreel-placeholder', file: 'sections/showreel.html' },
    { id: 'case-studies-placeholder', file: 'sections/case-studies.html' },
    { id: 'services-placeholder', file: 'sections/services.html' },
    { id: 'process-placeholder', file: 'sections/process.html' },
    { id: 'contact-placeholder', file: 'sections/footer.html' },
    { id: 'modal-placeholder', file: 'sections/modal.html' }
];

async function loadComponents() {
    console.log('🔄 Loading components...');

    try {
        const loadPromises = components.map(async (component) => {
            const placeholder = document.getElementById(component.id);
            if (!placeholder) return;

            try {
                const response = await fetch(component.file);
                if (!response.ok) throw new Error(`Failed to load ${component.file}`);

                const html = await response.text();
                // Replace the placeholder with the content
                // We use outerHTML to remove the placeholder div itself, 
                // but we need to be careful not to break layout. 
                // Since our section files include the outer <section> or <nav> tags, 
                // replacing outerHTML is perfect.
                placeholder.outerHTML = html;
                console.log(`✅ Loaded ${component.file}`);
            } catch (error) {
                console.error(`❌ Error loading ${component.file}:`, error);
                placeholder.innerHTML = `<div style="color:red; padding: 20px;">Error loading section: ${component.file}. <br>Make sure you are running on a local server (http://localhost:8000)</div>`;
            }
        });

        await Promise.all(loadPromises);

        console.log('🎉 All components loaded!');

        // Dispatch event to signal that content is ready
        document.dispatchEvent(new Event('componentsLoaded'));

    } catch (error) {
        console.error('Critical error in component loader:', error);
    }
}

// Start loading when DOM is parsing
document.addEventListener('DOMContentLoaded', loadComponents);
