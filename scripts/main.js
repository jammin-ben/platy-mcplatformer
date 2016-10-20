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
Kiwi.State.prototype.create.call( this );
    this.rect = new Player(this, 300, 400);
    this.rect2 = new Player(this, 400, 400);
    this.rect2.physics.immovable = false;
    
    this.ground = new Platform(this, 0, 500);
    
    this.platform1 = new Platform(this, 400, 300);
    


//keys    
    this.leftKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.A);
    this.rightKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.D);
    this.downKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.S);
    this.upKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.W);
    this.jumpKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.SPACEBAR);
    
    
    this.addChild(this.rect);
    this.addChild(this.rect2);
    this.addChild(this.ground);
    this.addChild(this.platform1);
};

myState.collideFunc = function() {
    this.collide = Kiwi.Components.ArcadePhysics.collide(this.rect, this.rect2, false);
    
};

myState.update = function () {
Kiwi.State.prototype.update.call( this );
// controller
    if (this.rightKey.isDown){
        this.rect.transform.x += this.rect.moveSpeed * myGame.time.delta();
    }
    else if (this.leftKey.isDown) {
        this.rect.transform.x -= this.rect.moveSpeed * myGame.time.delta();
    }
    else if (this.upKey.isDown) {
        this.rect.transform.y -= this.rect.moveSpeed * myGame.time.delta();
    }
    else if (this.downKey.isDown) {
        this.rect.transform.y += this.rect.moveSpeed * myGame.time.delta();
    }
    else if (this.jumpKey.isDown) {
        this.rect.y -= (this.rect.moveSpeed * 2) * myGame.time.delta();
    }
    this.checkPlayerHitting();
    this.updateCameraPosition();
} // end update

myState.checkPlayerHitting = function() {
    Kiwi.Components.ArcadePhysics.collide(this.rect, this.rect2, true);
    this.rect.physics.overlaps(this.platform1, true);
    this.rect.physics.overlaps(this.ground, true);
    this.rect2.physics.overlaps(this.ground, true);
}

//update Camera Position
myState.updateCameraPosition = function() {
    this.game.cameras.defaultCamera.transform.x = -1 * this.rect.x + this.game.stage.width * this.rect.offSet.x;
	this.game.cameras.defaultCamera.transform.y = -1 * this.rect.y + this.game.stage.height * this.rect.offSet.y;
}
// player class
var Player = function(state, x, y) {
    Kiwi.GameObjects.Sprite.call(this, state, state.textures.rectangle, x, y, true);
    this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));
    this.physics.velocity.y = 40;
    this.physics.acceleration.y = 15;
    this.physics.maxVelocity.y = 90;
    this.moveSpeed = .3;
    this.offSet = new Kiwi.Geom.Point(0.5, 0.5);
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
