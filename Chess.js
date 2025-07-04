function move({part,position}, allPieces = []){
const [col, row] = position;
const colLetters="ABCDEFGH";

function isOccupied(pos){
    return allPieces.some(piece => piece.position[0] === pos[0] && piece.position[1] === pos[1]);
}



}