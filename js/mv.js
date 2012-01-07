(function() {
  var Castle, Game, GameObject, Grid, Images, Monolith, Trees;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
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
  Images = (function() {
    var images, list;
    function Images() {}
    images = {};
    list = ['reality.jpg', 'grid.png', 'castle.png', 'trees.png', 'monolith.png'];
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
    function GameObject(x, y, image, ox, oy) {
      this.x = x != null ? x : 0;
      this.y = y != null ? y : 0;
      this.image = image != null ? image : null;
      this.ox = ox != null ? ox : 0;
      this.oy = oy != null ? oy : 0;
      return;
    }
    GameObject.prototype.update = function() {};
    GameObject.prototype.draw = function(g) {
      if (this.image != null) {
        return g.drawImage(this.image, this.x + this.ox, this.y + this.oy);
      }
    };
    return GameObject;
  })();
  Grid = (function() {
    __extends(Grid, GameObject);
    function Grid() {
      Grid.__super__.constructor.call(this, 80, 80, 'grid.png');
    }
    Grid.prototype.draw = function(g) {
      var x, y, _results;
      _results = [];
      for (x = 0; x < 20; x++) {
        _results.push((function() {
          var _results2;
          _results2 = [];
          for (y = 0; y < 30; y++) {
            _results2.push(g.drawImage(this.image, x * this.image.width, y * this.image.height));
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };
    return Grid;
  })();
  Castle = (function() {
    __extends(Castle, GameObject);
    function Castle() {
      Castle.__super__.constructor.call(this, 64, 96, 'castle.png', 0, 8);
    }
    return Castle;
  })();
  Monolith = (function() {
    __extends(Monolith, GameObject);
    function Monolith() {
      Monolith.__super__.constructor.call(this, 128, 256, 'monolith.png', 0, 6);
    }
    return Monolith;
  })();
  Trees = (function() {
    __extends(Trees, GameObject);
    function Trees() {
      var i;
      Trees.__super__.constructor.call(this, 0, 0, 'trees.png');
      this.roots = [];
      for (i = 0; i < 100; i++) {
        this.roots.push({
          x: (Math.random() * Game.attr('width')) | 0,
          y: (Math.random() * Game.attr('height')) | 0
        });
      }
    }
    Trees.prototype.draw = function(g) {
      var loc, _i, _len, _ref, _results;
      _ref = this.roots;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        loc = _ref[_i];
        _results.push(g.drawImage(this.image, loc.x, loc.y));
      }
      return _results;
    };
    return Trees;
  })();
  Game.add(new Grid());
  Game.add(new Castle());
  Game.add(new Monolith());
  Game.add(new Trees());
  $(Game.start);
}).call(this);
