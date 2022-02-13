import chalk from 'chalk';
import crypto from 'crypto-js';
import 'core-js/features/array/at.js';
import checkResult from './helpers/resultCheckHelper.mjs';
import { togglePlayerToMove } from './utils/playerUtil.mjs';
import { getAllValidMoves } from './helpers/validMovesHelper.mjs'
import { getBoardInitialState, deepCopyBoard, addPieceToTopOnBoardSquare, removeTopPieceFromBoardSquare } from './utils/boardUtil.mjs'
import { generateGameMove, getParsedGameMove, executeMove } from './utils/moveUtil.mjs'
import { getPieceFromParsedMove } from './utils/pieceUtil.mjs'
import { getNextBestMove } from './helpers/miniMaxHelper.mjs'

function runMainSimulation() {
    /* Game State Initialisation */
    var stepNumber = 0;
    var gameHistory = [];
    var initialState = getBoardInitialState();
    gameHistory.push(initialState);
    /* Assumption : Blue Plays First */
    var playerToMove = "B";
    var currentState = gameHistory[stepNumber];

    // Global Variable - Per Run
    var gameStateHashMap = {};
    var gameStatsMap = {
        "B": 0,
        "R": 0,
        "D": 0,
        "NO_RESULT": 0
    };


    console.log(getNextBestMove(currentState, playerToMove, { 
        depth: 0, 
        gameStateHashMap: gameStateHashMap,  
        gameStatsMap: gameStatsMap,  
    }));

    console.log(chalk.green("Game States Evaluated: ", Object.keys(gameStateHashMap).length));
    console.log("Game Stats: ", gameStatsMap);

    // console.log("Game State Hashes: ", gameStateHashMap);

    // for (var gameMove in validMoves) {
    //     var nextState = getNextStateOnMoveExecution(currentState, gameMove);
    //     console.log(calculateWinner(nextState["squares"]));
    // }
    // while (checkResult(currentState["squares"]) === 'GAME_NOT_OVER') {

    // }
}

/* #################################
 * Execute Main Driver Function */
console.log(chalk.yellow.bold("TIC-TAC-TOE-GOBBLER : PROGRAM START"));
runMainSimulation();
console.log(chalk.yellow.bold("TIC-TAC-TOE-GOBBLER : PROGRAM END"));