export class GameOutput {
    #pixiApp;
    #container;
    #sprites = [];
    //#graphics;
    #ammoCountText;
    constructor(app) {
        this.#pixiApp = app;
        this.#container = new PIXI.Container();
        //this.#graphics = new PIXI.Graphics();
        this.#pixiApp.stage.addChild(this.#container);
        this.#ammoCountText = new PIXI.Text('dsad', { fontSize: 30 });
        this.#ammoCountText.x = 10;
        this.#ammoCountText.y = 10;
        this.#ammoCountText.style.fill = 0xa19f01;


    }
    renderStage() {
        document.body.appendChild(this.#pixiApp.view);
    }
    renderGameObject(obj) {
        if (obj.getObjectType() == 'bullet') {
            const graphics = new PIXI.Graphics();
            graphics.beginFill(0xDE3249, 1);
            graphics.drawCircle(0, 0, obj.getWidth() / 2);
            graphics.endFill();
            const sprite = new PIXI.Container();
            sprite.addChild(graphics);
            sprite.x = obj.getCoords()[0];
            sprite.y = obj.getCoords()[1];
            this.#container.addChild(sprite);
            this.#sprites.push([sprite, obj.getId()]);
        } else {
            const sprite = PIXI.Sprite.from(obj.getBackground());
            sprite.width = obj.getWidth();
            sprite.height = obj.getHeight();
            sprite.x = obj.getCoords()[0];
            sprite.y = obj.getCoords()[1];
            this.#container.addChild(sprite);
            this.#sprites.push([sprite, obj.getId()]);
        }



    }
    updateGameObjects(obj) {
        for (let sprite of this.#sprites) {
            if (sprite[1] == obj.getId()) {
                sprite[0].x = obj.getCoords()[0];
                sprite[0].y = obj.getCoords()[1];
            }
        }
    }
    deleteGameObjects(obj) {
        for (let sprite of this.#sprites) {
            if (sprite[1] == obj.getId()) {
                let index = this.#sprites.indexOf(sprite);
                if (index !== -1) {
                    this.#sprites.splice(index, 1);
                    this.#container.removeChild(sprite[0]);
                }
            }
        }
    }
    clearContainer() {
        for (let i = this.#container.children.length - 1; i >= 0; i--) {
            this.#container.removeChild(this.#container.children[i]);
        };
        this.#sprites = [];
    }
    showEndGameMessage(message = '') {
        const messageContainer = new PIXI.Container();

        const endGameText = new PIXI.Text(message, { fontSize: 60 });
        //endGameText.position.y = this.#pixiApp.screen.height / 2
        endGameText.anchor.x = 0.5;
        endGameText.anchor.y = 0.5;
        messageContainer.x = this.#pixiApp.view.width / 2 - messageContainer.width;
        messageContainer.y = this.#pixiApp.view.height / 2 - messageContainer.height;
        if (message == 'YOU WIN') {
            endGameText.style.fill = 0x00ff00

        }
        if (message == 'YOU LOOSE') {
            endGameText.style.fill = 0xff0000
        }
        messageContainer.addChild(endGameText);
        const pressKeyText = new PIXI.Text('Press [R] to restart', { fontSize: 30 });
        pressKeyText.style.fill = 0xffffff;
        pressKeyText.anchor.x = 0.5;
        pressKeyText.anchor.y = 0.5;
        pressKeyText.y = 100;
        messageContainer.addChild(pressKeyText);



        this.#container.addChild(messageContainer);
    }
    showAmmoCount(count) {
        this.#ammoCountText.text = `Ammo left: ${count}`
        this.#container.addChild(this.#ammoCountText);
    }
}