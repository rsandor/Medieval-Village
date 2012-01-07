#
# Medieval Village
# A game by Thomas O'Neil and Ryan Richards
#

class Images
	images = {}
	list = ['reality.jpg']
	
	@load = (callback) ->
		remaining = list.length
		for src in list 
			images[src] = new Image()
			images[src].onload = -> callback() if --remaining == 0
			images[src].src = "images/#{src}"
	
	@get = (name) ->
		images[name]
	

class GameObject
	constructor: ->
		[@x, @y] = [0, 0]
		@image = null
	
	update: -> return
	
	draw: (g) ->
		return unless @image
		g.drawImage @image, @x, @y


class Game
	attributes =
		width: 640
		height: 480
		fps: 30
	
	canvas = null
	g = null
	images = {}
	
	objects = []
	
	update = ->
		o.update() for o in objects
	
	draw = ->
		g.clearRect 0, 0, attributes.width, attributes.height
		o.draw(g) for o in objects
	
	game_loop = -> update(); draw()
	
	@start: ->
		canvas = $ ['<canvas width="', attributes.width, '" height="', attributes.height, '"></canvas>'].join ''
		g = canvas.get(0).getContext '2d'
		$('body').append canvas
		Images.load ->
			
			for o in objects
				o.image = Images.get(o.image) if typeof o.image == 'string'
			setInterval game_loop, 1000 / attributes.fps
		
	@add: (object) -> objects.push object
	@attr: (name) -> attributes[name]

		
class Reality extends GameObject
	constructor: ->
		super()
		[@dx, @dy] = [10, 10]
		@image = 'reality.jpg'
		
	update: ->
		@x += @dx
		@y += @dy
		@dx *= -1 if @x + @image.width > Game.attr('width') or @x < 0
		@dy *= -1 if @y + @image.height > Game.attr('height') or @y < 0
	


Game.add new Reality()


# Start the game!
$ Game.start
