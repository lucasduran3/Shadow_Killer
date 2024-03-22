import Phaser from "phaser";
import Bullet from "./Bullet";

const ROTATION_SPEED = 5 * Math.PI;

export default class Player extends Phaser.Physics.Matter.Sprite {
  #life;

  #nbullets;

  #speed;

  #inpKeys;

  #target;

  #bullets;

  #worldPointer;

  #position;

  #angleToPointer;

  constructor(scene, x, y, texture) {
    super(scene.matter.world, x, y, texture);
    scene.add.existing(this);

    const {Bodies} = Phaser.Physics.Matter.Matter;
    const circleCollider = Bodies.circle(0, 0, this.width * 0.5);
    
    this.setExistingBody(circleCollider);
    this.setBody({ type: 'rectangle', radius: this.width * 0.5 });

    this.#life = 20;
    this.#nbullets = 50;
    this.#speed = 20;
    this.#bullets = this.scene.add.group();


    this.#inpKeys = scene.input.keyboard.addKeys("W,A,S,D");
    this.MouseInputController();
  }

  update(time, delta) {
    this.KeysInputController();


    this.rotation = Phaser.Math.Angle.RotateTo(
      this.rotation,
      this.#target,
      ROTATION_SPEED * 0.001 * delta
    );
    
    /*  this.#bullets.getFirstAlive().body.world.on('worldbounds', (body)=> {
      // Checks if it's the sprite that you'listening for
      if (body.gameObject === this) {
        // Make the enemy sprite unactived & make it disappear
        this.setActive(false);
        this.setVisible(false);
      }
    }, this.#bullets.getFirstAlive());  */

  }

  MouseInputController() {
    this.scene.input.on("pointermove", (pointer) => {
      this.#worldPointer = this.scene.cameras.main.getWorldPoint(
        pointer.x,
        pointer.y
      );
      this.#position = new Phaser.Math.Vector2(this.x, this.y);
      this.#angleToPointer = Phaser.Math.Angle.BetweenPoints(
        this.#position,
        this.#worldPointer
      );

      this.#target = this.#angleToPointer + Math.PI / 2;
    });

    this.scene.input.on("pointerdown", (pointer) => {
      this.fireBullet(pointer);
    });
  }

  KeysInputController() {
    if (this.#inpKeys.W.isDown) {
      this.setVelocityY(-this.#speed);
    } else if (this.#inpKeys.S.isDown) {
      this.setVelocityY(this.#speed);
    } else {
      this.setVelocityY(0);
    }

    if (this.#inpKeys.A.isDown) {
      this.setVelocityX(-this.#speed);
    } else if (this.#inpKeys.D.isDown) {
      this.setVelocityX(this.#speed);
    } else {
      this.setVelocityX(0);
    }
  }

  fireBullet() {
    const bullet = new Bullet(this.scene, this.x, this.y, 1, 1, "0xffff00");
    this.#bullets.add(bullet);

    bullet.setVelocity(
      Math.cos(this.#angleToPointer) * 20,
      Math.sin(this.#angleToPointer) * 20
    );
    bullet.setRotation(this.#angleToPointer - Math.PI / 2);
  }
}
