#
# Medieval Village
# A game by Thomas O'Neil and Ryan Richards
#


class GameObject
	constructor: ->
		[@x, @y] = [0, 0]
		@image = null
	
	update: -> return
	
	draw: (g) ->
		return unless @image
		g.drawImage @image, @x, @y


class MedievalVillage
	[WIDTH, HEIGHT, FPS] = [640, 480, 30]
	canvas = null
	g = null
	
	images = {}
	reality = new GameObject()
	
	create_canvas = ->
		canvas = $ ['<canvas width="', WIDTH, '" height="', HEIGHT, '"></canvas>'].join ''
		g = canvas.get(0).getContext '2d'
		$('body').append canvas
	
	load_images = (list, callback) ->
		remaining = list.length
		for src in list 
			images[src] = new Image()
			images[src].onload = -> callback() if --remaining == 0
			images[src].src = "images/#{src}"
	
	update = ->
		reality.update()
	
	draw = ->
		g.clearRect 0, 0, WIDTH, HEIGHT
		reality.draw(g)
	
	game_loop = ->
		update()
		draw()
	
	# Initializes the game and starts the main game loop
	@start: ->
		create_canvas()
		load_images ['reality.jpg'], ->
			reality.image = images['reality.jpg']
			reality.update = ->
				@dx ?= 10
				@dy ?= 10
				@x += @dx
				@y += @dy
				@dx *= -1 if @x + @image.width > WIDTH or @x < 0
				@dy *= -1 if @y + @image.height > HEIGHT or @y < 0

			setInterval game_loop, 1000/FPS



		
	
		
	


# Start the game!
$ MedievalVillage.start
