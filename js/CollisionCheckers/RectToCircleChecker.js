import { CollisionChecker } from "./CollisionChecker.js";
export class RectToCircleChecker extends CollisionChecker {
    checkCollision(obj1, obj2) {
        if (((obj1.getHitbox() == 'rect') && (obj2.getHitbox() == 'circle')) || ((obj2.getHitbox() == 'rect') && (obj1.getHitbox() == 'circle'))) {
            let circle;
            let rect;
            if ((obj1.getHitbox() == 'rect') && (obj2.getHitbox() == 'circle')) {
                circle = obj2;
                rect = obj1;
            } else {

                circle = obj1;
                rect = obj2;
            }
            let circleDistanceX = Math.abs(circle.getCoords()[0] - rect.getCoords()[0]);
            let circleDistanceY = Math.abs(circle.getCoords()[1] - rect.getCoords()[1]);
            if (circleDistanceX > (rect.getWidth() / 2 + circle.getWidth() / 2)) { return false; }
            if (circleDistanceY > (rect.getHeight() / 2 + circle.getWidth() / 2)) { return false; }

            if (circleDistanceX <= (rect.getWidth() / 2)) { return true; }
            if (circleDistanceY <= (rect.getHeight() / 2)) { return true; }

            cornerDistance_sq = (circleDistanceX - rect.getWidth() / 2) ** 2 +
                (circleDistanceY - rect.getHeight() / 2) ** 2;

            return (cornerDistance_sq <= (circle.getWidth() / 2 ** 2));
        }
        return super.checkCollision(obj1, obj2);
    }
}