import { Game } from './Game.js'
export class GameInput {
    #pixiApp;
    #game;
    #ticker;
    #gameParams;
    #gameLoop;
    #shipControlListener;
    #pauseControlListenre;
    #restartControlListener;
    constructor(app, gameParams, ticker) {
        this.#pixiApp = app;
        this.#ticker = ticker;

        this.#gameParams = gameParams;
        //this.createGame(gameParams);
        this.#gameLoop = () => {
            if (this.#game.gameLoop()) {
                this.#ticker.stop()
                document.removeEventListener('keydown', this.#shipControlListener);
                document.addEventListener('keydown', this.#restartControlListener);
            };
        }
        this.#shipControlListener =
            (e) => {
                switch (e.keyCode) {
                    // case 27: this.pauseGame();
                    //     break
                    case 32: this.#game.firePlayer();
                        break
                    case 65: this.#game.movePlayer([-1, 0]);
                        break
                    case 68: this.#game.movePlayer([1, 0]);


                }
            }
        this.#restartControlListener =
            (e) => {
                switch (e.keyCode) {
                    case 82:
                        this.deleteGame();
                        this.createGame();
                        this.startGame();
                }
            }


        document.addEventListener('keyup', (e) => {
            switch (e.keyCode) {
                case 65: this.#game.movePlayer([0, 0]);
                    break
                case 68: this.#game.movePlayer([0, 0]);

            }
        })
    }
    createGame() {
        this.#ticker.add(this.#gameLoop);
        this.#game = new Game(
            this.#gameParams.enemiesRepository,
            this.#gameParams.bulletsRepository,
            this.#gameParams.gameConfig,
            this.#gameParams.gameService,
            this.#gameParams.output
        );


        // let gameParams = {
        //     enemiesRepository: EnemiesRepository.getInstance(),
        //     bulletsRepository: BulletsRepository.getInstance(),
        //     gameConfig: gameConfig,
        //     gameService: new GameService(new EnemiesFactory(), ccChecker),
        //     output: new GameOutput(app)
        // }
    }
    startGame() {
        document.removeEventListener('keydown', this.#restartControlListener);
        document.addEventListener('keydown', this.#shipControlListener)
        this.#game.startGame();
        this.#ticker.start();
    }
    pauseGame() {

        if (this.#game.pauseGame()) {
            this.#ticker.stop()
        } else {
            this.#ticker.start()
        }
    }
    deleteGame() {
        this.#ticker.remove(this.#gameLoop);
        this.#game.endGame();
        this.#ticker.stop();
        this.#game = '';
    }
}