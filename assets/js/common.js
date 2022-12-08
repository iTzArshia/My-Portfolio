$(document).ready(function () {

    /*-----------------------------------------------------------------
      - Detect device mobile
    -------------------------------------------------------------------*/

    var isMobile = false;
    if (/Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('html').addClass('touch');
        isMobile = true;
    } else {
        $('html').addClass('no-touch');
        isMobile = false;
    }

    $('.js-btn-toggle').on('click', function (e) {
        $('.js-show').toggle('slow');
        e.preventDefault();
    });
   
    /*-----------------------------------------------------------------
      - Skills Swipper
    -------------------------------------------------------------------*/

    $('.js-carousel-skills').each(function () {
        var clientCarousel = new Swiper('.js-carousel-skills', {
            loop: true,
            slidesPerView: 5,
            grabCursor: true,
            autoplay: {
                delay: 1000,
            },
        });
    });

    /*-----------------------------------------------------------------
      - Projects Swipper
    -------------------------------------------------------------------*/

    $('.js-carousel-clients').each(function () {
        var clientCarousel = new Swiper('.js-carousel-clients', {
            loop: true,
            slidesPerView: 5,
            grabCursor: true,
            autoplay: {
                delay: 1000,
            },
        });
    });

    /*-----------------------------------------------------------------
      - Sticky sidebar
    -------------------------------------------------------------------*/

    function activeStickyKit() {
        $('.sticky-column').stick_in_parent({
            parent: '.sticky-parent'
        });

        // bootstrap col position
        $('.sticky-column')
            .on('sticky_kit:bottom', function (e) {
                $(this).parent().css('position', 'static');
            })
            .on('sticky_kit:unbottom', function (e) {
                $(this).parent().css('position', 'relative');
            });
    };
    activeStickyKit();

    function detachStickyKit() {
        $('.sticky-column').trigger("sticky_kit:detach");
    };

    var screen = 1200;

    var windowHeight, windowWidth;
    windowWidth = $(window).width();
    if ((windowWidth < screen)) {
        detachStickyKit();
    } else {
        activeStickyKit();
    }

    // windowSize
    // window resize

    function windowSize() {
        windowHeight = window.innerHeight ? window.innerHeight : $(window).height();
        windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
    }
    windowSize();

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this,
                args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    $(window).resize(debounce(function () {
        windowSize();
        $(document.body).trigger("sticky_kit:recalc");
        if (windowWidth < screen) {
            detachStickyKit();
        } else {
            activeStickyKit();
        }
    }, 250));

    /*-----------------------------------------------------------------
      - Autoresize textarea
    -------------------------------------------------------------------*/

    $('textarea').each(function () {
        autosize(this);
    });

    /*-----------------------------------------------------------------
      - mediumZoom
    -------------------------------------------------------------------*/

    mediumZoom('[data-zoom]', {
        margin: 30
    });

    /*-----------------------------------------------------------------
      - Lazyload
    -------------------------------------------------------------------*/

    lazySizes.init();

    /*-----------------------------------------------------------------
      - Particles
    -------------------------------------------------------------------*/

    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle", stroke: { width: 0, color: "#000000" }, polygon: { nb_sides: 5 }, image: { src: "img/github.svg", width: 100, height: 100 } },
            opacity: { value: 0.5, random: false, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
            size: { value: 3, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 0.5 },
            move: { enable: true, speed: 3.3, direction: "none", random: false, straight: false, out_mode: "out", bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } },
        },
        interactivity: {
            detect_on: "window",
            events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: false, mode: "push" }, resize: true },
            modes: {
                grab: { distance: 400, line_linked: { opacity: 1 } },
                bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                repulse: { distance: 200, duration: 0.4 },
                push: { particles_nb: 4 },
                remove: { particles_nb: 2 },
            },
        },
        retina_detect: true,
    });

    var count_particles, stats, update;
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
    count_particles = document.querySelector(".js-count-particles");
    update = function () {
        stats.begin();
        stats.end();
        if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
            count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
        }
        requestAnimationFrame(update);
    };

    requestAnimationFrame(update);

});