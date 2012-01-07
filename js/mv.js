(function() {
  var Game, GameObject, Images, Reality;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Images = (function() {
    var images, list;
    function Images() {}
    images = {};
    list = ['reality.jpg'];
    Images.load = function(callback) {
      var remaining, src, _i, _len, _results;
      remaining = list.length;
      _results = [];
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        src = list[_i];
        images[src] = new Image();
        images[src].onload = function() {
          if (--remaining === 0) {
            return callback();
          }
        };
        _results.push(images[src].src = "images/" + src);
      }
      return _results;
    };
    Images.get = function(name) {
      return images[name];
    };
    return Images;
  })();
  GameObject = (function() {
    function GameObject() {
      var _ref;
      _ref = [0, 0], this.x = _ref[0], this.y = _ref[1];
      this.image = null;
    }
    GameObject.prototype.update = function() {};
    GameObject.prototype.draw = function(g) {
      if (!this.image) {
        return;
      }
      return g.drawImage(this.image, this.x, this.y);
    };
    return GameObject;
  })();
  Game = (function() {
    var attributes, canvas, draw, g, game_loop, images, objects, update;
    function Game() {}
    attributes = {
      width: 640,
      height: 480,
      fps: 30
    };
    canvas = null;
    g = null;
    images = {};
    objects = [];
    update = function() {
      var o, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = objects.length; _i < _len; _i++) {
        o = objects[_i];
        _results.push(o.update());
      }
      return _results;
    };
    draw = function() {
      var o, _i, _len, _results;
      g.clearRect(0, 0, attributes.width, attributes.height);
      _results = [];
      for (_i = 0, _len = objects.length; _i < _len; _i++) {
        o = objects[_i];
        _results.push(o.draw(g));
      }
      return _results;
    };
    game_loop = function() {
      update();
      return draw();
    };
    Game.start = function() {
      canvas = $(['<canvas width="', attributes.width, '" height="', attributes.height, '"></canvas>'].join(''));
      g = canvas.get(0).getContext('2d');
      $('body').append(canvas);
      return Images.load(function() {
        var o, _i, _len;
        for (_i = 0, _len = objects.length; _i < _len; _i++) {
          o = objects[_i];
          if (typeof o.image === 'string') {
            o.image = Images.get(o.image);
          }
        }
        return setInterval(game_loop, 1000 / attributes.fps);
      });
    };
    Game.add = function(object) {
      return objects.push(object);
    };
    Game.attr = function(name) {
      return attributes[name];
    };
    return Game;
  })();
  Reality = (function() {
    __extends(Reality, GameObject);
    function Reality() {
      var _ref;
      Reality.__super__.constructor.call(this);
      _ref = [10, 10], this.dx = _ref[0], this.dy = _ref[1];
      this.image = 'reality.jpg';
    }
    Reality.prototype.update = function() {
      this.x += this.dx;
      this.y += this.dy;
      if (this.x + this.image.width > Game.attr('width') || this.x < 0) {
        this.dx *= -1;
      }
      if (this.y + this.image.height > Game.attr('height') || this.y < 0) {
        return this.dy *= -1;
      }
    };
    return Reality;
  })();
  Game.add(new Reality());
  $(Game.start);
}).call(this);
