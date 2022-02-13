import { getPlayerGround, getColorFromGround } from './playerUtil.mjs'
import { getPieceFromParsedMove } from './pieceUtil.mjs'
import { getBoardInitialState, deepCopyBoard, addPieceToTopOnBoardSquare, removeTopPieceFromBoardSquare, removePieceFromPlayerGround } from './boardUtil.mjs'

/* Sample Game Move - "B:L-OO-B2" */

/* Sample Parsed Game Move
    {
        "color": "B",
        "size": "L",
        "from": "BLUE_GROUND",
        "to": "B2"
    }
*/
function getParsedGameMove(gameMove) {
    var gameMoveElements = gameMove.split("-")
    return {
        "color": gameMoveElements[0].split(":")[0],
        "size": gameMoveElements[0].split(":")[1],
        "from": gameMoveElements[1] === 'OO' ?
            getPlayerGround(gameMoveElements[0].split(":")[0]) : gameMoveElements[1],
        "to": gameMoveElements[2]
    }
}

/* Sample Compacted Game Move - "B:L-OO-B2" */
function getCompactedGameMove(parsedGameMove) {
    return parsedGameMove["color"]
        .concat(":", parsedGameMove["size"])
        .concat("-", parsedGameMove["from"].includes('GROUND') ?
            'OO' :
            parsedGameMove["from"])
        .concat("-", parsedGameMove["to"])
}

/* Input: piece(BM1), 
          pieceSource(A1, A2, BLUE_GROUND etc.), \
          targetSquare(A1, A2, A3 etc.) \
          playerToMove(B,R)
   Output: compactedGameMove(B:L-OO-A1)
        */
function generateGameMove(piece, pieceSource, targetSquare, playerToMove) {
    return getCompactedGameMove({
        color: playerToMove,
        size: piece[1],
        from: pieceSource,
        to: targetSquare
    })
}

function getSampleWinPosition() {
    return {
        "move": "GAME START",
        "squares": {
            "A3": ["RS1"],
            "B3": ["RM1"],
            "C3": [],
            "A2": ["BS2"],
            "B2": ["BL2"],
            "C2": ["BM2"],
            "A1": [],
            "B1": [],
            "C1": [],
            "RED_GROUND": ["RL1", "RS2", "RM2", "RL2"],
            "BLUE_GROUND": ["BS1", "BM1", "BL1"]
        }
    }
}

/* Sample Parsed Game Move
    {
        "color": "B",
        "size": "L",
        "from": "BLUE_GROUND",
        "to": "B2"
    }
*/

/* Returns the boardState after playing the gameMove.*/
function executeMove(currentState, gameMove) {
    var parsedGameMove = getParsedGameMove(gameMove);
    var playerToMove = parsedGameMove["color"]
    // Add Piece to Board
    var toBoardSquare = parsedGameMove["to"]
    var piece = getPieceFromParsedMove(parsedGameMove)
    var currentState = addPieceToTopOnBoardSquare(currentState, toBoardSquare, piece)
    // Remove Played Piece   
    if (parsedGameMove["from"].includes('GROUND')) {
        currentState = removePieceFromPlayerGround(currentState, playerToMove, piece)
    } else {
        var fromBoardSquare = parsedGameMove["from"]
        currentState = removeTopPieceFromBoardSquare(currentState, fromBoardSquare)
    }
    return currentState
}

export {
    getParsedGameMove,
    getCompactedGameMove,
    getSampleWinPosition,
    executeMove,
    generateGameMove
}