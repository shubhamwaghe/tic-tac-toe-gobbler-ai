import checkResult from './resultCheckHelper.mjs'
import { deepCopyBoard } from '../utils/boardUtil.mjs'
import { getAllValidMoves } from './validMovesHelper.mjs'
import { executeMove } from '../utils/moveUtil.mjs'

function miniMaxParameters() {
    return {
        "depthLimit": 10,
        "blueWinPoints": 100,
        "RedWinPoints": -100,
        "drawPoints": 0,
        "defaultPoints": 0
    }
}

function miniMax(board, player, depth = 0) {
    var depthLimit = miniMaxParameters()["depthLimit"]
    // console.log("--------------------")
    // console.log("board", board, "player", player, "depth", depth, "depthLimit", depthLimit)
    // console.log("--------------------")
    if (depth >= depthLimit)
        return heuristic(board);
    if (player === 'B')
        return maximizer(board, depth, player);
    else
        return minimizer(board, depth, player);
}

function maximizer(board, depth, player) {
    // console.log("***********")
    // console.log("maximizer")
    // console.log("***********")
    let movesList = getAllValidMoves(board, player);
    let bestMove;
    var bestMoveScore = Number.NEGATIVE_INFINITY;
    // -INFINITY because first move will always be more
    for (let i = 0; i < movesList.length; i++) {
      let movedBoard = executeMove(deepCopyBoard(board), movesList[i]);
      let moveScore = miniMax(movedBoard, 'R', depth + 1);
      if (moveScore >= bestMoveScore) {
          bestMove = movesList[i];
          bestMoveScore = moveScore;
      }
    }
    if (depth === 0)
      var bestMoveStore = bestMove; 
    return bestMoveStore

}


function minimizer(board, depth, player) {
    // console.log("***********")
    // console.log("minimizer")
    // console.log("***********")
    let movesList = getAllValidMoves(board, player);
    let bestMove;
    var bestMoveScore = Number.POSITIVE_INFINITY;
    // +INFINITY because the first score will always be less
    for (let i = 0; i < movesList.length; i++) {
        let movedBoard = executeMove(deepCopyBoard(board), movesList[i]);
        let moveScore = miniMax(movedBoard, 'B', depth + 1);
        if (moveScore <= bestMoveScore) {
            bestMove = movesList[i];
            bestMoveScore = moveScore;
        }
    }
    if (depth === 0)
        var bestMoveStore = bestMove;
    return bestMoveStore
}

function heuristic(currentState, playerToMove) {
    var result = checkResult(currentState["squares"])
    switch (result) {
        case "B":
            return miniMaxParameters()["blueWinPoints"]
        case "R":
            return miniMaxParameters()["redWinPoints"]
        case "D":
            return miniMaxParameters()["drawPoints"]
        default:
            return miniMaxParameters()["defaultPoints"]
    }
}

export { miniMax }