// jquery.scrollPatrol.js
// copyright Brian Sewell
// https://github.com/bwsewell/scrollPatrol
//
// v1.0.0
// Aug 14, 2012 12:30

(function( $ ){
	$.fn.scrollPatrol = function(options) {

    var clicked = false;  // Whether or not the user has clicked on a link
    var nav = this;       // <ul> object containing scrollPatrol links

    var defaults = {
      offset: 10
    };

    var opts = $.extend(defaults, options);

    // Count the number of columns in the table
    var items = nav.find('li');

    $(items).each(function() {
      var item = $(this);
      var item_sibling = $(this).next();

      var href = item.children('a').attr('href');
      if (item_sibling.length) {
        var sibling_href = item_sibling.children('a').attr('href');
      }

      var offset = $(href).offset().top - opts.offset;
      if (item_sibling.length) {
        var sibling_offset = $(sibling_href).offset().top - opts.offset;
      }

      // Changes class of <li> element during scrolling
      $(document).scroll(function() {

        // Ignore this behavior if the user has clicked on an actual link
        if (!clicked) {

          if (item_sibling.length) {
            if ($(document).scrollTop() >= offset && $(document).scrollTop() < sibling_offset + 10) {
              $(items).removeClass('active');
              item.addClass('active');
            }
          }
          else {
            if ($(document).scrollTop() >= offset + 10) {
              $(items).removeClass('active');
              item.addClass('active');
            }
          }

        }

      });

      // Scrolls to section when user clicks on <li> element
      $(this).click(function(e) {
        clicked = true;
        $(items).removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
        $('html, body').animate( { scrollTop:offset }, 1000, function() { clicked = false; } );
      });
    });

  };

})( jQuery );