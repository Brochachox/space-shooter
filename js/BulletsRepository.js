export class BulletsRepository {
    #bullets = [];
    static #isIternalConstructing = true;
    static #instance = null;
    constructor() {
        if (BulletsRepository.#isIternalConstructing) {
            throw new TypeError('object is not constructable')
        }
    }
    static getInstance() {
        if (BulletsRepository.#instance == null) {
            BulletsRepository.#isIternalConstructing = false;
            BulletsRepository.#instance = new BulletsRepository();
            BulletsRepository.#isIternalConstructing = true;
        }
        return BulletsRepository.#instance;
    }

    get() {
        return this.#bullets;
    }
    add(bullet) {
        this.#bullets.push(bullet);
    }
    delete(bullet) {
        let index = this.#bullets.indexOf(bullet);
        if (index !== -1) {
            this.#bullets.splice(index, 1);
        }
    }
    clearRepository() {
        this.#bullets = [];
    }
}