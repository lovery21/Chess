function move({part,position}, allPieces = []){
const [col, row] = position;
const colLetters="ABCDEFGH";
//Piece in this position
function isOccupied(pos){
    return allPieces.some(piece => piece.position[0] === pos[0] && piece.position[1] === pos[1]);
}

    //Search enemies pieces
    function enemiesPieces(pos, color){
const target=allPieces.find(p=>p.position[0] === pos[0] && p.position[1] === pos[1]);
return target && target.color !==color;

    }

      // Convertir letra en número para movernos en columnas
    const colIndex=collIndexOf(col);
    let moves=[];

    //Pawn movement
    if(part === "pawn"){
        const oneStep=[col,row+1];
        if(!isOccupied(oneStep)){
            moves.push(oneStep);
        }
}