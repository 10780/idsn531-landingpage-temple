/**
 * Scroll-triggered fly-in animations for list items
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
});

function initializeScrollAnimations() {
    // Get all keypoints lists
    const keypointLists = document.querySelectorAll('.keypoints');
    
    // Create intersection observer for scroll detection
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add fly-in class to all li elements in the visible list
                const listItems = entry.target.querySelectorAll('ul li, ol li');
                listItems.forEach((item, index) => {
                    // Add a small delay for each item to create staggered effect
                    setTimeout(() => {
                        item.classList.add('fly-in');
                    }, index * 100); // 100ms delay between each item
                });
                
                // Stop observing this list once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3, // Trigger when 30% of the list is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before the element is fully visible
    });
    
    // Start observing all keypoints lists
    keypointLists.forEach(list => {
        observer.observe(list);
    });
}

// Alternative function for browsers that don't support IntersectionObserver
function fallbackScrollAnimation() {
    const keypointLists = document.querySelectorAll('.keypoints');
    
    function checkScroll() {
        keypointLists.forEach(list => {
            const rect = list.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;
            
            if (isVisible && !list.classList.contains('animated')) {
                list.classList.add('animated');
                const listItems = list.querySelectorAll('ul li, ol li');
                listItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('fly-in');
                    }, index * 100);
                });
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on page load
}

// Use IntersectionObserver if supported, otherwise fall back to scroll event
if ('IntersectionObserver' in window) {
    // Modern browsers - use IntersectionObserver
    // Already initialized above
} else {
    // Older browsers - use scroll event
    fallbackScrollAnimation();
}