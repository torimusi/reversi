const stage = document.getElementById("stage");
const squareTemplate = document.getElementById("square-template");

const createSquares = () => {
    for (let i = 0; i < 64; i++) {
        const square = squareTemplate.cloneNode(true); // テンプレートから要素をクローン
        square.removeAttribute("id"); // テンプレート用のid属性を削除
        stage.appendChild(square); // マス目のHTML要素を盤に追加

        const stone = square.querySelector('.stone');

        // iの値によってデフォルトの石の状態を分岐する
        let defaultState;
        if (i == 27 || i == 36) {
            defaultState = 1;
        } else if (i == 28 || i == 35) {
            defaultState = 2;
        } else {
            defaultState = 0;
        }

        stone.setAttribute("data-state", defaultState);
    }
};

window.onload = () => {
    createSquares();
};