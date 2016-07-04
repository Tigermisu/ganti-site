$(function(){
    $('#header').affix({
    offset: {
        top: $('.cover').outerHeight(true),
        bottom: $('.footer').outerHeight(true)
      }
    });
    
    $(document).on('affix.bs.affix', function(){
        $('.cover').css('margin-bottom', '100px');
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
    
    $(window).resize();
});