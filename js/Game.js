import { Player } from './Player.js';
import { Gun } from './Gun.js';
export class Game {
    #player;
    #gameConfig;
    #gameService;
    #bulletsRepository;
    #enemiesRepository;
    #output;
    #isPaused;
    constructor(enemiesRepository, bulletsRepository, gameConfig, gameService, output) {
        this.#enemiesRepository = enemiesRepository;
        this.#bulletsRepository = bulletsRepository;
        this.#gameConfig = gameConfig;
        this.#gameService = gameService;
        this.#output = output;
    }
    gameLoop() {
        if (this.#gameService.checkLoose(this.#gameConfig, this.#player, this.#enemiesRepository.get(), this.#bulletsRepository.get())) {
            this.#output.showEndGameMessage('YOU LOOSE')
            console.log(this.#enemiesRepository.get())
            return true;
        };
        if (this.#gameService.checkWin(this.#enemiesRepository.get())) {
            this.#output.showEndGameMessage('YOU WIN')
            console.log(this.#enemiesRepository.get())
            return true;
        };
        this.isBulletOutOfBounds(this.#bulletsRepository.get())
        this.#deleteDead(this.#bulletsRepository);
        this.#deleteDead(this.#enemiesRepository);

        this.#updateGameObjects(this.#enemiesRepository.get());
        this.#updateGameObjects(this.#bulletsRepository.get());
        this.#output.showAmmoCount(this.getPlayerGunAmmoCount());

    }
    #updateGameObjects(objects) {
        for (let object of objects) {
            object.move();
            this.#output.updateGameObjects(object)

        }
    }
    startGame() {

        this.#isPaused = false;
        this.#output.renderStage();

        this.createEnemies();
        this.createPlayer(this.#gameConfig.playerConfig,
            [this.#gameConfig.worldConfig.width / 2 - this.#gameConfig.playerConfig.width / 2 - 40,
            this.#gameConfig.worldConfig.height - this.#gameConfig.playerConfig.height], new Gun(this.#gameConfig.weaponsConfig.standart, 10));
        this.#output.renderGameObject(this.#player);
    }
    endGame() {
        this.#enemiesRepository.clearRepository();
        this.#bulletsRepository.clearRepository();
        this.#output.clearContainer();
    }
    pauseGame() {
        if (this.#isPaused) {
            this.#isPaused = false;
            return false;
        } else {
            this.#isPaused = true;
            return true;
        }
    }
    createEnemies() {
        for (let enemy of (this.#gameService.createEnemies(this.#gameConfig))) {
            this.#enemiesRepository.add(enemy);
            this.#output.renderGameObject(enemy);
        }
    }

    createPlayer(config, position, gun) {
        this.#player = new Player(config, position, gun);

    }
    movePlayer(vector) {
        this.#player.move(vector);
        this.#output.updateGameObjects(this.#player)
    }
    firePlayer() {
        for (let bullet of this.#player.fire()) {
            if (bullet !== null) {
                this.#bulletsRepository.add(bullet);
                this.#output.renderGameObject(bullet);
                // console.log(this.getPlayerGunAmmoCount())
            }
        }
    }
    getPlayerGunAmmoCount() {
        return this.#player.getGunAmmoCount();
    }
    #deleteDead(repository) {
        for (let obj of repository.get()) {
            if (obj.getHealth() <= 0) {
                repository.delete(obj);
                this.#output.deleteGameObjects(obj);
            }
        }
    }
    isBulletOutOfBounds(bullets) {
        return bullets.forEach(bullet => {
            if (bullet.getCoords()[1] <= 0) {
                this.#bulletsRepository.delete(bullet)
                this.#output.deleteGameObjects(bullet);
            }
        });
    }
}