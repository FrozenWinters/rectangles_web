;(function ($, window, document) {
  var startHandler = function(e, point){
    var active_pt = this;

    $(this).addClass('active');

    var rect = active_pt.getBoundingClientRect();

    point.active_x = e.pageX - rect.left + 1; // 3 is the margin size
    point.active_y = e.pageY - rect.bottom - 1;

    $(document).on("mousemove", function (e){
      moveHandler.call(active_pt, e, point);
    });
    $(document).one("mouseup", function (e){
      endHandler.call(active_pt, e, point);
    });
  },
  moveHandler = function(e, point){
    var square = point.parent.get(0).getBoundingClientRect();

    var x = e.pageX - square.left - point.active_x,
    y = square.bottom - e.pageY + point.active_y;

    this.style.left = x + 'px';
    this.style.bottom = y + 'px';

    point.area.style.width = (x - point.origin_x) + 'px';
    point.area.style.height = (y - point.origin_y) + 'px';
  },

  endHandler = function(e, point){
    $(this).removeClass('active');
    $(document).off("mousemove");
    point.active_x = null;
    point.active_y = null;
  };

  function addPointToDOM(point, x, y){
    var tip = $('<div id="' + point.name + '" class="point"> </div>').css({
      'left' : x - 7 + 'px',
      'bottom' : y - 7 + 'px'
    });

    var area = $('<div id="rect_' + point.name + '" class="rect"> </div>').css({
      'height' : 0 + 'px',
      'width' : 0 + 'px',
      'left' : x - 1 + 'px',
      'bottom' : y - 1 + 'px'
    });

    tip.on("mousedown", function (e){
      e.stopPropagation();
      startHandler.call(this, e, point);
    });

    area.on("mousedown", function (e){
      e.stopPropagation();
    });

    point.parent.append(tip);
    point.parent.append(area);

    point.area = $('#rect_' + point.name).get(0);
  }

  function Point(name, parent_id, x, y){
    this.parent = $('#' + parent_id);
    this.name = name;

    this.area = null;

    this.origin_x = x - 7;
    this.origin_y = y - 7;

    //These is where an active element was originally clicked
    this.active_x = null;
    this.active_y = null;
    addPointToDOM(this, x, y);
  }

  Point.prototype = {
		constructor: Point
	};

  window.Point = Point;
} (jQuery, window, document));

;(function(){
  var counter = 1;

  var addHandler = function(e){
    var square = this.getBoundingClientRect();
    new Point('pt' + counter, this.id, e.pageX - square.left, square.bottom - e.pageY);
    counter++;
  }

  $(document).ready(function() {
    new Point('pt0', 'square', 0, 0);
    $('#square').on('mousedown', function (e){
      e.stopPropagation();
      addHandler.call(this, e);
    });
  });
}());
