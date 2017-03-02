﻿TankGUI = function (game, x, y, playerName, angle, power, data) {
    //health decreases by 2.5 each time for 100
    //health decreases by 0.4 each time for 40
    this.maxHealth = data.health;
    this.maxArmour = data.armour;
    this.BARWIDTH = 40;
    this.BARHEIGHT = 2;
    
    var font_style = {
        font: "12px Arial",
        fill: "#ffffff"
    };

    //power and angle variables
    this.vText = game.add.text(x, y - 66, power + ", " + angle, font_style);

    //player name
    this.playerName = game.add.text(x,y-52,'Player Name',font_style);
    this.playerName.anchor.setTo(0.5);

    //armour bar
    var aBMD = game.add.bitmapData(this.BARWIDTH, this.BARHEIGHT);
    aBMD.ctx.beginPath();
    aBMD.ctx.rect(0, 0, 180, 30);
    aBMD.ctx.fillStyle = '#00685e';
    aBMD.ctx.fill();

    this.armourBar = game.add.sprite(x, y - 38, aBMD);
    this.armourBar.anchor.setTo(0.5);

    //health bar
    var hBMD = game.add.bitmapData(this.BARWIDTH,this.BARHEIGHT);
    hBMD.ctx.beginPath();
    hBMD.ctx.rect(0,0,180,30);
    hBMD.ctx.fillStyle = '#00685e';
    hBMD.ctx.fill();

    this.healthBar = game.add.sprite(x,y-34,hBMD);
    this.healthBar.anchor.setTo(0.5);

    // Add to the game.
    game.add.existing(this);
};

TankGUI.prototype = Object.create(Phaser.Sprite.prototype);
TankGUI.prototype.constructor = TankGUI;

TankGUI.prototype.damageArmourBar = function (value) {
    //value will be between 1 and 100
    var reduction = (this.BARWIDTH/this.maxArmour) * value;
    var currBarWidth = this.armourBar.width;

    if (this.currBarWidth > 0) {
        this.armourBar.width = currBarWidth - reduction;
    }
};

TankGUI.prototype.damageHealthBar = function (value) {
    //value will be between 1 and 100
    var reduction = (this.BARWIDTH / this.maxHealth) * value;
    var currBarWidth = this.healthBar.width;

    if (this.currBarWidth > 0) {
        this.healthBar.width = currBarWidth - reduction;
    }
};

TankGUI.prototype.updateAngleText = function (power, angle) {
    this.vText.text = power + ", " + angle;
};