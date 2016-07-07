$(function(){
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
    
    var swiper = new Swiper ('.swiper-container', {
    });
    
    $('.service-control').click(function() {
       var $clicked = $(this),
           slide = $clicked.data('slide');
        $('.service-control').removeClass('active');
        $clicked.addClass('active')        
        swiper.slideTo(slide); 
    });
    
    $('#machine').click(function() {
       swiper.slideTo(0); 
    });
    
     $('#mine').click(function(){
       swiper.slideTo(1); 
    });
    
     $('#project').click(function(){
       swiper.slideTo(2); 
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
});

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