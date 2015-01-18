var TabsPong = {};

TabsPong.Boot = function(game) {};

TabsPong.Boot.prototype = {
    
    preload : function() {
        this.load.image('preloader', 'images/loader_bar.png');
        this.load.image('titleImage', 'images/Phaser-Logo-Small.png');
    },
    
    create : function() {
        // set pointers
        this.input.maxPointers = 1;
        
        // pause game when not active
        this.stage.disableVisibilityChange = false;
        
        // show all scale settings
        this.scale.setShowAll();
        
        // min sizes at browser resize
        this.scale.minWidth = 320;
        this.scale.minHeight = 240;
        
        // center game window
        this.scale.pageAlignHOrizontally = true;
        this.scale.pageAlignVertically = true;
        
        //force screen size
        this.scale.setScreenSize(true);
        
        this.scale.refresh();
        
        //force landscape mode
        this.scale.forceOrientation(true, false);
        
        // add input to the game
        this.input.addPointer();
        
        this.state.start('Preloader');
    }
};