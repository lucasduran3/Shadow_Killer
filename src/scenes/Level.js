import Phaser from "phaser";
import Player from "../components/Player";

export default class Level extends Phaser.Physics.Matter.World {
  worldBounds;

  constructor() {
    super("hello-world");
  }

  preload() {
    /*  this.load.spritesheet("player", "assets/sprites/player-sheet.png",{
      frameWidth: 160,
      frameHeight: 160,
    }); */

    this.load.image("player", "assets/sprites/player.png");

    this.load.image("bullet", "assets/sprites/bullet.png");
    this.load.image("floor", "assets/sprites/floor.png");
    this.load.image("wall", "assets/sprites/wall.png");

    this.load.tilemapTiledJSON("map", "assets/tilemaps/map.json");
  }

  create() {
    this.matter.world.createDebugGraphic();
    this.worldBounds = this.matter.world.setBounds(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );

    this.map = this.make.tilemap({ key: "map" });
    const floorL = this.map.addTilesetImage("floor", "floor");
    const wallL = this.map.addTilesetImage("wall", "wall");

    // eslint-disable-next-line no-unused-vars
    const floorLayer = this.map.createLayer("floor", floorL, 0, 0);
    const wallLayer = this.map.createLayer("wall", wallL, 0, 0);
    wallLayer.setCollisionByProperty({ colision: true });
    this.matter.world.convertTilemapLayer(wallLayer);

    const playerSpawnPoint = this.map.findObject(
      "objects",
      (obj) => obj.name === "player"
    );

    this.player = new Player(
      this,
      playerSpawnPoint.x,
      playerSpawnPoint.y,
      "player"
    );
  }

  update(time, delta) {
    this.player.update(time, delta);
  }
}
