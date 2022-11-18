import { CircleToCircleChecker } from './CircleToCircleChecker.js'
import { RectToCircleChecker } from './RectToCircleChecke.js'
import { RectToRectChecker } from 'RectToRectChecke.js'
class CollisionChecker {
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

class CircleToCircleChecker extends CollisionChecker {
    checkCollision(obj1, obj2) {
        if ((obj1.hitbox == 'circle') && (obj2.hitbox == 'circle')) {
            return 'circlecircle'
        }
        return super.checkCollision(obj1, obj2);
    }
}
class RectToRectChecker extends CollisionChecker {
    checkCollision(obj1, obj2) {
        if ((obj1.hitbox == 'rect') && (obj2.hitbox == 'rect')) {
            return 'rectcrect'
        }
        return super.checkCollision(obj1, obj2);
    }
}
class RectToCircleChecker extends CollisionChecker {
    checkCollision(obj1, obj2) {
        if (((obj1.hitbox == 'rect') && (obj2.hitbox == 'circle')) || ((obj2.hitbox == 'rect') && (obj1.hitbox == 'circle'))) {
            return 'rectcircle'
        }
        return super.checkCollision(obj1, obj2);
    }
}
let a = {
    hitbox: 'rect1'
}
let b = {
    hitbox: 'rect'
}

let ccChecker = new CircleToCircleChecker();
let rcChecker = new RectToCircleChecker();
let rrChecker = new RectToRectChecker();
ccChecker.setNext(rcChecker).setNext(rrChecker);

console.log(ccChecker.checkCollision(a, b));