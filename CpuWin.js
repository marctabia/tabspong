TabsPong.CpuWin = function(game) {
    this.winText = null;
    this.overBg = null;
};

TabsPong.CpuWin.prototype = {
    
    create : function() {
        // The bg image is a tiled sprite like what we load on the start menu
        this.overBg = this.add.tileSprite(0, 0, 640, 480, 'bgtitle');
        
        this.winText = this.add.bitmapText(this.world.centerX, this.world.centerY - 100, 'eightbitwonder', 'SkyNET Wins!!!', 32);
        this.backText = this.add.bitmapText(this.world.centerX, this.world.centerY - 50, 'eightbitwonder', 'I ll be back', 20); 
        this.resetText = this.add.bitmapText(this.world.centerX, this.world.centerY + 150, 'eightbitwonder', 'Tap to Reset', 20);
        
        this.winText.updateText();
        this.winText.x -= this.winText.textWidth * 0.5;
        
        this.backText.updateText();
        this.backText.x -= this.backText.textWidth * 0.5;
        
        this.resetText.updateText();
        this.resetText.x -= this.resetText.textWidth * 0.5;
    },
    
    update : function() {
        if(this.input.activePointer.justPressed()) {
            this.state.start('StartMenu');
        }
    }
    
};