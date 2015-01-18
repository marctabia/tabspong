TabsPong.StartMenu = function(game) {
    this.startBg = null;
    this.startPrompt = null;
    this.startText = null;
    this.ding = null;
};


TabsPong.StartMenu.prototype = {

    create : function() {
        // play a sound on start
        this.ding = this.add.audio('start');
        
        // The bg image is a tiled sprite that we load on the start menu
        this.startBg = this.add.tileSprite(0, 0, 640, 480, 'bgtitle');
        
        // add text to display the title and the instruction to tap to start the game.
        // We use the bitmap font that was preloaded.
        this.startText = this.add.bitmapText(this.world.centerX, this.world.centerY - 100, 'eightbitwonder', 'TABS PONG', 48);
        this.ruleText = this.add.bitmapText(this.world.centerX, this.world.centerY + 50, 'eightbitwonder', 'First to 5 points wins', 15);
        this.ruleText2 = this.add.bitmapText(this.world.centerX, this.world.centerY + 70, 'eightbitwonder', 'Click mouse button to move ball', 15);
        this.startPrompt = this.add.bitmapText(this.world.centerX, this.world.centerY + 130, 'eightbitwonder', 'Tap to Start', 20);
        
        // Since BitmapText has no anchor and align only works with multiline text,
        // We do the following "hack" to center each line of the text.
        this.startText.updateText();
        this.startText.x -= this.startText.textWidth * 0.5;
        
        this.ruleText.updateText();
        this.ruleText.x -= this.ruleText.textWidth * 0.5;
        
        this.ruleText2.updateText();
        this.ruleText2.x -= this.ruleText2.textWidth * 0.5;
        
        this.startPrompt.updateText();
        this.startPrompt.x -= this.startPrompt.textWidth * 0.5;
        
        // We enable clicking on the background to start the game
        this.startBg.inputEnabled = true;
        this.startBg.events.onInputDown.addOnce(this.startGame, this);
    },
        
    startGame : function() {
        this.ding.play();
        this.state.start('Game');
    }

};