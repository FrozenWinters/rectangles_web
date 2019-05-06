;(function ($, window, document) {
  var startHandler = function(e, point){
    e.preventDefault();

    var active_pt = this;

    $(this).addClass('active');

    var rect = active_pt.getBoundingClientRect();

    point.x = e.pageX - rect.left + 3; // 3 is the margin size
    point.y = e.pageY - rect.top + 3;

    $(document).on("mousemove", function (e){
      moveHandler.call(active_pt, e, point);
    });
    $(document).one("mouseup", function (e){
      endHandler.call(active_pt, e, point);
    });
  },
  moveHandler = function(e, point){
    e.preventDefault();

    var square = point.parent.get(0).getBoundingClientRect();

    var x = e.pageX - square.left - point.x,
    y = e.pageY - square.top - point.y;

    this.style.left = x + 'px';
    this.style.top = y + 'px';
  },

  endHandler = function(e, point){
    e.preventDefault();
    $(this).removeClass('active');
    $(document).off("mousemove");
    point.x = null;
    point.y = null;
  };

  function addPointToDOM(point){
    var elt = $('<div id="' + point.name + '" class="point"> </div>').css({
      'top' :'0px',
      'left' : '0px'
    });

    elt.on("mousedown", function (e){
      /*point.x += 20;
      point.y += 20;
      elt.css({
        'top' : point.x +'px',
        'left' : point.y + 'px'
      });*/
      startHandler.call(this, e, point);
    });

    point.parent.append(elt);
  }

  function Point(name, parent_id){
    this.parent = $(parent_id);
    this.name = name;

    //These is where an active element was originally clicked
    this.active_x = null;
    this.active_y = null;
    addPointToDOM(this);
  }

  Point.prototype = {
		constructor: Point
	};

  window.Point = Point;
} (jQuery, window, document));

;(function(){
  $(document).ready(function() {
    var test = new Point('pt', '#square');
  });
}());
