$(document).ready(function() {
    // Set initial state for all project gallery images
    $('.project-gallery-pic').css({
        'opacity': '0',
        'transform': 'translateY(30px)'
    });

    // Function to check if element is in viewport
    function isElementInViewport(element) {
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        
        // Trigger animation when element is 20% visible from bottom
        var triggerPoint = viewportBottom - ($(window).height() * 0.2);
        
        return elementTop <= triggerPoint;
    }

    // Function to animate images with fade-in effect
    function animateImages() {
        $('.project-gallery-pic').each(function() {
            var $image = $(this);
            
            // Check if image hasn't been animated yet and is in viewport
            if (!$image.hasClass('animated') && isElementInViewport($image)) {
                $image.addClass('animated');
                
                // Use jQuery animate() for smooth fade-in with upward movement
                $image.animate({
                    'opacity': '1'
                }, {
                    duration: 800,
                    easing: 'swing',
                    step: function(now, fx) {
                        if (fx.prop === 'opacity') {
                            // Calculate transform value based on opacity progress
                            var translateY = 30 * (1 - now);
                            $(this).css('transform', 'translateY(' + translateY + 'px)');
                        }
                    },
                    complete: function() {
                        // Ensure final transform state
                        $(this).css('transform', 'translateY(0px)');
                    }
                });
            }
        });
    }

    // Check for animations on scroll
    $(window).on('scroll', function() {
        animateImages();
    });

    // Check for animations on page load (in case images are already in viewport)
    animateImages();

    // Optional: Add a slight delay for images that load after DOM ready
    setTimeout(function() {
        animateImages();
    }, 100);
});