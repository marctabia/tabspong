TabsPong.Game = function(game) {
    this.gameBg = null;
    this.playerPaddle = null;
    this.cpuPaddle = null;
    this.ball = null;
    this.net = null;
    this.set = -1;
    this.whoWon = 1;
    this.ballReleased = false;
    this.ballSpeed = 300;
    this.cpuPaddleSpeed = 300;
    this.music = null;
    this.paddleHit = null;
    this.scoreSound = null;
    this.playerScoreText = null;
    this.cpuScoreText = null;
    this.playerScore = 0;
    this.cpuScore = 0;
    this.gameOver = false;
};

TabsPong.Game.prototype = {

    createPaddle : function(x, y) {
        var paddle = this.add.sprite(x, y, 'paddle');
        this.physics.enable(paddle, Phaser.Physics.ARCADE);
        paddle.anchor.setTo(0.5, 0.5);
        paddle.body.collideWorldBounds = true;
        paddle.body.bounce.setTo(1, 1);
        paddle.body.immovable = true;
        
        return paddle;
    },
    
    releaseBall : function() {
        if(!this.ballReleased) {
            
            this.ball.body.velocity.x = this.set * this.ballSpeed;
            
            var rand = this.rnd.integerInRange(-1, 1);
            if(rand == -1 || rand == 1) {
                this.ball.body.velocity.y = rand * this.ballSpeed;
            } else {
                this.ball.body.velocity.y = -this.ballSpeed;
            }
            
            this.ballReleased = true;
        }
    },
    
    checkPoint : function() {
        if(this.ball.x < 15) {
            this.scoreSound.play();
            ++this.cpuScore;
            this.set = -1;
            if(this.cpuScore == 5) {
                this.whoWon = 2;
                this.gameOver = true;
            } else {
                this.cpuScoreText.setText(this.cpuScore.toString());
                this.setBall();
            }
           
        } else if(this.ball.x > (this.world.width - 15)) {
            this.scoreSound.play();
            ++this.playerScore;
            this.set = 1;
            if(this.playerScore == 5) {
                this.whoWon = 1;
                this.gameOver = true;
            } else {
                this.playerScoreText.setText(this.playerScore.toString());
                this.setBall();
            }
        }
    },
    
    setBall : function() {
        if(this.ballReleased) {
            this.ball.body.velocity.x = 0;
            this.ball.body.velocity.y = 0;
            this.ball.x = this.world.centerX;
            this.ball.y = this.world.centerY;
            this.ballReleased = false;
        }
    },
    
    ballHitsPaddle : function(_ball, _paddle) {
        this.paddleHit.play();
        var diff = 0;
        if(_ball.y < _paddle.y) {
            // if ball is on the upper part of the paddle on hit
            diff = _paddle.y - _ball.y;
            _ball.body.velocity.y = (-15 * diff);
        } else if(_ball.y > _paddle.y) {
            // ball is in the lower side of the paddle on hit
            diff = _ball.y - _paddle.y;
            _ball.body.velocity.y = (15 * diff);
        } else {
            _ball.body.velocity.y = 2 + this.rnd.integerInRange(1, 8) * 6;
        }
    },
    
    limitPaddleToGameArea : function(_paddle) {
        var playerPaddleHalfHeight =  _paddle.height / 2;
        if(_paddle.y < playerPaddleHalfHeight) {
            _paddle.y = playerPaddleHalfHeight;
        } else if(_paddle.y > this.world.height - playerPaddleHalfHeight) {
            _paddle.y = this.world.height - playerPaddleHalfHeight ;
        }
    },
    
    cpuPaddleAI : function() {
       
        if(this.ballReleased) {
             // if the ball is moving to the player's direction
            // we assume the cpu paddle is the one on the right
            if(this.ball.body.velocity.x < 0) {
                // if the paddle's position is above the half of the area's height
                if(this.cpuPaddle.y - this.world.centerY < -10) {
                    this.cpuPaddle.body.velocity.y = this.cpuPaddleSpeed;
                // if the cpu paddle is below half of the area's height
                } else if(this.cpuPaddle.y  - this.world.centerY > 10) {
                    this.cpuPaddle.body.velocity.y = -this.cpuPaddleSpeed;
                } else {
                    this.cpuPaddle.y = this.world.centerY;
                    this.cpuPaddle.body.velocity.y = 0;
                }
            // the ball is moving towards the paddle
            } else if(this.ball.body.velocity.x > 0 && this.world.centerX - this.ball.x < 35) {
                // as long as the cpu paddle's y-position and 
                // ball's y-position are different
                if(this.cpuPaddle.y != this.ball.y) {
                    // if the ball's position is greater than the paddle's
                    // move down
                    if(this.ball.y - this.cpuPaddle.y > 5) {
                        this.cpuPaddle.body.velocity.y = this.cpuPaddleSpeed;
                    // else move up
                    } else if(this.ball.y - this.cpuPaddle.y < -5) {
                        this.cpuPaddle.body.velocity.y = -this.cpuPaddleSpeed;
                    } else {
                        this.cpuPaddle.body.velocity.y = 0;
                    }
                }
            }
        } else {
            this.cpuPaddle.y = this.world.centerY;
            this.cpuPaddle.body.velocity.y = 0;
            this.cpuPaddle.body.velocity.x = 0;
        }
    },
    
    resetGame : function() {
        this.playerPaddle.kill();
        this.cpuPaddle.kill();
        this.ball.kill();
        this.playerScore = 0;
        this.cpuScore = 0;
        this.music.stop();
        this.gameOver = false;
    },
    
    create : function() {
        
        // The bg image is a tiled sprite like what we load on the start menu
        this.gameBg = this.add.tileSprite(0, 0, 640, 480, 'bgtitle');
        
        this.playerPaddle = this.createPaddle(20, this.world.centerY);
        this.cpuPaddle = this.createPaddle(this.world.width - 20, this.world.centerY);
        
        this.midline = this.add.sprite(this.world.centerX, this.world.centerY, 'midline');
        this.midline.anchor.setTo(0.5, 0.5);
        
        this.ball = this.add.sprite(this.world.centerX, this.world.centerY, 'ball');
        this.ball.anchor.setTo(0.5, 0.5);
        this.physics.enable(this.ball, Phaser.Physics.ARCADE);
        this.ball.body.collideWorldBounds = true;
        this.ball.body.bounce.setTo(1, 1);
        
        // create score display for player and CPU TODO
        this.playerScoreText = this.add.bitmapText(this.world.centerX - (this.world.centerX / 2), this.world.centerY - 180, 'eightbitwonder', '0', 32);
        
        this.cpuScoreText = this.add.bitmapText(this.world.centerX + (this.world.centerX / 2), this.world.centerY - 180, 'eightbitwonder', '0', 32);
        
        // play background music
        this.music = this.add.audio('bgmusic');
        this.music.play('', 0, 0.3, true); // marker, position, volume. loop
        
        // add sounds
        this.paddleHit = this.add.audio('paddleHit');
        this.scoreSound = this.add.audio('score');
        
        // release ball when mouse button is clicked
        this.input.onDown.add(this.releaseBall, this);
    },
    
    update : function() {
        // control the player paddle's movement via mouse (default control)
        this.playerPaddle.y = this.input.y;
        
        // the following code prevents the player and CPU from going out of bounds of the
        // court and preventing 'shaking' due to physics
        this.limitPaddleToGameArea(this.playerPaddle);
        this.limitPaddleToGameArea(this.cpuPaddle);
        
        // enable AI
        this.cpuPaddleAI();
        
        // check collision between ball and paddle and process it
        this.physics.arcade.collide(this.ball, this.playerPaddle, this.ballHitsPaddle, null, this);
        this.physics.arcade.collide(this.ball, this.cpuPaddle, this.ballHitsPaddle, null, this);
        
        // check if a player makes a point
        this.checkPoint();
        
        if(this.gameOver) {
            this.resetGame();
            if(this.whoWon == 1) {
                this.state.start('PlayerWin');
            } else if(this.whoWon == 2) {
                this.state.start('CpuWin');
            }
            
        }
    
    },
    
    shutdown : function() {
        this.playerPaddle.destroy();
        this.cpuPaddle.destroy();
        this.midline.destroy();
        this.ball.destroy();
        this.set = -1;
        this.ballReleased = false;
    }

};