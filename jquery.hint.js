/**
* Original author Remy Sharp
* @url http://remysharp.com/2007/01/25/jquery-tutorial-text-box-hints/
* Modified to work with newest jQuery and browsers by Alejandro Araya
*/

(function ($) {

$.fn.hint = function (blurClass) {
  if (!blurClass) {
    blurClass = 'blur';
  }

  return this.each(function () {
    var $input = $(this);

    // capture the rest of the variable to allow for reuse
    var $form = $(this.form);

    // Fallback to the 'placeholder' attribute if nothing is found
    var title = $input.attr('title');
    if (typeof title == "undefined")
      title = $input.attr('placeholder');

    function remove() {
      if ($input.val() === title && $input.hasClass(blurClass)) {
        $input.val('').removeClass(blurClass);
      }
    }

    // only apply logic if the element has the attribute
    if (title) {
      // on blur, set value to title attr if text is blank
      $input.blur(function () {
        if (this.value === '') {
          $input.val(title).addClass(blurClass);
        }
      }).on('focus',remove).blur(); // now change all inputs to title

      // clear the pre-defined text when form is submitted
      $form.submit(remove);
      // Removing this because it interfered with IE9/10
      //$(window).unload(remove); // handles Firefox's autocomplete
    }
  });
};

})(jQuery);

