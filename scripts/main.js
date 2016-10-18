var myGame = new Kiwi.Game();
var myState = new Kiwi.State("myState");
var myCanvas = new Kiwi.Utils.Canvas(50, 50);
//preload
myState.preload = function () {
    Kiwi.State.prototype.preload.call(this);
    this.addSpriteSheet('characterSprite', 'media/character.png', 150, 117);
    this.addImage('rectangle', 'media/rectangle.png');
    
    this.addImage('ground', 'media/ground.png');
    
};


//create
myState.create = function () {
    this.rect = new Player(this, 300, 400);
    this.rect2 = new Player(this, 400, 400);
    
    this.ground = new Platform(this, 0, 500);
    
    this.leftKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.A);
    this.rightKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.D);
    this.downKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.S);
    this.upKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.W);
    this.addChild(this.rect);
    this.addChild(this.rect2);
    this.addChild(this.ground);
};

myState.collideFunc = function() {
    this.collide = Kiwi.Components.ArcadePhysics.collide(this.rect, this.rect2, false);
    //console.log(this.collide);
    
};

myState.update = function () {

    var colliding = Kiwi.Components.ArcadePhysics.collide(this.rect, this.rect2, false);
    console.log(colliding);

// controller
    if (this.rightKey.isDown && !colliding){
        this.rect.transform.x += 5;
    }
    else if (this.leftKey.isDown) {
        this.rect.transform.x -= 5;
    }
    else if (this.upKey.isDown) {
        this.rect.transform.y -= 5;
    }
    else if (this.downKey.isDown) {
        this.rect.transform.y += 5;
    }
    //this.rect.physics.velocity.y -= 95;
    console.log(this.rect.physics.velocity.y);
}
// player class
var Player = function(state, x, y) {
    Kiwi.GameObjects.Sprite.call(this, state, state.textures.rectangle, x, y, true);
    this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));
    this.physics.velocity.y = 77;
    this.physics.acceleration.y = 144;
};
Kiwi.extend(Player, Kiwi.GameObjects.Sprite);

//Platform

var Platform = function ( state, x, y ) {
	Kiwi.GameObjects.Sprite.call(
		this, state, state.textures.ground, x, y, false);
	this.physics = this.components.add( new Kiwi.Components.ArcadePhysics(
		this, this.box) );
	this.physics.immovable = true;
};
Kiwi.extend( Platform, Kiwi.GameObjects.Sprite );





myGame.states.addState(myState);
myGame.states.switchState("myState");
