;(function ($, window, document) {

  function writeDOM(){
    this.container.append(
      $('<p class="title"> Console </p>'
      + '<p> Placement: ON </p>'
      + '<p> Undo Last Placement </p>'
      + '<p> Reset Rectangles</p>'
      + '<p> Reset Everything</p>'
      + '<br />'
      + '<p> Area Usage: 0 </p>'));
  };

  function Control(id, square){
    this.self = this;
    this.name = id;
    this.square = square;
    this.container = $('#'+id).addClass('control');
    this.writeDOM();
  };

  Control.prototype = {
		constructor: Control,
    writeDOM: writeDOM
	};

  window.Control = Control;
} (jQuery, window, document));

;(function(){
  $(document).ready(function() {
    new Control('my_control', new Square('my_square'));
  });
}());
