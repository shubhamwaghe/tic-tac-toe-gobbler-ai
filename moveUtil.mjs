/* Retuns List of Valid Moves - Follows The Game Notation */
function getValidMoves(currentState, playerToMove) {

    const PIECES_LIST = {
        "B": new Set(["BS1", "BM1", "BL1", "BS2", "BM2", "BL2"]),
        "R": new Set(["RS1", "RM1", "RL1", "RS2", "RM2", "RL2"])
    }

    return ["B:L-OO-B2"];

}

function getNextStateOnMoveExecution(currentState, gameMove) {
    // TODO : Comment-Out the following : 
    // return getSampleWinPosition();

    var parsedGameMove = getParsedGameMove(gameMove);

    // TODO: Compute the actual execution logic of `parsedGameMove` on `currentState`

    return {
        "move": "GAME START",
        "squares": { 
            "A3" : [], "B3" : [], "C3" : [],
            "A2" : [], "B2" : ["BL2"], "C2" : [],
            "A1" : [], "B1" : [], "C1" : [],
            "RED_GROUND": ["RS1", "RM1", "RL1", "RS2", "RM2", "RL2"],
            "BLUE_GROUND": ["BS1", "BM1", "BL1", "BS2", "BM2"]
        }
    }
}

/* Sample Game Move - "B:L-OO-B2" */
function getParsedGameMove(){
    return {
        "color": "B",
        "size": "L",
        "from": "BLUE_GROUND",
        "to": "B2"
    }

}

function getSampleWinPosition() {
    return {
        "move": "GAME START",
        "squares": { 
            "A3" : ["RS1"], "B3" : ["RM1"], "C3" : [],
            "A2" : ["BS2"], "B2" : ["BL2"], "C2" : ["BM2"],
            "A1" : [], "B1" : [], "C1" : [],
            "RED_GROUND": ["RL1", "RS2", "RM2", "RL2"],
            "BLUE_GROUND": ["BS1", "BM1", "BL1"]
        }
    }
}

export { getValidMoves, getNextStateOnMoveExecution }
