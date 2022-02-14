import { getPlayerGroundPieces, getPieceSizeScore } from './../utils/pieceUtil.mjs';
import {
    getBoardInitialState,
    getBoardSquaresList,
    getSquaresWithPlayerPiecesOnTop,
    getAdjacentBoardSquares,
    getTopPiece
} from './../utils/boardUtil.mjs'
import checkResult from './resultCheckHelper.mjs'
import { generateGameMove, getParsedGameMove } from './../utils/moveUtil.mjs'
import { getPlayerGround } from './../utils/playerUtil.mjs';

/* Retuns List of Valid Moves - Follows The Game Notation */
function getAllValidMoves(currentState, playerToMove) {
    // No valid moves, If game is already over.
    if (checkResult(currentState["squares"]) != "NO_RESULT") { 
        return []
    }
    return getGroundToBoardValidMoves(currentState, playerToMove)
        .concat(getBoardToBoardValidMoves(currentState, playerToMove));
}

/* Returns Valid Moves Where piece source is Ground
    New Piece from ground to Board
*/
function getGroundToBoardValidMoves(currentState, playerToMove) {
    var validMoves = new Set();
    var pieceSource = getPlayerGround(playerToMove);
    for (var availablePiece of getPlayerGroundPieces(currentState, playerToMove)) {
        for (var targetSquare of getBoardSquaresList()) {
            var gameMove = generateGameMove(availablePiece, pieceSource, targetSquare, playerToMove);
            if (isValidMove(currentState, getParsedGameMove(gameMove))) {
                validMoves.add(gameMove);
            }
        }
    }
    return Array.from(validMoves);
}

/* Returns Valid Moves Where piece source is Board 
    InBoard piece movement
*/
function getBoardToBoardValidMoves(currentState, playerToMove) {
    var validMoves = new Set();
    for (var boardSqaure of getSquaresWithPlayerPiecesOnTop(currentState, playerToMove)) {
        for (var adjacentSquares of getAdjacentBoardSquares(boardSqaure)) {
            var gameMove = generateGameMove(getTopPiece(currentState, boardSqaure), boardSqaure, adjacentSquares, playerToMove);
            if (isValidMove(currentState, getParsedGameMove(gameMove))) {
                validMoves.add(gameMove);
            }
        }
    }
    return Array.from(validMoves);
}

/* Checks if a given gameMove is Valid or Not */
function isValidMove(currentState, parsedGameMove) {
    var targetSquare = currentState["squares"][parsedGameMove["to"]];
    if (isTargetSquareEmpty(targetSquare)) {
        return true;
    } else if (isCurrentPieceBiggerThanTopPiece(targetSquare, parsedGameMove)) {
        return true;
    } else {
        return false;
    }
}

function isTargetSquareEmpty(targetSquare) {
    return targetSquare.length === 0 ? true : false;
}

function isCurrentPieceBiggerThanTopPiece(targetSquare, parsedGameMove) {
    var topPiece = targetSquare.at(-1);
    var topPieceSize = getPieceSizeScore(topPiece[1]);
    var currentPieceSize = getPieceSizeScore(parsedGameMove["size"]);
    return (currentPieceSize > topPieceSize) ? true : false;
}

export { getAllValidMoves, isValidMove }
