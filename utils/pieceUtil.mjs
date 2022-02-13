import { getPlayerGround } from './playerUtil.mjs';

function getPlayerGroundPieces(currentState, playerToMove) {
    var ground = getPlayerGround(playerToMove)
    return currentState["squares"][ground]
}

function getParsedPiece(piece) {
    return {
        "pieceColor": piece[0],
        "pieceSize": piece[1],
        "pieceSizeScore": getPieceSizeScore(piece[1])
    }
}

function getPieceFromParsedMove(parsedGameMove) {
    return parsedGameMove["color"] + parsedGameMove["size"]
}

/* Input: BL, RS, BM etc. */
/* Output: SMALL, MEDIUM, LARGE */
function getPieceSize(piece) {
    switch (piece[1]) {
        case "S":
            return "SMALL";
        case "M":
            return "MEDIUM";
        case "L":
            return "LARGE";
        default:
            return null; // This cannot happen
    }
}

/* Input : 'S', 'M', 'L' */
/* Output: 0,1,2 */
function getPieceSizeScore(pieceSize) {
    switch (pieceSize) {
        case "S":
            return 0;
        case "M":
            return 1;
        case "L":
            return 2;
        default:
            return null; // This cannot happen
    }
}
export {
    getPlayerGroundPieces,
    getPieceSize,
    getPieceSizeScore,
    getParsedPiece,
    getPieceFromParsedMove
}
