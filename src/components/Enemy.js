export Phaser from "phaser";

export default class Enemy extends Phaser.Physics.Matter.Sprite{
    #life;

    #speed;

    #target;

    constructor(scene, x, y, texture, target)
    {
        super(scene.matter.world, x, y, texture);
        scene.add.existing(this);
        this.setBody({type: "rectangle"});

        this.#target = target;
        this.#life = 10;
    }

    update(){}
}