$(function(){
    var serviceSwiper = new Swiper('#serviceSlider', {
        onSlideChangeStart: function(instance) {
            $('.service-control').removeClass('active');
            $('.service-control').eq(instance.activeIndex).addClass('active');
        },
        autoHeight: true
    }),
        coverSwiper = new Swiper('#ganti', {
            loop: true,
            autoplay: 10000,
            pagination: '.cover .swiper-pagination',
            paginationClickable: true
        }),

        maquinariaSwiper = new Swiper('#maquinariaSwiper', {
            loop: true,
            autoplay: 5000,
            pagination: '#maquinariaSwiper .swiper-pagination',
            paginationClickable: true,
            nested: true
        });

        minaSwiper = new Swiper('#minaSwiper', {
            loop: true,
            autoplay: 5000,
            pagination: '#minaSwiper .swiper-pagination',
            paginationClickable: true,
            nested: true
        });

        proyectosSwiper = new Swiper('#proyectosSwiper', {
            loop: true,
            autoplay: 5000,
            pagination: '#proyectosSwiper .swiper-pagination',
            paginationClickable: true,
            nested: true
        });


    $('#header').affix({
    offset: {
        top: $('.cover').outerHeight(true),
        bottom: $('.footer').outerHeight(true)
      }
    });
    
    $(document).on('affix.bs.affix', function() {
        if($(window).width() > 767) $('.cover').css('margin-bottom', '100px');
        else $('.cover').css('margin-bottom', '50px');
    });
    
    $(document).on('affix-top.bs.affix', function(){
        $('.cover').css('margin-bottom', '0');
    });

    $('#projectsOpen').click(function(){
        $('.service-extra').addClass('show');
        $('body').append('<div class="black-overlay"></div>');
        $('.black-overlay').one('click', function () {
            $('.service-extra').removeClass('show');
            $('.black-overlay').remove();
        });        
    });
    
    $(window).resize(function(){
       var tgtWidth = $('#nosotros > div.container').css('margin-left'),
           minHeight = $('#nosotros > div.container').height();
        $('.outlier').css({
            maxWidth: tgtWidth,
            minHeight: minHeight
        });
    });
    
    window.sr = ScrollReveal();
    sr.reveal('.service-control');
    sr.reveal('.we-icon + p');
    sr.reveal('.we-icon');
    sr.reveal('.section h2');
    sr.reveal('.section h2 + p');
    sr.reveal('input');
    sr.reveal('.icon');
    sr.reveal('textarea');
    
    
    $('.service-control').click(function() {
       var $clicked = $(this),
           slide = $clicked.data('slide');
        $('.service-control').removeClass('active');
        $clicked.addClass('active')        
        serviceSwiper.slideTo(slide); 
    });
    
    $('#machine').click(function() {
       serviceSwiper.slideTo(0); 
    });
    
     $('#mine').click(function(){
       serviceSwiper.slideTo(1); 
    });
    
     $('#project').click(function(){
       serviceSwiper.slideTo(2); 
    });
    
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 50
            }, 1000);
        }
    });
        
    $(window).resize();
    
    setUpForm();
});

function setUpForm() {
    // Get the form.
    var form = $('#contactForm');
    // Get the messages div.
    var formMessages = $('#formOutput');

    // Set up an event listener for the contact form.
    $(form).submit(function(e) {
        // Stop the browser from submitting the form.
        e.preventDefault();
        $("#contactForm button").text("Enviando...");

        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
            .done(function(response) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass('alert alert-danger');
                $(formMessages).addClass('alert alert-success');

                // Set the message text.
                $(formMessages).text(response);

                setTimeout(function() {
                    $(formMessages).fadeOut();
                }, 5000);

                // Clear the form.
                $('#name').val('');
                $('#empresa').val('');
                $('#email').val('');
                $('#info').val('');
                $("#contactForm button").text("Enviar");
            })
            .fail(function(data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('alert alert-success');
                $(formMessages).addClass('alert alert-danger');

                // Set the message text.
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                    $("#contactForm button").text("Enviar");
                } else {
                    $(formMessages).text('Oops! Ocurrió un error: no se pudo enviar la forma.');
                    $("#contactForm button").text("Enviar");
                }
            });

    });

}

function initMap() {
    var mapCanvas = document.getElementById('googlemap');
    var mapOptions = {
        center: new google.maps.LatLng(28.6269499, -106.0989802),
        zoom: 15,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    var map = new google.maps.Map(mapCanvas, mapOptions);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(28.6269499, -106.0989802),
        map: map,
        title: 'GANTI'
    });

    google.maps.event.addListener(marker, 'click', function() {
        if ((navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1) || (navigator.platform.indexOf("iPad") != -1))
            window.open("maps://maps.google.com/?saddr=Current+Location&daddr=Boulevard+Antonio+Ortiz+Mena+3411,+Chihuahua,+Chih.,+Mexico");
        else
            window.open("http://maps.google.com/?saddr=Current+Location&daddr=Boulevard+Antonio+Ortiz+Mena+3411,+Chihuahua,+Chih.,+Mexico");
    });
}