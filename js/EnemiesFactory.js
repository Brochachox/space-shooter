import { Enemy } from "./Enemy.js";
export class EnemiesFactory {
    createEnemy(config, position, vector, gun) {
        return (new Enemy(config, position, vector, gun));
    }
}