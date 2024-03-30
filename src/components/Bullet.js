import Phaser from "phaser";

export default class Bullet extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, texture) {
    super(scene.matter.world, x, y, texture);

    scene.add.existing(this);
    this.setBody({ type: "rectangle", width: this.width, height: this.height });
    this.setCollisionCategory(3);
    this.setCollidesWith([1]);

    this.setOnCollide(() => {
      this.destroy();
    });
  }
}
