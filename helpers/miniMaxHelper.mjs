import checkResult from './resultCheckHelper.mjs'
import { deepCopyBoard } from '../utils/boardUtil.mjs'
import { getAllValidMoves } from './validMovesHelper.mjs'
import { executeMove } from '../utils/moveUtil.mjs'

function miniMaxParameters() {
    return {
        "depthLimit": 3,
        "blueWinPoints": 100,
        "redWinPoints": -100,
        "drawPoints": 0,
        "defaultPoints": 0
    }
}

function getNextBestMove(board, player, { depth, gameStateHashMap, gameStatsMap }) {
    var depthLimit = miniMaxParameters()["depthLimit"];
    if (depth >= depthLimit) {
        return {
            score: heuristic(board, gameStateHashMap, gameStatsMap)
        }
    }
    if (player === 'B') {
        return maximizer(board, player, { 
            depth: depth, 
            gameStateHashMap: gameStateHashMap, 
            gameStatsMap: gameStatsMap 
        });
    } else {
        return minimizer(board, player, { 
            depth: depth, 
            gameStateHashMap: gameStateHashMap, 
            gameStatsMap: gameStatsMap 
        });
    }
}

function maximizer(board, player, { depth, gameStateHashMap, gameStatsMap }) {
    let movesList = getAllValidMoves(board, player);
    let bestMove;

    // console.log(depth, movesList);

    var bestMoveScore = Number.NEGATIVE_INFINITY;
    // -INFINITY because first move will always be more
    for (let i = 0; i < movesList.length; i++) {
      let movedBoard = executeMove(deepCopyBoard(board), movesList[i]);
      var bestMoveData = getNextBestMove(movedBoard, 'R', { depth: depth + 1, gameStateHashMap: gameStateHashMap, gameStatsMap: gameStatsMap });
      // console.log(bestMoveData);
      var moveScore = bestMoveData.score;
      if (moveScore >= bestMoveScore) {
          bestMove = movesList[i];
          bestMoveScore = moveScore;
      }
    }
    if (depth === 0) {
      var bestMoveStore = bestMove; 
    }
    return { 
        move: bestMove,
        score: bestMoveScore
    }
}


function minimizer(board, player, { depth, gameStateHashMap, gameStatsMap }) {
    let movesList = getAllValidMoves(board, player);
    let bestMove;
    var bestMoveScore = Number.POSITIVE_INFINITY;
    // +INFINITY because the first score will always be less
    for (let i = 0; i < movesList.length; i++) {
        let movedBoard = executeMove(deepCopyBoard(board), movesList[i]);
        var bestMoveData = getNextBestMove(movedBoard, 'B', { depth: depth + 1, gameStateHashMap: gameStateHashMap, gameStatsMap: gameStatsMap });
        // console.log(bestMoveData);
        var moveScore = bestMoveData.score;
        if (moveScore <= bestMoveScore) {
            bestMove = movesList[i];
            bestMoveScore = moveScore;
        }
    }
    if (depth === 0) {
        var bestMoveStore = bestMove;
    }
    return { 
        move: bestMove,
        score: bestMoveScore
    }
}

function heuristic(currentState, gameStateHashMap, gameStatsMap) {
    var result = checkResult(currentState["squares"], gameStateHashMap, gameStatsMap);
    switch (result) {
        case "B":
            return miniMaxParameters()["blueWinPoints"];
        case "R":
            return miniMaxParameters()["redWinPoints"];
        case "D":
            return miniMaxParameters()["drawPoints"];
        default:
            return miniMaxParameters()["defaultPoints"];
    }
}

export { getNextBestMove }
