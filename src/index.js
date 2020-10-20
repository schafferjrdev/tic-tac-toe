import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ButtonBase from "@material-ui/core/ButtonBase";
import { ReactComponent as Xis } from "./assets/image/xis.svg";
// import Zero from './zero.svg'
import { ReactComponent as Zero } from "./assets/image/zero.svg";
import Switch from "@material-ui/core/Switch";

function Square(props) {
  let className = "square";
  let classSymbol = "symbol";
  let mark;

  if (props.winSquare && props.winSquare.indexOf(props.keySquare) !== -1) {
    classSymbol += " win";
    className += " win";
  }
  if (props.value === "O") {
    mark = <Zero className={classSymbol} />;
  } else if (props.value === "X") {
    mark = <Xis className={classSymbol} />;
  } else {
    mark = null;
  }
  return (
    <ButtonBase disableRipple>
      <span className={className} onClick={props.onClick}>
        {mark}
      </span>
    </ButtonBase>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        winSquare={this.props.line}
        keySquare={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    let classLine = "strikethrough";
    switch (this.props.winner) {
      case 1:
        classLine += " h-mid";
        break;
      case 2:
        classLine += " h-bot";
        break;
      case 3:
        classLine += " v-left";
        break;
      case 4:
        classLine += " v-mid";
        break;
      case 5:
        classLine += " v-right";
        break;
      case 6:
        classLine += " d-down";
        break;
      case 7:
        classLine += " d-up";
        break;
      default:
        break;
    }
    let Line =
      this.props.winner !== null ? (
        <div className={classLine}></div>
      ) : (
        <span></span>
      );
    console.log(this.props.winner);
    return (
      <div>
        {Line}
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// this.setState((prevState) => {
// 	return {line: null};
// });

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      line: null,
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      line: getLineWinner(squares),
    });
  }

  jumpTo(step) {
    const history = this.state.history;
    const current = history[step];
    const winnerLine = getLineWinner(current.squares);

    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
      line: winnerLine,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let l = getSqrWinner(current.squares);

    // const moves = history.map((step,move) => {
    // 	const desc = move ?
    // 	'Ir para jogada nº'+move :
    // 	'Ir para começo do jogo';
    // 	return (
    // 		<li key={move}>
    // 			<button onClick={() => this.jumpTo(move)}>{desc}</button>
    // 		</li>
    // 	);
    // });

    let status;
    let classShow = "font-3 restart-button";

    if (winner) {
      status = winner;
      classShow = "showing font-3 restart-button";
    } else {
      status = "NEXT: " + (this.state.xIsNext ? "X" : "O");
      classShow = "font-3 restart-button";
    }

    let reset_button = (
      <p className={classShow} onClick={() => this.jumpTo(0)}>
        RESTART a
      </p>
    );
    return (
      <div className="game">
        <div className="game-board">
          <div className="centered font-3">{status}</div>
          <div>
            <label className="label-ia">VS CPU</label>
            <Switch
              checked={false}
              onChange={(e) => console.log(e)}
              value="ia"
            />
          </div>
          <Board
            winner={l}
            line={this.state.line}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
          <div className="centered">{reset_button}</div>
        </div>
        {/* <div className="game-info">
            <div >{status}</div>
            <ol>{moves}</ol>
            
          </div> */}
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function getLineWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      console.log(i);
      return lines[i];
    }
  }

  return null;
}

function getSqrWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return i;
    }
  }

  return null;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return "PLAYER " + squares[a] + " WINS!";
    }
  }
  if (squares.indexOf(null) === -1) {
    return "TIE!";
  }
  return null;
}
