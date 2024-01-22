import { useState } from "react";

/* eslint-disable react/prop-types */
function Square({ value, squareClick }) {

  return (
    <button
      className="h-20 w-20 border rounded-md m-1 border-gray-400 bg-white leading-9 text-2xl"
      onClick={squareClick}
    >
      {value}
    </button>
  )
}

function Board({squares, next, onPlay}) {

  const winner = calculateWinner(squares);
  const notAllFilled = squares.includes(null)
  let status;

  if (winner) {
    status = `winner: ${winner}`
  } else {
    if (notAllFilled) {
      status = `Next player: ${next}`
    } else {
      status = `Drawn`
    }
  }

  function handleClick(i) {
    const nextSquares = squares.slice();
    if (nextSquares[i] || winner) return;
    nextSquares[i] = next
    onPlay(nextSquares)
  }
  return (
    <>
      <div className="p-2 font-medium text-lg">{status}</div>
      <div className="flex">
        <Square value={squares[0]} squareClick={() => handleClick(0)} />
        <Square value={squares[1]} squareClick={() => handleClick(1)} />
        <Square value={squares[2]} squareClick={() => handleClick(2)} />
      </div>
      <div className="flex">
        <Square value={squares[3]} squareClick={() => handleClick(3)} />
        <Square value={squares[4]} squareClick={() => handleClick(4)} />
        <Square value={squares[5]} squareClick={() => handleClick(5)} />
      </div>
      <div className="flex">
        <Square value={squares[6]} squareClick={() => handleClick(6)} />
        <Square value={squares[7]} squareClick={() => handleClick(7)} />
        <Square value={squares[8]} squareClick={() => handleClick(8)} />
      </div>

    </>
  )
}

function calculateWinner(square) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]

    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      return square[a];
    }
  }
  return null
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [next, setNext] = useState('X')
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    setNext(next === 'X' ? 'O' : 'X')
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(move) {
    setCurrentMove(move)
    setNext(move % 2 === 0 ? 'X' : 'O')
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to the move: #${move}`
    } else {
      description = `Go to start the game`
    }

    return (
      <li key={move} className="rounded-lg bg-slate-800 text-white p-3 my-3">
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })
  return (
    <div className="flex p-4 justify-center">
      <div className="mr-16">
        <Board
          next={next}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div>
        <ol className="border border-gray-300 p-4 rounded-lg">
          {moves}
        </ol>
      </div>
    </div>
  )
}