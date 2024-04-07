import Phaser from "phaser";
import Player from "../components/Player";
import Enemy from "../components/Enemy";

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

    this.map.createLayer("floor", floorL, 0, 0);
    const wallLayer = this.map.createLayer("wall", wallL, 0, 0);
    wallLayer.setCollisionByProperty({ colision: true });
    this.matter.world.convertTilemapLayer(wallLayer);

    this.objectsLayer = this.map.getObjectLayer("objects");

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

    this.time.addEvent({
      delay: 2000,
      callback: this.spawnEnemy,
      callbackScope: this,
      repeat: -1,
    });
  }

  update(time, delta) {
    this.player.update(time, delta);
  }

  spawnEnemy() {
    this.objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "enemy": {
          this.enemy = new Enemy(this, x, y, "player", this.player);
          break;
        }
        default:
          console.log("");
      }
    });
  }
}
