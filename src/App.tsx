import { useState } from 'react';

export default function Board(){
  // 盤の状態を管理するstate
  const [squares, setSquares] = useState<(string|null)[]>(Array(9).fill(null))
  // Xのターンかどうかを管理するstate
  const [xIsNext, setXIsNext] = useState<boolean>(true)

  // 次のプレーヤーを表示するための処理
  let status: string;
  const winner: string | null = calculateWinner(squares);
  // if (winner) {
  //   status = `Winner: ${winner}`;
  // } else {
  //   status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  // }
  status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  function handleClick(i: number): void {
    // すでに埋まっていたら何もしない、または勝者が決まっていたら何もしない
    if (squares[i] || calculateWinner(squares)) return;

    // ここでsquaresのコピーを作成し、そのコピーを変更している
    // const nextSquares = squares.slice();
    const nextSquares = [...squares];
    // console.log(nextSquares);
    // console.log(squares);
    nextSquares[i] = xIsNext ? 'X' : 'O';
    // console.log(nextSquares);
    // console.log(squares);
    setSquares(nextSquares);
    // console.log(nextSquares);
    // console.log(squares);

    // 次のターンに切り替えるためにプレーヤーを切り替える
    setXIsNext(!xIsNext);
  };

  // 勝者を判定する関数
  function calculateWinner(squares: (string | null)[]): string | null {
    // 勝ちパターン
    const lines = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a,b,c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  return(
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />      
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

// SquareコンポーネントのPropsの型
type SquareProps = {
  value: string | null;
  onSquareClick: () => void;
}

// ひとマスのコンポーネント
function Square({value, onSquareClick}: SquareProps) {
  return <button className="square" onClick={onSquareClick} >{value}</button>
}
