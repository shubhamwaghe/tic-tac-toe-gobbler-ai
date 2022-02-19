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
import * as boardStates from './sampleBoardStates.js'

function runMainSimulation() {
    /* Game State Initialisation */
    var stepNumber = 0;
    var gameHistory = [];
    var initialState = getBoardInitialState();
    gameHistory.push(initialState);
    /* Assumption : Blue Plays First */
    var playerToMove = "B";
    var currentState = gameHistory[stepNumber];
    // Setup Board
    // currentState = executeMove(initialState, "B:M-OO-B2")
    // currentState = executeMove(currentState, "R:S-OO-B1")
    // currentState = executeMove(currentState, "B:M-OO-C3")
    // currentState = executeMove(currentState, "R:L-OO-A3")
    // currentState = executeMove(currentState, "B:L-OO-A3")
    currentState = boardStates.getSampleWinInOnePosition(currentState)

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

    console.log(chalk.green("Unique Game States Evaluated: ", Object.keys(gameStateHashMap).length));
    console.log("Game Stats: ", gameStatsMap);
    // var fs = require('fs');
    // fs.writeFile("test.txt", gameStateHashMap, function(err) {
    // if (err) {
    //     console.log(err);
    // }
    // });
    // const size = new TextEncoder().encode(JSON.stringify(gameStateHashMap)).length
    // const kiloBytes = size / 1024;
    // const megaBytes = kiloBytes / 1024;
    // console.log(JSON.stringify(gameStateHashMap));
    // console.log(Object.values(gameStateHashMap).reduce((a, b) => a + b, 0))
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



