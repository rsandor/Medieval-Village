#
# Medieval Village
# A game by Thomas O'Neil and Ryan Richards
#


#
# Main Game
#
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


#
# Image preloader
#
class Images
	images = {}
	list = [
		'reality.jpg',
		'grid.png',
		'castle.png',
		'trees.png',
		'monolith.png'
	]
	
	@load = (callback) ->
		remaining = list.length
		for src in list 
			images[src] = new Image()
			images[src].onload = -> callback() if --remaining == 0
			images[src].src = "images/#{src}"
	
	@get = (name) ->
		images[name]

#	
# Basic game object class
#
class GameObject
	constructor: (@x=0, @y=0, @image=null, @ox=0, @oy=0) -> return
	update: -> return
	draw: (g) -> g.drawImage(@image, @x + @ox, @y + @oy) if @image?
		

class Grid extends GameObject
	constructor: ->
		super 80, 80, 'grid.png'
		
	draw: (g) ->
		for x in [0...20]
			for y in [0...30]
				g.drawImage @image, x * @image.width, y * @image.height



class Castle extends GameObject
	constructor: ->
		super 64, 96, 'castle.png', 0, 8


class Monolith extends GameObject
	constructor: -> super 128, 256, 'monolith.png', 0, 6

class Trees extends GameObject
	constructor: ->
		super 0, 0, 'trees.png'
		@roots = []
		for i in [0...100]
			@roots.push
				x: (Math.random() * Game.attr('width')) | 0
				y: (Math.random() * Game.attr('height')) | 0 
			
	draw: (g) ->
		for loc in @roots
			g.drawImage @image, loc.x, loc.y
		
			
			


Game.add new Grid()
Game.add new Castle()
Game.add new Monolith()
Game.add new Trees()

# Start the game!
$ Game.start
