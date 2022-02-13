import chalk from 'chalk';
import 'core-js/features/array/at.js';
import checkResult from './helpers/resultCheckHelper.mjs';
import { togglePlayerToMove } from './utils/playerUtil.mjs';
import { getAllValidMoves } from './helpers/validMovesHelper.mjs'
import { getBoardInitialState, deepCopyBoard, addPieceToTopOnBoardSquare, removeTopPieceFromBoardSquare } from './utils/boardUtil.mjs'
import { generateGameMove, getParsedGameMove, executeMove } from './utils/moveUtil.mjs'
import { getPieceFromParsedMove } from './utils/pieceUtil.mjs'
import { miniMax } from './helpers/miniMaxHelper.mjs'

function runMainSimulation() {
    /* Game State Initialisation */
    var stepNumber = 0;
    var gameHistory = [];
    var initialState = getBoardInitialState();
    gameHistory.push(initialState);
    /* Assumption : Blue Plays First */
    var playerToMove = "B";
    var currentState = gameHistory[stepNumber];
    var validMoves = getAllValidMoves(currentState, playerToMove);
    // console.log(gameHistory.at(-1))
    // console.log(validMoves)
    // console.log(checkResult(currentState["squares"]))
    // console.log(deepCopyBoard(currentState))
    // console.log(currentState)
    console.log(miniMax(currentState, playerToMove))
    // console.log(executeMove(currentState, "B:S-OO-A1"))
    // console.log(executeMove(currentState, "R:L-OO-C3"))
    // console.log(executeMove(currentState, "B:L-OO-A3"))
    // console.log(executeMove(currentState, "R:M-OO-A2"))
    // console.log(executeMove(currentState, "B:L-OO-B2"))
    // console.log(executeMove(currentState, "R:L-OO-C1"))
    // console.log(executeMove(currentState, "B:M-OO-C2"))
    // console.log(executeMove(currentState, "R:L-C3-C2"))
    // console.log(executeMove(currentState, "B:S-OO-B1"))
    // console.log(executeMove(currentState, "R:L-C2-B1"))

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