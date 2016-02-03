/* app.js
 * This file provides the game's character classes for all objects in
 * the game (player, enemies, obstacles, etc.) as well as the associated
 * character methods, functionality, and movement methods.
 *
 *
 *
 */

 // TODO: add gems to collect for points, tally points, & add 3 lives

$(".winnerBox").hide();
var GAME_OVER = false;
var PLAYER_START_X = 300;
var PLAYER_START_Y = 580;

//---------------------------------------
//---------------------------------------

/*
 * @description Superclass for all characters
 * @constructor
 */
var Character = function() {
};
Character.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
/* This is the original code used for rendering each Class prior
 * to creating one superclass:
 * Enemy.prototype.render = function() {
 * ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
 * };
 */


/**
 * @description Represents an Enemy
 * @constructor
 * @param {int} starting x-coordinate
 * @param {int} starting y-coordinate
 * @param {int} speed  - speed of movement across screen
 */
var Enemy = function(enemyStartX, enemyStartY, speed) {
  Character.call(this);
  this.x = enemyStartX;
  this.y = enemyStartY;
  this.speed = speed;
  this.sprite = './arcade/images/enemy-bug.png';
};
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

/**
 * @description Updates the enemy's position (required method for game)
 * @param {float} dt - time delta between ticks
 */
Enemy.prototype.update = function(dt) {
  /* We must multiply any movement by the 'dt 'parameter
   * this will ensure the game runs at the same speed for all computers.
   */
  this.x += this.speed * dt;

  /* If the enemy bug moves off the screen to the right, this repositions
   * the enemy object to start moving again from the left. Without this,
   * the enemy bugs will move right only one time. This also calls the
   * the newRandomSpeed() function in order to have a a new speed
   * asociated with the enemy bug starting from the left.
   */
  if (this.x > 700) {
    this.x = -70;
    this.newRandomSpeed();
  }
};

/**
 * @description Generates new psuedo-random speed on each enemy object
 *              called from update() when the enemy bug's 'x' position
 *              is > 700
 */
Enemy.prototype.newRandomSpeed = function() {
  this.speed = Math.floor((Math.random() * 5 + 1) * 70);
};


/**
* @description Represents a player
* @constructor
*/
var Player = function() {
  Character.call(this);
  this.x = PLAYER_START_X;
  this.y = PLAYER_START_Y;
  this.collision = false;
  this.sprite = './arcade/images/char-horn-girl.png';
};
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

/**
* @description Update the player's position, required method for game
*              any movement should be multiplied by the dt parameter
*              this will ensure the game runs at the same speed for
*              all computers.
* @param {float} dt - a time delta between ticks
*/
Player.prototype.update = function(dt) {};

/**
* @description Controls the player's movement
*              Also calls gameOver() function if player reaches top of screen.
* @param {string} direction - key press ('left', 'right', 'up', 'down')
*/
Player.prototype.handleInput = function(direction) {
  if (GAME_OVER === false){
    if (direction === "left" && this.x > -62) {
      this.x -= 20;
    } else if (direction === "left" && this.x <= -62) { //lets sprite wrap left
      this.x = 695;
    }
    if (direction === "right" && this.x < 695) {
      this.x += 20;
    } else if (direction === "right" && this.x >= 695) { //lets sprite wrap right
      this.x = 0;
    }
    if (direction === "up" && this.y > 8) {
      this.y -= 20;
    }
    if (direction === "down" && this.y < 580) {
      this.y += 20;
    }
    if (direction === "up" && this.y <= 8) {
      this.gameOver();
    }
  };
}

/**
* @description Displays "Game Over" notification and button to "Play Again"
*              Also calls startOver() function via click event.
*/
Player.prototype.gameOver = function() {
  GAME_OVER = true;
  /* The scope of 'this' changes within the click event callback fn.
  * so here we "alias this" DO NOT directly access the instance 'player'
  * in its class definition, (i.e. player.startOver()).
  */
  var self = this;

  $(".winnerBox").show();

  $("#playAgain").on('click', function() {
    $(".winnerBox").hide();
    self.startOver();
  });
}

Player.prototype.startOver = function() {
  GAME_OVER = false;
  this.x = PLAYER_START_X;
  this.y = PLAYER_START_Y;
};


/**
* @description Represents a rock object
* @constructor
* @param {int} starting x-coordinate
* @param {int} starting y-coordinate
*/
var Rock = function(rockX, rockY) {
 Character.call(this);
 this.x = rockX;
 this.y = rockY;
 this.sprite = './arcade/images/Rock.png';
};
Rock.prototype = Object.create(Character.prototype);
Rock.prototype.constructor = Rock;

Rock.prototype.update = function(dt) {
};

//---------------------------------------
//------- Instantiate the Objects -------
//---------------------------------------

var allRocks = [
  new Rock(100, 75),
  new Rock(200, 300),
  new Rock(500, 140)
];
var arrayOfRocks = allRocks
var allEnemies = [];

/* When we instantiate an enemy object, we must pass it an initial speed
 * I picked speeds between 100-500, so picked this equation to generate it.
 */
for (var i = 0; i < 5; i++) {
  var firstMovingSpeed = Math.floor((Math.random() * 5 + 1) * 80);
  allEnemies.push(new Enemy(60, 60 * (i + 1), firstMovingSpeed));
}

var arrayOfEnemies = allEnemies
var player = new Player();

//---------------------------------------
//---------------------------------------

/* This listens for key presses and sends the keys to your
 * Player.handleInput() method. You don't need to modify this.
 * http://keycode.info/
*/
  document.addEventListener('keyup', function(e) {
   var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
   };

   player.handleInput(allowedKeys[e.keyCode]);

  });
