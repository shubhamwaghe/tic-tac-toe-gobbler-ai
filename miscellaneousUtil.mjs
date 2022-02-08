/* Miscellaneous Helper Functions */

function togglePlayerToMove(currentPlayerColor) {
    switch(currentPlayerColor) {
        case "B": return "R";
        case "R": return "B";

        default: return null; // This cannot happen
    }
}

export { togglePlayerToMove }