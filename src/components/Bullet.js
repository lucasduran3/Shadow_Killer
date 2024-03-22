import Phaser from "phaser";

export default class Bullet extends Phaser.Physics.Matter.Sprite
{
    constructor(scene, x, y, width, height, fillColor)
    {
        super(scene.matter.world, x, y, width, height, fillColor, 1);

        scene.add.existing(this);
        this.setBody({ type: 'rectangle', width: this.width, height: this.height });
    }
}