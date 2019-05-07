;(function ($, window, document) {

  var addHandler = function(e, square){
    var bounds = this.getBoundingClientRect();
    square.points.push(
      new Point('_' + (square.points.length + 1), square.name, e.pageX - bounds.left, bounds.bottom - e.pageY)
    );
  };

  function rectReset(){
    this.origin.reset();
    for (let point of points) {
      point.reset();
    };
  }

  function popLast(){
    var point = this.points.pop();
    if(point === void 0){
      point.removePointFromDOM();
      return true;
    } else{
      return false;
    }
  }

  function hardReset(){
    while(this.popLast()){};
    this.rectReset();
  }

  function togglePlacment(){
    var self = this;
    if(this.placment){
      this.container.off('mousedown');
    } else{
      this.container.on('mousedown', function (e){
        e.stopPropagation();
        e.preventDefault();
        addHandler.call(this, e, self);
      });
    }
    this.placment = !this.placment;
  }

  function Square(id){
    this.self = this;
    this.name = id;
    this.origin = new Point('_0', id, 0, 0);
    this.points = [];
    this.container = $('#'+id).addClass('square');
    this.placment = false;
    this.togglePlacment();
  };

  Square.prototype = {
		constructor: Square,
    rectReset: rectReset,
    popLast: popLast,
    hardReset: hardReset,
    togglePlacment: togglePlacment
	};

  window.Square = Square;
} (jQuery, window, document));