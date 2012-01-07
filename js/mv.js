(function() {
  var GameObject, MedievalVillage;
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
  MedievalVillage = (function() {
    var FPS, HEIGHT, WIDTH, canvas, create_canvas, draw, g, game_loop, images, load_images, reality, update, _ref;
    function MedievalVillage() {}
    _ref = [640, 480, 30], WIDTH = _ref[0], HEIGHT = _ref[1], FPS = _ref[2];
    canvas = null;
    g = null;
    images = {};
    reality = new GameObject();
    create_canvas = function() {
      canvas = $(['<canvas width="', WIDTH, '" height="', HEIGHT, '"></canvas>'].join(''));
      g = canvas.get(0).getContext('2d');
      return $('body').append(canvas);
    };
    load_images = function(list, callback) {
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
    update = function() {
      return reality.update();
    };
    draw = function() {
      g.clearRect(0, 0, WIDTH, HEIGHT);
      return reality.draw(g);
    };
    game_loop = function() {
      update();
      return draw();
    };
    MedievalVillage.start = function() {
      create_canvas();
      return load_images(['reality.jpg'], function() {
        reality.image = images['reality.jpg'];
        reality.update = function() {
          var _ref2, _ref3;
          if ((_ref2 = this.dx) == null) {
            this.dx = 10;
          }
          if ((_ref3 = this.dy) == null) {
            this.dy = 10;
          }
          this.x += this.dx;
          this.y += this.dy;
          if (this.x + this.image.width > WIDTH || this.x < 0) {
            this.dx *= -1;
          }
          if (this.y + this.image.height > HEIGHT || this.y < 0) {
            return this.dy *= -1;
          }
        };
        return setInterval(game_loop, 1000 / FPS);
      });
    };
    return MedievalVillage;
  })();
  $(MedievalVillage.start);
}).call(this);
