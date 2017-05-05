﻿//<a href='http://www.freepik.com/free-vector/polygonal-camouflage-background_834791.htm'>Designed by Freepik</a>
//reference for the background by attribution?

var Customization = {
    create: function () {
        this.background = this.add.sprite(0, 0, 'menu_bg2');
        var bgScale = 600.0 / 1080;
        this.background.scale.setTo(1, bgScale);

        //this.setChanges = this.add.button(250, 500, "btn_save", this.sendSelections, this);
        this.stage.disableVisibilityChange = true;

        // Title image.
        this.customizationTitle = game.add.text(this.game.width / 2, 40, "Shots Fired!", { font: "50px Arial", fill: "#000000", align: "center" });
        this.customizationTitle.anchor.setTo(0.5, 0.5);
        this.customizationSubTitle = game.add.text(this.game.width / 2, this.customizationTitle.bottom + 15, "Customization Menu", { font: "20px Arial", fill: "#000000", align: "center" });
        this.customizationSubTitle.anchor.setTo(0.5, 0.5);
        this.leftXPos = 100;
        this.centreXPos = 240;
        this.rightXPos = 500;
        this.yPos = 162;

        // Groups
        this.tankSecGroup = this.add.group();
        this.upgSecGroup = this.add.group();
        this.tankSecGroup.visible = false;
        this.upgSecGroup.visible = false;

        //this.currentSelection = 0;

        //this.selectedShot;
        //this.selectedTurret;
        //this.selectedBody;
        //this.selectedBodyColour;
        //this.selectedTurretColour;


        this.selections = {
            bodyAsset: 0,
            bodyAssetColour: 0,
            turretAsset: 0,
            turretAssetColour: 0,
            projectileAsset: 0
        };
        this.initial_Value = 0;

        this.createGUI();
    },

    sendSelections: function () {
        var gameHub = $.connection.gameHub;

        

        gameHub.server.saveSelections(this.selections);
    },

    generateUIButtons: function () {
        //section buttons & return button
        this.tankCustomizationButton = this.add.button(this.leftXPos, this.yPos, 'btnUP', this.showTankSection, this);
        this.tankCustomizationLabel = this.add.text(26, 0, "Tank", stylePicker(1));
        this.tankCustomizationButton.addChild(this.tankCustomizationLabel);

        //this.returnButton = this.add.button(this.leftXPos, this.bottomBG.top - 10, 'btnUP', this.sendSelections, this);
        this.returnButton = this.add.button(this.leftXPos, this.bottomBG.top - 10, 'btnUP', this.backToLobby, this);
        this.returnLabel = this.add.text(18, 0, "Return", stylePicker(1));
        this.returnButton.addChild(this.returnLabel);


        
    },

    createGUI: function () {
        //create background UI
        var ex = 80; var ey = 100; this.rows = 10;
        var top = this.add.sprite(ex, ey, 'lrgBanner_top');
        for (var i = 0; i < this.rows; i++) {
            var row = this.add.sprite(ex, top.bottom + 32 * i, 'lrgBanner_row');
        }
        this.bottomBG = this.add.sprite(ex, top.bottom + 32 * this.rows, 'lrgBanner_bottom');


        //call button generation for sections
        this.generateUIButtons();


        //divider
        var divTop = this.add.sprite(this.tankCustomizationButton.right + 15, this.tankCustomizationButton.y - 5, 'div_t');
        for (var i = 0; i < this.rows - 1; i++) {
            var divMid = this.add.sprite(divTop.x, divTop.bottom + 32 * i, 'div_m');
        }
        var divBot = this.add.sprite(divTop.x, divMid.bottom, 'div_b');
        
        this.contentassetX = this.centreXPos;
        this.contentColourX = this.contentassetX + 250;
        var spacer = 10;
        
        
        //rows
        this.turretTypeText = game.add.text(this.contentassetX, this.yPos, "Turret:", stylePicker(1));
        this.turretTypeChoiceBG = game.add.sprite(this.contentassetX, this.turretTypeText.bottom + spacer, 'playerUI_stylesBG');
        this.turretColourText = game.add.text(this.contentColourX, this.yPos, "Colour:", stylePicker(1));
        this.turretColourChoiceBG = game.add.sprite(this.contentColourX, this.turretTypeText.bottom + spacer, 'playerUI_stylesBG');
        
        this.bodyTypeText = game.add.text(this.contentassetX, this.turretColourChoiceBG.bottom + spacer, "Body:", stylePicker(1));
        this.bodyTypeChoiceBG = game.add.sprite(this.contentassetX, this.bodyTypeText.bottom + spacer, 'playerUI_stylesBG');
        this.bodyColourText = game.add.text(this.contentColourX, this.turretColourChoiceBG.bottom + spacer, "Colour:", stylePicker(1));
        this.bodyColourChoiceBG = game.add.sprite(this.contentColourX, this.bodyTypeText.bottom + spacer, 'playerUI_stylesBG');

        this.shotTypeText = game.add.text(this.contentassetX, this.bodyColourChoiceBG.bottom + spacer, "Projectile:", stylePicker(1));
        this.shotTypeChoiceBG = game.add.sprite(this.contentassetX, this.shotTypeText.bottom + spacer, 'playerUI_stylesBG');

        //buttons and na blocks - turret
        _this = this;
        this.tb1 = game.add.button(this.turretTypeChoiceBG.x + 24, this.turretTypeChoiceBG.y + 8, 'btn_wpn_bg', this.turretSelected, _this);
        this.tba = game.add.sprite(0, 0, 'turret');
        this.tb1.addChild(this.tba);
        this.tb1.value = 0;
        this.tb2 = game.add.button(this.turretTypeChoiceBG.x + 74, this.turretTypeChoiceBG.y + 8, 'turret', this.turretSelected, _this);
        this.tb2.value = 1;
        this.tb3 = game.add.sprite(this.turretTypeChoiceBG.x + 124, this.turretTypeChoiceBG.y + 8, 'btn_na');

        this.tc1 = game.add.button(this.turretColourChoiceBG.x + 24, this.turretColourChoiceBG.y + 8, 'turret', this.turretColourSelected, _this);
        this.tc1.value = 1;
        this.tc2 = game.add.button(this.turretColourChoiceBG.x + 74, this.turretColourChoiceBG.y + 8, 'turret', this.turretColourSelected, _this);
        this.tc2.value = 2;
        this.tc3 = game.add.button(this.turretColourChoiceBG.x + 124, this.turretColourChoiceBG.y + 8, 'turret', this.turretColourSelected, _this);
        this.tc3.value = 3;

        //buttons and na blocks - body
        this.tab1 = game.add.button(this.bodyTypeChoiceBG.x + 24, this.bodyTypeChoiceBG.y + 8, 'turret', this.bodySelected, _this);
        this.tab1.value = 0;
        this.tab2 = game.add.button(this.bodyTypeChoiceBG.x + 74, this.bodyTypeChoiceBG.y + 8, 'turret', this.bodySelected, _this);
        this.tab2.value = 1;
        this.tab3 = game.add.sprite(this.bodyTypeChoiceBG.x + 124, this.bodyTypeChoiceBG.y + 8, 'btn_na');

        this.tac1 = game.add.button(this.bodyColourChoiceBG.x + 24, this.bodyColourChoiceBG.y + 8, 'turret', this.bodyColourSelected, _this);
        this.tac1.value = 1;
        this.tac2 = game.add.button(this.bodyColourChoiceBG.x + 74, this.bodyColourChoiceBG.y + 8, 'turret', this.bodyColourSelected, _this);
        this.tac2.value = 2;
        this.tac3 = game.add.button(this.bodyColourChoiceBG.x + 124, this.bodyColourChoiceBG.y + 8, 'turret', this.bodyColourSelected, _this);
        this.tac3.value = 3;

        //buttons and na blocks - shot assets
        this.sb1 = game.add.button(this.shotTypeChoiceBG.x + 24, this.shotTypeChoiceBG.y + 8, 'turret', this.shotSelected, _this);
        this.sb1.value = 1;
        this.sb2 = game.add.button(this.shotTypeChoiceBG.x + 74, this.shotTypeChoiceBG.y + 8, 'turret', this.shotSelected, _this);
        this.sb2.value = 2;
        this.sb3 = game.add.button(this.shotTypeChoiceBG.x + 74, this.shotTypeChoiceBG.y + 8, 'turret', this.shotSelected, _this);
        this.sb3.value = 3;

        //save button
        this.saveButton = this.add.button(this.rightXPos, this.bottomBG.top - 10, 'btnUP', this.sendSelections, this);
        this.saveLabel = this.add.text(18, 0, "Save", stylePicker(1));
        this.saveButton.addChild(this.saveLabel);

    },

    turretSelected: function(type){
        switch(type.value){
            case 0: this.selections.turretAsset = 0;
                break;
            case 1: this.selections.turretAsset = 1;
                break;
        }    
    },

    turretColourSelected: function (type) {
        switch (type.value) {
            case 1: this.selections.turretAssetColour = 1;
                break;
            case 2: this.selections.turretAssetColour = 2;
                break;
            case 3: this.selections.turretAssetColour = 3;
                break;
            default: this.selections.turretAssetColour = 0;
                break;
        }
    },

    bodySelected: function (type) {
        switch (type.value) {
            case 0: this.selections.bodyAsset = 0;
                break;
            case 1: this.selections.bodyAsset = 1;
                break;
        }
    },

    bodyColourSelected: function (type) {
        switch (type.value) {
            case 1: this.selections.bodyAssetColour = 1;
                break;
            case 2: this.selections.bodyAssetColour = 2;
                break;
            case 3: this.selections.bodyAssetColour = 3;
                break;
            default: this.selections.bodyAssetColour = 0;
                break;
        }
    },

    shotSelected: function (type) {
        switch (type.value) {
            case 1: this.selections.projectileAsset = 1;
                break;
            case 2: this.selections.projectileAsset = 2;
                break;
            case 3: this.selections.projectileAsset = 3;
                break;
            default: this.selections.projectileAsset = 0;
                break;
        }
    },

    backToLobby: function () {
        this.state.start("Lobby");
    }
};