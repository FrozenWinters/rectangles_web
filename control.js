;(function ($, window, document) {

  function writeDOM(){
    let self = this;

    this.container.append(
      $('<p class="title"> Console </p>'
      + '<p id="toggle"> Placement: </p>'
      + '<p id="undo"></p>'
      + '<p id="reset_rect"></p>'
      + '<p id="reset_all"></p>'
      + '<br />'
      + '<p id="area_button"></p>'
      + '<p id="area_display">&#8709</p>')
    );

    this.area_field = $('#area_display');

    var toggle = $('<a class="button">ON</a>');
    toggle.on("click", function (e){
      if(self.square.placment){
        toggle.html("OFF");
      } else{
        toggle.html("ON");
      }
      self.square.togglePlacment();
    });

    $('#toggle').append(toggle);

    $('#undo').append(
      $('<a class="button"> Undo Last Placement </a>').on("click", function (e){
        self.square.popLast();
      })
    );

    $('#reset_rect').append(
      $('<a class="button"> Reset Rectangles </a>').on("click", function (e){
        self.square.rectReset();
      })
    );

    $('#reset_all').append(
      $('<a class="button"> Reset Everything </a>').on("click", function (e){
        self.square.hardReset();
      })
    );

    $('#area_button').append(
      $('<a class="button"> Compute Area </a>').on("click", function (e){
        self.area_field.html(self.square.computeArea().toFixed(6));
      })
    );
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
