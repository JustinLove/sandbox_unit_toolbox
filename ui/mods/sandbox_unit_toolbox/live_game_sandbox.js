(function() {
  "use strict";

  handlers.sandbox_height = function(height) {
    height = height - 64 // box header
    $.each(document.styleSheets, function(i, ss) {
      if (ss.rules
       && ss.rules.length == 2
       && ss.rules[0].selectorText.match('sandbox_unit_toolbox_handle')) {
        ss.rules[0].style.maxHeight = height.toString()+'px'
      }
    })
  }

  api.Panel.message(api.Panel.parentId, 'request_sandbox_height');
})()
