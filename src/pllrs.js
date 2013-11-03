/**
 *  pllrs util for unsupportive browsers.
 *  author: ericlindstrom
 */

(function(factory) {
  // use require.js if available
  if (typeof define === 'function' && define.amd) {
    define('jquery', factory);
  } else {
    factory($);
  }

}(function($) {

  $(function() {
    $('[class*="pllrs"]').each(function(k,v) {

      // put all classes into an array
      var self = this,
          classes = $(v).attr('class').split(/\s+/),
          breakpoints = {
            'break3': null,
            'break2': null,
            'break1': null,
            'default': 1
          };

      $.grep(classes, function(n,i) {

        // find pllrs class in array and grab #
        if (n.substring(0,5) === 'pllrs') {
          breakpoints['break3'] = parseInt(n.replace(/pllrs/, ''));
          breakpoints['break2'] = breakpoint['break3'];
          breakpoints['break1'] = breakpoint['break3'];
        }

        // find pllrs secondary class in array and set #s
        if (n.substring(0,1) === '_') {
          breakpoints['break2'] = parseInt(n.substring(1,2));
          breakpoints['break1'] = parseInt(n.substring(2,3));
          breakpoints['default'] = parseInt(n.substring(3,4));
        }

      }); // grep

      // for each breakpoint
      for (point in breakpoints) {

        //find each child column
        $(self).find('> .column').each(function(k,v) {

          // add the break_{{breakpoint}}_startrow class
          if (k % breakpoints[point] == 0) {
            $(v).addClass(['break', point, 'startrow'].join('_'));
          }

          // add the break_{{breakpoint}}_endrow class
          if ((k+1) % breakpoints[point] == 0) {
            $(v).addClass(['break', point, 'endrow'].join('_'));
          }

        });
      } // for

    }); // end each

  }); // end ready

  }); // end wrapper

})); // end factory
