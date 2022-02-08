import chalk from 'chalk';
import 'core-js/features/array/at.js';
import calculateWinner from './winnerCheckUtil.mjs';
import { getValidMoves, getNextStateOnMoveExecution } from './moveUtil.mjs';
import { togglePlayerToMove } from './miscellaneousUtil.mjs';

function runMainSimulation() {
    /* Game State Initialisation */
    var stepNumber = 0;
    var gameHistory = [];

    var initialState = getInitialState();
    gameHistory.push(initialState);

    /* Assumption : Blue Plays First */
    var playerToMove = "B";

    console.log(calculateWinner(initialState["squares"]));

    var currentState = gameHistory[stepNumber];
    var validMoves = getValidMoves(currentState, playerToMove);
    for (var gameMove in validMoves) {
        var nextState = getNextStateOnMoveExecution(currentState, gameMove);
        console.log(calculateWinner(nextState["squares"]));
    }

}

/* #################################
 * Execute Main Driver Function */
console.log(chalk.yellow.bold("TIC-TAC-TOE-GOBBLER : PROGRAM START"));
runMainSimulation();
console.log(chalk.yellow.bold("TIC-TAC-TOE-GOBBLER : PROGRAM END"));

/* ################################# */

function getInitialState() {
    return {
        "move": "GAME START",
        "squares": { 
            "A3" : [], "B3" : [], "C3" : [],
            "A2" : [], "B2" : [], "C2" : [],
            "A1" : [], "B1" : [], "C1" : [],
            "RED_GROUND": ["RS1", "RM1", "RL1", "RS2", "RM2", "RL2"],
            "BLUE_GROUND": ["BS1", "BM1", "BL1", "BS2", "BM2", "BL2"]
        }
    }
}