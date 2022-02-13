import { getParsedPiece } from './pieceUtil.mjs'
import { getPlayerGround, getColorFromGround } from './playerUtil.mjs'

function getBoardInitialState() {
    return {
        "move": "GAME START",
        "squares": {
            "A3": [], "B3": [], "C3": [],
            "A2": [], "B2": [], "C2": [],
            "A1": [], "B1": [], "C1": [], 
            "RED_GROUND":  ["RS", "RM", "RL", "RS", "RM", "RL"],
            "BLUE_GROUND": ["BS", "BM", "BL", "BS", "BM", "BL"]
        }
    }
}

function getBoardSquaresList() {
    return [
        'A3', 'B3', 'C3',
        'A2', 'B2', 'C2',
        'A1', 'B1', 'C1'
    ]
}

function getAdjacentBoardSquares(boardSquare) {
    switch (boardSquare) {
        case "A1":
            return ['A2', 'B1', 'B2'];
        case "A2":
            return ['A1', 'A3', 'B1', 'B2', 'B3'];
        case "A3":
            return ['A2', 'B2', 'B3'];
        case "B1":
            return ['A1', 'A2', 'B2', 'C1', 'C2'];
        case "B2":
            return ['A1', 'A2', 'A3', 'B1', 'B3', 'C1', 'C2', 'C3'];
        case "B3":
            return ['A2', 'A3', 'B2', 'C2', 'C3'];
        case "C1":
            return ['B1', 'B2', 'C2'];
        case "C2":
            return ['B1', 'B2', 'B3', 'C1', 'C3'];
        case "C3":
            return ['B2', 'B3', 'C2'];
        default:
            return null; // This cannot happen
    }
}

/* returns a copy of the board without changing the actual board */
function deepCopyBoard(board) {
    const cloneBoard = JSON.parse(JSON.stringify(board));
    return cloneBoard
}

/* returns a list of pieces on given board square. */
function getPiecesOnBoardSquare(board, boardSquare) {
    return board["squares"][boardSquare]
}

/* returns piece on top for a given board square */
function getTopPiece(board, boardSquare) {
    return getPiecesOnBoardSquare(board, boardSquare).at(-1)
}

/* 
    Returns list of all squares where the pieces
     on top belong to player to move
*/
function getSquaresWithPlayerPiecesOnTop(board, playerToMove) {
    var squaresWithPlayerPiecesOnTop = []
    for (var boardSquare of getBoardSquaresList()) {
        var piecesOnBoardSquare = getPiecesOnBoardSquare(board, boardSquare)
        if ((piecesOnBoardSquare.length != 0) &&
            (topPieceBelongsToPlayer(piecesOnBoardSquare, playerToMove))) {
            squaresWithPlayerPiecesOnTop.push(boardSquare)
        }
    }
    return squaresWithPlayerPiecesOnTop
}

/* Returns Updated Current State */
function removeTopPieceFromBoardSquare(board, boardSquare) {
    board["squares"][boardSquare].pop()
    return board
}

/* Returns Updated Current State */
function addPieceToTopOnBoardSquare(board, boardSquare, piece) {
    board["squares"][boardSquare].push(piece)
    return board
}

function removePieceFromPlayerGround(board, playerToMove, piece) {
    var playerGround = board["squares"][getPlayerGround(playerToMove)]
    var index = playerGround.indexOf(piece);
    if (index !== -1) {
        playerGround.splice(index, 1);
    }
    return board
}

function topPieceBelongsToPlayer(piecesOnBoardSquare, playerToMove) {
    return getParsedPiece(piecesOnBoardSquare.at(-1))["pieceColor"] === playerToMove ?
        true :
        false
}

export {
    getBoardInitialState,
    getBoardSquaresList,
    getAdjacentBoardSquares,
    getSquaresWithPlayerPiecesOnTop,
    getTopPiece,
    deepCopyBoard,
    removeTopPieceFromBoardSquare,
    addPieceToTopOnBoardSquare,
    removePieceFromPlayerGround
}