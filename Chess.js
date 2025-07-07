function table() {
    const colLetters = "ABCDEFGH";
    const table = [];
    for (let row = 1; row <= 8; row++) {
        for (let col = 0; col < colLetters.length; col++) { // Corregido
            table.push([colLetters[col], row]);
        }
    }
    return table;
}
const tableData = table();

function move({ part, position, color }, allPieces = []) { // Corregido
    const [col, row] = position;
    const colLetters = "ABCDEFGH";

    // Converce letter in number to move in columns
    const colIndex = colLetters.indexOf(col);
    let moves = [];
    const promotionChoices = ["queen", "rook", "bishop", "horse"];

    //Piece in this position
    function isOccupied(pos) {
        return allPieces.some(piece => piece.position[0] === pos[0] && piece.position[1] === pos[1]);
    }

    //Search enemies pieces
    function enemiesPieces(pos, color) {
        const target = allPieces.find(p => p.position[0] === pos[0] && p.position[1] === pos[1]);
        return target && target.color !== color;
    }

    //Pawn movement
    if (part === "pawn") {
        const direction = color === "white" ? 1 : -1;
        const starRow = color === "white" ? 2 : 7;
        const lastRow = color === "white" ? 8 : 1;

        const oneStep = [col, row + direction];
        // Check if the next step is not occupied
        if (!isOccupied(oneStep)) {
            if (oneStep[1] === lastRow) {
                for (let option of promotionChoices) {
                    moves.push({ position: oneStep, promotion: option });
                }
            } else {
                moves.push(oneStep);
            }
        }

        //first move double step
        if (row === starRow) {
            const twoSteps = [col, row + 2 * direction];
            if (!isOccupied(twoSteps)) {
                moves.push(twoSteps);
            }
        }

        //eat diagonal
        const eatleft = [colLetters[colIndex - 1], row + direction];
        const eatRight = [colLetters[colIndex + 1], row + direction];
        if (colIndex - 1 >= 0 && enemiesPieces(eatleft, color)) {
            moves.push(eatleft);
        }
        if (colIndex + 1 < colLetters.length && enemiesPieces(eatRight, color)) {
            moves.push(eatRight);
        }
    }
    //horse movement
    if (part === "horse") {
        const horeseMoves = [
            [colIndex + 1, row + 2],
            [colIndex + 2, row + 1],
            [colIndex + 2, row - 1],
            [colIndex + 1, row - 2],
            [colIndex - 1, row - 2],
            [colIndex - 2, row - 1],
            [colIndex - 2, row + 1],
            [colIndex - 1, row + 2],
        ];
        for (let [c, r] of horeseMoves) {
            if (c >= 0 && c < colLetters.length && r >= 1 && r <= 8) {
                const movePosition = [colLetters[c], r];
                if (!isOccupied(movePosition) || enemiesPieces(movePosition, color)) {
                    moves.push(movePosition);
                }
            }
        }
    }

    return moves;
}

const pices = [
    { part: "pawn", position: ["A", 2], color: "white" },
    { part: "pawn", position: ["B", 2], color: "white" },
    { part: "pawn", position: ["C", 2], color: "white" }, // Corregido espacio extra
];

console.log(move({ part: "pawn", position: ["A", 2], color: "white" }, pices));
console.log(move({ part: "horse", position: ["B", 1], color: "white" }, pices));