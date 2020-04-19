
/*************
**  VAR
**************/

  var message_short = false;
  var message_short_dim;
  
/*************
**  EVENTS
**************/

    window.alert = function (message, type) { alertWrapper(message, type); };

/*************
**  FUNCTION
**************/

    function alertWrapper(mensaje, type) {

        /************
        **  MESSAGE
        *************/

            var image, ventanaCS;

            if (type == 'success' || type == 'reload')
                image = '<i id="imgAlert" class="fa fa-check-circle" aria-hidden="true"></i>';
            else if (type == 'mistake')
                image = '<i id="imgAlert" class="fa fa-thumbs-down" aria-hidden="true"></i>';
            else
                image = '<i id="imgAlert" class="fa fa-exclamation-triangle" aria-hidden="true"></i>';

            ventanaCS = '<div class="alertWrapper">' +
    						'<div class="alertVentana">' + 
                                 image + 
                                '<p>' + mensaje + '</p>' +
                                '<div class="alertAceptar">Aceptar</div>' + 
    						'</div>' + 
    					'</div>';

            $('html').append(ventanaCS);

        /***************
        **  CSS ACTION
        ****************/

            var alertTime = 300,
                al_img = $('#imgAlert').height(),
                alVentana = $('.alertVentana').height(),
                alNav = $(window).height(),
                supNav = $(window).scrollTop();
        

            // POSITION ALERT
            $('.alertVentana').css('top',((alNav-alVentana)/2+supNav-100)+'px');

            // SHOW
            $('.alertWrapper').css('display','block');
            $('.alertWrapper').animate({opacity:1},alertTime);
            $('body').animate({opacity:0.6},alertTime);

            if (type!="reload"){

              $('.alertAceptar').click(function(e) {

                  $('body').animate({opacity:1},alertTime);

                  $('.alertWrapper').animate({opacity:0},alertTime);
                  setTimeout("$('.alertWrapper').remove()",alertTime);
              });
           
           } else{

              $('.alertAceptar').click(function(e) {

                  $('body').animate({opacity:1},alertTime);

                  $('.alertWrapper').animate({opacity:0},alertTime);
                  setTimeout("$('.alertWrapper').remove()",alertTime);
                  location.reload();
              });
            } }

    function article_minheight(aditional) {

        /** Height **/
        var header = $("header").outerHeight(true),
            footer = $("footer").outerHeight(true);
    
        
        /** min-height */
        var tamanio = $(window).height() - header - footer - aditional;
        
        //alert(header + '.' + footer + '.' + $(window).height() + '.' + tamanio);

        if ($('article').height() < tamanio )
            $('article').css("min-height", tamanio); }

    function messageRespons() {


      if (881 >= $(window).width() && message_short!=true) {
        
        message_short_dim = $('#message h1').width();
        $('#message h1').animate({
          width: "100%",
          padding: ".3em 0 0"
        }, 1500 );
        message_short = true;
      
      } else if (881 < $(window).width() && message_short!=false) {

        $('#message h1').animate({
          width: message_short_dim,
          padding: ".3em .8em 0"
        }, 1500 );
        message_short = false;
      }
      }