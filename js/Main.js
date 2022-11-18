import { CircleToCircleChecker } from './CollisionCheckers/CircleToCircleChecker.js'
import { RectToCircleChecker } from './CollisionCheckers/RectToCircleChecker.js'
import { RectToRectChecker } from './CollisionCheckers/RectToRectChecker.js'
import { GameService } from './GameService.js'
import { EnemiesFactory } from './EnemiesFactory.js'
import { gameConfig } from './config.js'
import { Game } from './Game.js'
import { EnemiesRepository } from './EnemiesRepository.js'
import { BulletsRepository } from './BulletsRepository.js'
import { GameOutput } from './GameOutput.js'
import { GameInput } from './GameInput.js'
//import { Loader } from 'resource-loader';


const app = new PIXI.Application({ width: gameConfig.worldConfig.width, height: gameConfig.worldConfig.height });
//const loader = new Loader();
let ccChecker = new CircleToCircleChecker();
ccChecker.setNext(new RectToCircleChecker()).setNext(new RectToRectChecker());
//let game = new Game(EnemiesRepository.getInstance(), BulletsRepository.getInstance(), gameConfig, new GameService(new EnemiesFactory(), ccChecker), new GameOutput(app));
let gameParams = {
    enemiesRepository: EnemiesRepository.getInstance(),
    bulletsRepository: BulletsRepository.getInstance(),
    gameConfig: gameConfig,
    gameService: new GameService(new EnemiesFactory(), ccChecker),
    output: new GameOutput(app)
}
//game.startGame();
let ticker = PIXI.Ticker.shared;
ticker.autoStart = false;

let input = new GameInput(app, gameParams, ticker);
input.createGame();
input.startGame();
