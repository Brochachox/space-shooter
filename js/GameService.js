
export class GameService {
    #collisionChecker;
    #enemiesFactory;
    constructor(enemiesFactory, collisionChecker) {
        this.#collisionChecker = collisionChecker;
        this.#enemiesFactory = enemiesFactory;
    }
    checkWin(enemies) {
        return enemies.length == 0;
    }
    checkLoose(gameConfig, player, enemies, bullets) {
        this.checkDamage([player], enemies);
        this.checkDamage([player], bullets);
        this.checkDamage(bullets, enemies);
        return player.getHealth() <= 0 || this.#checkEnemieBreaktrough(gameConfig, enemies) || (player.gunIsEmpty() && bullets.length == 0)
    }

    createEnemies(gameConfig) {
        const enemiesNumber = 8;
        const step = gameConfig.worldConfig.width / (enemiesNumber + 1);
        let enemies = [];
        for (let i = 1; i <= enemiesNumber; i++) {
            enemies.push(this.#enemiesFactory.createEnemy(gameConfig.enemiesConfig.asteroid, [step * i, this.#getRandomArbitrary(0, 100)], [0, 1]));
            enemies[enemies.length - 1].setSpeed(this.#getRandomArbitrary(0.2, 0.7))
        }
        return enemies;
    }
    #getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    checkDamage(objectsToCheck1, objectsToCheck2) {
        for (let obj1 of objectsToCheck1) {
            for (let obj2 of objectsToCheck2) {
                if (this.#collisionChecker.checkCollision(obj1, obj2)) {
                    obj1.changeHealth(-obj2.getDamage());
                    obj2.changeHealth(-obj1.getDamage());
                };
            }
        }
    }

    #checkEnemieBreaktrough(gameConfig, enemies) {
        for (let enemy of enemies) {
            if ((enemy.getCoords()[1] + enemy.getHeight()) >= gameConfig.worldConfig.height) {
                return true
            }
        }
    }

}


