import { Bullet } from './Bullet.js'

export class Gun {
    #gunConfig;
    #lastShotTime;
    #ammoCount;
    constructor(gunConfig, ammoCount) {
        this.#gunConfig = gunConfig;
        this.#lastShotTime = new Date().getTime() - this.#gunConfig.reloadTime;
        this.#ammoCount = ammoCount;
    }
    fire(position) {
        if (!this.isEmpty() && (new Date().getTime() - this.#lastShotTime > this.#gunConfig.reloadTime)) {
            this.#lastShotTime = new Date().getTime();
            this.changeAmmoCount(-1);
            return [new Bullet(5, [0, -1], position, 20, 1, this.#gunConfig.damage)]
        }
        return []
    }
    changeAmmoCount(delta) {
        this.#ammoCount += delta;
        if (this.#ammoCount <= 0) {
            this.#ammoCount = 0;
        }
    }
    isEmpty() {
        return this.#ammoCount == 0
    }
    getAmmoCount() {
        return this.#ammoCount;
    }
}