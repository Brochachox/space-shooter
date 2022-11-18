export class EnemiesRepository {
    #enemies = [];
    static #isIternalConstructing = true;
    static #instance = null;
    constructor() {
        if (EnemiesRepository.#isIternalConstructing) {
            throw new TypeError('object is not constructable')
        }
    }
    static getInstance() {
        if (EnemiesRepository.#instance == null) {
            EnemiesRepository.#isIternalConstructing = false;
            EnemiesRepository.#instance = new EnemiesRepository();
            EnemiesRepository.#isIternalConstructing = true;
        }
        return EnemiesRepository.#instance;
    }
    get() {
        return this.#enemies;
    }
    add(enemy) {
        this.#enemies.push(enemy);
    }
    delete(enemy) {
        let index = this.#enemies.indexOf(enemy);
        if (index !== -1) {
            this.#enemies.splice(index, 1);
        }
    }
    clearRepository() {
        this.#enemies = [];
    }
}

