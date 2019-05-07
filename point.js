/*
 * Let's take a momment to repeat our daily mantra:
 * HOLLY FORKING SHIRT BALLS
 * MANDATORY USE OF THE THIS KEYWORD IN JAVASCRIPT
 * IS FORKING IDIOTIC
*/

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

    point.width = (x - point.origin_x < 0) ? 0 : ((x <= SQUARE_LEN) ? x - point.origin_x : SQUARE_LEN - point.origin_x);
    point.height = (y - point.origin_y < 0) ? 0 : ((y <= SQUARE_LEN) ? y - point.origin_y : SQUARE_LEN - point.origin_y);

    point.udpateSides();
  },
  endHandler = function(e, point){
    $(this).removeClass('active');
    $(document).off("mousemove");
    point.active_x = null;
    point.active_y = null;
  };

  function addPointToDOM(x, y){
    let self = this;

    var tip = $('<div id="' + this.name + '_tip" class="point"> </div>').css({
      'left' : x - BUTTON_SIZE + 'px',
      'bottom' : y - BUTTON_SIZE + 'px'
    });

    var body = $('<div id="' + this.name + '_rect" class="rect"> </div>').css({
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

    body.on("mousedown", function (e){
      //This exists so that clicking a shaded rectangle dosen't trigger point placment
      e.preventDefault();
      e.stopPropagation();
    });

    this.parent.append(tip);
    this.parent.append(body);

    this.tip = $('#' + this.name + '_tip').get(0);
    this.body = $('#' + this.name + '_rect').get(0);
  }

  function removePointFromDOM(){
    $(this.tip).remove();
    $(this.body).remove();
    this.tip = this.body = this.origin_x = this.origin_y = this.name = null;
  }

  function udpateSides(){
    this.body.style.width = this.width + 'px';
    this.body.style.height = this.height + 'px';
    this.tip.style.left = (this.origin_x + this.width) + 'px';
    this.tip.style.bottom = (this.origin_y + this.height) + 'px';
    this.area = this.height * this.width / (500 * 500);
  }

  function reset(){
    this.width = this.height = 0;
    this.udpateSides();
  }

  function Point(name, parent_id, x, y){
    this.parent = $('#' + parent_id);
    this.name = name;

    this.area = 0.0;

    this.tip = null;
    this.body = null;

    this.origin_x = x - BUTTON_SIZE;
    this.origin_y = y - BUTTON_SIZE;

    this.width = 0;
    this.height = 0;

    //These is where an active element was originally clicked
    this.active_x = null;
    this.active_y = null;
    this.addPointToDOM(x, y);
  }

  Point.prototype = {
		constructor: Point,
    addPointToDOM: addPointToDOM,
    removePointFromDOM: removePointFromDOM,
    reset: reset,
    udpateSides: udpateSides
	};

  window.Point = Point;
} (jQuery, window, document));
