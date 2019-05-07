;(function ($, window, document) {
  var BUTTON_SIZE = 6;
  var SQUARE_LEN = 500 - BUTTON_SIZE;

  var startHandler = function(e, point){
    var active_pt = this;

    $(this).addClass('active');

    var bounds = active_pt.getBoundingClientRect();

    point.active_x = e.pageX - bounds.left + 1;
    point.active_y = e.pageY - bounds.bottom - 1;

    $(document).on("mousemove", function (e){
      e.preventDefault();
      moveHandler.call(active_pt, e, point);
    });
    $(document).one("mouseup", function (e){
      endHandler.call(active_pt, e, point);
    });
  },
  moveHandler = function(e, point){
    var bounds = point.parent.get(0).getBoundingClientRect();

    var x = e.pageX - bounds.left - point.active_x,
    y = bounds.bottom - e.pageY + point.active_y;


    if(x - point.origin_x < 0){
      this.style.left = point.origin_x + 'px';
      point.area.style.width = 0;
    } else
    if(x <= SQUARE_LEN){
      this.style.left = x + 'px';
      point.area.style.width = (x - point.origin_x) + 'px';
    } else{
      this.style.left = SQUARE_LEN + 'px';
      point.area.style.width = (SQUARE_LEN - point.origin_x) + 'px';
    }

    if(y - point.origin_y < 0){
      this.style.bottom = point.origin_y + 'px';
      point.area.style.height = 0;
    } else
    if(y <= SQUARE_LEN){
      this.style.bottom = y + 'px';
      point.area.style.height = (y - point.origin_y) + 'px';
    } else{
      this.style.bottom = SQUARE_LEN + 'px';
      point.area.style.height = (SQUARE_LEN - point.origin_y) + 'px';
    }
  },

  endHandler = function(e, point){
    $(this).removeClass('active');
    $(document).off("mousemove");
    point.active_x = null;
    point.active_y = null;
  };

  function addPointToDOM(x, y){
    var self = this;

    var tip = $('<div id="' + this.name + '_tip" class="point"> </div>').css({
      'left' : x - BUTTON_SIZE + 'px',
      'bottom' : y - BUTTON_SIZE + 'px'
    });

    var area = $('<div id="' + this.name + '_rect" class="rect"> </div>').css({
      'height' : 0 + 'px',
      'width' : 0 + 'px',
      'left' : x - 1 + 'px',
      'bottom' : y - 1 + 'px'
    });

    tip.on("mousedown", function (e){
      e.preventDefault();
      e.stopPropagation();
      startHandler.call(this, e, self);
    });

    area.on("mousedown", function (e){
      //This exists so that clicking a shaded rectangle dosen't trigger point placment
      e.preventDefault();
      e.stopPropagation();
    });

    this.parent.append(tip);
    this.parent.append(area);

    this.tip = $('#' + this.name + '_tip').get(0);
    this.area = $('#' + this.name + '_rect').get(0);
  }

  function removePointFromDOM(){
    this.parent.remove(this.tip);
    this.parent.remove(this.area);
    this.tip = this.area = this.origin_x = this.origin_y = this.name = null;
  }

  function reset(){
    this.area.style.width = 0;
    this.area.style.height = 0;
    this.tip.style.left = this.origin_x;
    this.tip.style.bottom = this.origin_y;
  }

  function Point(name, parent_id, x, y){
    this.parent = $('#' + parent_id);
    this.name = name;

    this.tip = null;
    this.area = null;

    this.origin_x = x - BUTTON_SIZE;
    this.origin_y = y - BUTTON_SIZE;

    //These is where an active element was originally clicked
    this.active_x = null;
    this.active_y = null;
    this.addPointToDOM(x, y);
  }

  Point.prototype = {
		constructor: Point,
    addPointToDOM: addPointToDOM,
    removePointFromDOM: removePointFromDOM,
    reset: reset
	};

  window.Point = Point;
} (jQuery, window, document));
