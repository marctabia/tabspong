TabsPong.Preloader = function(game) {
    this.preloader = null;
    this.titleImage = null;
    this.ready = false;
};

TabsPong.Preloader.prototype = {

    preload : function() {
        // Load image as sprite for preloader
        this.preloader = this.add.sprite(this.world.centerX, this.world.centerY + 200, 'preloader');
        this.preloader.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.preloader);
        
        // load Phaser logo image as title image at preloading
        this.titleImage = this.add.image(this.world.centerX, this.world.centerY, 'titleImage');
        this.titleImage.anchor.setTo(0.5, 0.5);
        
        // load font
        this.load.bitmapFont('eightbitwonder', 'fonts/eightbitwonder.png', 'fonts/eightbitwonder.fnt');
        
        // load pong sprites
        this.load.image('bgtitle', 'images/starfield.jpg');
        this.load.image('paddle', 'images/Player.png');
        this.load.image('ball', 'images/ball.png');
        this.load.image('midline', 'images/MidLine.png');
        
        // load sounds
        this.load.audio('bgmusic', 'audio/BackgroundMusic.mp3');
        this.load.audio('score','audio/Bonus.wav');
        this.load.audio('paddleHit', 'audio/Click.wav');
        this.load.audio('gameover', 'audio/GameOver.mp3');
        this.load.audio('start', 'audio/Hit.wav');
    },
    
    create : function() {
        this.preloader.cropEnabled = false;
    },
    
    update : function() {
        if (this.cache.isSoundDecoded('bgmusic') && this.ready == false) {
            this.ready = true;
            this.state.start('StartMenu');
        }
    }
    
};