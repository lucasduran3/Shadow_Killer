import Phaser from "phaser";
import Player from "../components/Player";

// Manejador de eventos centralizados para comunicacion de componentes

// Importacion
// import events from './EventCenter'

// Emisor de mensaje de difusion
// Recibe el nombre del mensaje y los valores de parametro
// events.emit('health-changed', this.health)

// Receptor de mensaje, por ejemplo escena de UI
// Recibe el nombre del mensaje y una funcion callback a ejecutar
// events.on('health-changed', this.handleHealthChanged, this)

export default class Level extends Phaser.Physics.Matter.World {
  constructor() {
    super("hello-world");
  }

  preload() {
    this.load.image("logo", "assets/sprites/phaser3-logo.png");
  }

  create() {
    this.player = new Player(this, this.cameras.main.centerX, this.cameras.main.centerY * 1.5, "logo");
  }

  update(time, delta) {
    this.player.update(time, delta);
  }
}
