function togglePlayerToMove(currentPlayerColor) {
    switch (currentPlayerColor) {
        case "B":
            return "R";
        case "R":
            return "B";
        default:
            return null; // This cannot happen
    }
}

function getPlayerGround(currentPlayerColor) {
    switch (currentPlayerColor) {
        case "B":
            return "BLUE_GROUND";
        case "R":
            return "RED_GROUND";
        default:
            return null; // This cannot happen
    }
}

function getColorFromGround(playerGround) {
    switch (playerGround) {
        case "BLUE_GROUND":
            return "B";
        case "RED_GROUND":
            return "R";
        default:
            return null; // This cannot happen
    }
}
export { togglePlayerToMove, getPlayerGround, getColorFromGround }