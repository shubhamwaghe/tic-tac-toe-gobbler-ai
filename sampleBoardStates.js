import { executeMove } from './utils/moveUtil.mjs'

function getSampleWinPosition(initialState) {
	currentState = executeMove(initialState, "B:S-OO-A1")
    currentState = executeMove(currentState, "R:M-OO-B1")
    currentState = executeMove(currentState, "B:M-OO-B2")
    currentState = executeMove(currentState, "R:L-OO-C2")
    currentState = executeMove(currentState, "B:L-OO-C3")
    return currentState
}

function getSampleWinInOnePosition(initialState) {
	currentState = executeMove(initialState, "B:S-OO-A1")
    currentState = executeMove(currentState, "R:M-OO-B1")
    currentState = executeMove(currentState, "B:M-OO-B2")
    currentState = executeMove(currentState, "R:L-OO-C2")
    return currentState
}

function getSampleDrawPosition() {

}

function getSampleDrawInOnePosition() {

}

function getSampleLostPosition() {

}

function getSampleLoseInOnePosition() {

}

function getSampleWinInTwoPosition() {

}

export { 
    getSampleWinInOnePosition,
    getSampleWinPosition
}