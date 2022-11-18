
export class CollisionChecker {
    #nextHandler = null;
    checkCollision(obj1, obj2) {
        if (this.#nextHandler != null) {
            return this.#nextHandler.checkCollision(obj1, obj2);
        }
        return false
    }
    setNext(collisionChecker) {
        this.#nextHandler = collisionChecker;
        return collisionChecker;
    }
}
