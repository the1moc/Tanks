Projectile = function(game, x, y, data){

	Phaser.Sprite.call(this, game, x, y, data);

	// Physics body.
	this.game.physics.arcade.enable(this);

	// Add to the game.
	game.projectiles.add(this);
};

Projectile.prototype = Object.create(Phaser.Sprite.prototype);
Projectile.prototype.constructor = Projectile;

Projectile.prototype.update = function () {
	if(this.x > 800 || this.x < 0){
		this.kill();
	}
};

/*
stuff for projectile data
"gravity":100,
        "effect":explode
        "effectTime":2000
*/
