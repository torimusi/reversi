const stage = document.getElementById("stage");
const squareTemplate = document.getElementById("square-template");
const stoneStateList = [];

/* 反転可能な石の番号を返す */ 
let currentColor = 1;
const getReversibleStones = (idx) => {

    // クリックしたマスから見て、周囲8方向にマスがいくつあるかあらかじめ計算する
    const squareNums = [
        7 - (idx % 8),
        Math.min(7 - (idx % 8), (56 + (idx % 8) - idx) / 8),
        (56 + (idx % 8) - idx) / 8,
        Math.min(idx % 8, (56 + (idx % 8) - idx) / 8),
        idx % 8,
        Math.min(idx % 8, (idx - (idx % 8)) / 8),
        (idx - (idx % 8)) / 8,
        Math.min(7 - (idx % 8), (idx - (idx % 8)) / 8),
    ];

    // for文ループの方向を定めるためのパラメータ定義
    // 周囲8マスの石とのindexの差
    const parameters = [1, 9, 8, 7, -1, -9, -8, -7];

    // 反転可能が確定した石の番号を入れる配列
    let results = [];

    // 周囲8方向を走査する
    for (let i = 0; i < 8; i++) {

        // 反転可能性のある石の番号を入れる配列（仮ボックス）
        const box = [];

        // 現在調べている方向にいくつマスがあるか
        const squareNum = squareNums[i];
        const param = parameters[i];

        // 現在調べている方向にひとつ隣の石の状態
        const nextStoneState = stoneStateList[idx + param];

        // 隣に石があるか および 隣の石が相手の色かを判定
        if (nextStoneState === 0 || nextStoneState === currentColor) continue;
        box.push(idx + param); // 隣の石の番号を仮ボックスに格納

        // 隣の石の先の石が反転可能か判定
        for (let j = 0; j < squareNum - 1; j++) {
            const targetIdx = idx + param * 2 + param * j;
            const targetColor = stoneStateList[targetIdx];

            // さらに隣に石があるか
            if (targetColor === 0) continue;

            // さらに隣にある石が相手の色か
            if (targetColor === currentColor) {
                // 自分の色なら仮ボックスの石が反転可能であることが確定
                results - results.concat(box);
                break;
            } else {
                // 相手の色なら仮ボックスにその石の番号を格納
                box.push(targetIdx);
            }
        }
    }

    // 反転可能と確定した石の番号を戻り値にする
    return results;
};

/* マスをクリックした時 */
const onClickSquare = (index) => {
    // console.log(index)
    if (stoneStateList[index] !== 0) {
        alert("すでに石が置かれています");
        return;
    }
}

/* 初期盤面を表示 */ 
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

        stone.setAttribute("data-index", i); // インデックス番号をHTML要素に保持させる
        stoneStateList.push(defaultState); // 初期値を配列に格納

        square.addEventListener('click', () => {
            onClickSquare(i);
        })
    }
};

window.onload = () => {
    createSquares();
};