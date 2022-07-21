import { Component, createRef } from 'react';
import './App.css';

type Move = {
  ref: React.RefObject<HTMLDivElement>;
  turn: number;
  cell: number;
  type: 'X' | 'O';
};

type State = {
  history: Array<Move>;
  circleOrCross: 'X' | 'O';
  turn: number;
};

type Props = {};

export default class App extends Component<Props, State> {
  private cell1: React.RefObject<HTMLDivElement>;
  private cell2: React.RefObject<HTMLDivElement>;
  private cell3: React.RefObject<HTMLDivElement>;
  private cell4: React.RefObject<HTMLDivElement>;
  private cell5: React.RefObject<HTMLDivElement>;
  private cell6: React.RefObject<HTMLDivElement>;
  private cell7: React.RefObject<HTMLDivElement>;
  private cell8: React.RefObject<HTMLDivElement>;
  private cell9: React.RefObject<HTMLDivElement>;
  private content: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      history: [],
      circleOrCross: 'O',
      turn: 1,
    };

    this.cell1 = createRef<HTMLDivElement>();
    this.cell2 = createRef<HTMLDivElement>();
    this.cell3 = createRef<HTMLDivElement>();
    this.cell4 = createRef<HTMLDivElement>();
    this.cell5 = createRef<HTMLDivElement>();
    this.cell6 = createRef<HTMLDivElement>();
    this.cell7 = createRef<HTMLDivElement>();
    this.cell8 = createRef<HTMLDivElement>();
    this.cell9 = createRef<HTMLDivElement>();
    this.content = createRef<HTMLDivElement>();
  }

  horizontalWin() {
    if (
      this.cell1.current?.innerHTML != '' &&
      this.cell1.current?.innerHTML == this.cell2.current?.innerHTML &&
      this.cell2.current?.innerHTML == this.cell3.current?.innerHTML
    ) {
      return true;
    }

    if (
      this.cell4.current?.innerHTML != '' &&
      this.cell4.current?.innerHTML == this.cell5.current?.innerHTML &&
      this.cell5.current?.innerHTML == this.cell6.current?.innerHTML
    ) {
      return true;
    }

    if (
      this.cell7.current?.innerHTML != '' &&
      this.cell7.current?.innerHTML == this.cell8.current?.innerHTML &&
      this.cell8.current?.innerHTML == this.cell9.current?.innerHTML
    ) {
      return true;
    }
  }

  verticalWin() {
    if (
      this.cell1.current?.innerHTML != '' &&
      this.cell1.current?.innerHTML == this.cell4.current?.innerHTML &&
      this.cell4.current?.innerHTML == this.cell7.current?.innerHTML
    ) {
      return true;
    }

    if (
      this.cell2.current?.innerHTML != '' &&
      this.cell2.current?.innerHTML == this.cell5.current?.innerHTML &&
      this.cell5.current?.innerHTML == this.cell8.current?.innerHTML
    ) {
      return true;
    }

    if (
      this.cell3.current?.innerHTML != '' &&
      this.cell3.current?.innerHTML == this.cell6.current?.innerHTML &&
      this.cell6.current?.innerHTML == this.cell9.current?.innerHTML
    ) {
      return true;
    }
  }

  diagonalWin() {
    if (
      this.cell1.current?.innerHTML != '' &&
      this.cell1.current?.innerHTML == this.cell5.current?.innerHTML &&
      this.cell5.current?.innerHTML == this.cell9.current?.innerHTML
    ) {
      return true;
    }

    if (
      this.cell3.current?.innerHTML != '' &&
      this.cell3.current?.innerHTML == this.cell5.current?.innerHTML &&
      this.cell5.current?.innerHTML == this.cell7.current?.innerHTML
    ) {
      return true;
    }
  }

  verifyWin() {
    if (this.horizontalWin() || this.verticalWin() || this.diagonalWin()) {
      return true;
    }
  }

  changeType() {
    if (this.state.circleOrCross == 'O') {
      this.setState({ circleOrCross: 'X' });
    } else {
      this.setState({ circleOrCross: 'O' });
    }
  }

  set(cell: React.RefObject<HTMLDivElement>) {
    if (cell.current && cell.current.innerHTML == '') {
      cell.current.innerHTML = this.state.circleOrCross;

      if (cell.current.dataset.cell && (cell.current.innerHTML == 'X' || cell.current.innerHTML == 'O')) {
        const move: Move = {
          ref: cell,
          cell: parseInt(cell.current.dataset.cell),
          turn: this.state.turn,
          type: cell.current.innerHTML,
        };

        this.setState({ history: [...this.state.history, move] });
      }

      if (this.verifyWin()) {
        alert(`Ganhador: ${cell.current.innerHTML}`);
      }

      this.changeType();
      this.setState({ turn: this.state.turn + 1 });
    }
  }

  resetField() {
    this.cell1.current!.innerHTML = '';
    this.cell2.current!.innerHTML = '';
    this.cell3.current!.innerHTML = '';
    this.cell4.current!.innerHTML = '';
    this.cell5.current!.innerHTML = '';
    this.cell6.current!.innerHTML = '';
    this.cell7.current!.innerHTML = '';
    this.cell8.current!.innerHTML = '';
    this.cell9.current!.innerHTML = '';

    this.setState({ circleOrCross: 'O', history: [] });
  }

  undoPlay(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const content = e.currentTarget.textContent;
    if (content) {
      const turn = parseInt(content.charAt(7));
      const plays = this.state.history.filter((item) => item.turn <= turn);
      this.resetField();
      this.setState({ history: plays });
      plays.forEach((item) => {
        if (item.ref.current) {
          item.ref.current.innerHTML = item.type;
        }
      });
      if (plays.at(plays.length - 1)!.type == 'O') {
        this.setState({ circleOrCross: 'X' });
      } else {
        this.setState({ circleOrCross: 'O' });
      }
      this.setState({ turn: plays.length + 1 });
    }
  }

  render() {
    return (
      <div id="container">
        <div id="field">
          <div data-cell="1" ref={this.cell1} onClick={() => this.set(this.cell1)} className="cell up left"></div>
          <div data-cell="2" ref={this.cell2} onClick={() => this.set(this.cell2)} className="cell up"></div>
          <div data-cell="3" ref={this.cell3} onClick={() => this.set(this.cell3)} className="cell up right"></div>
          <div data-cell="4" ref={this.cell4} onClick={() => this.set(this.cell4)} className="cell left"></div>
          <div data-cell="5" ref={this.cell5} onClick={() => this.set(this.cell5)} className="cell"></div>
          <div data-cell="6" ref={this.cell6} onClick={() => this.set(this.cell6)} className="cell right"></div>
          <div data-cell="7" ref={this.cell7} onClick={() => this.set(this.cell7)} className="cell bottom left"></div>
          <div data-cell="8" ref={this.cell8} onClick={() => this.set(this.cell8)} className="cell bottom"></div>
          <div data-cell="9" ref={this.cell9} onClick={() => this.set(this.cell9)} className="cell bottom right"></div>
        </div>
        <div id="history">
          <h1>Histórico</h1>
          <div ref={this.content} id="content">
            {this.state.history.map((item) => (
              <button key={item.turn} onClick={(e) => this.undoPlay(e)}>
                Rodada:{item.turn} Célula: {item.cell} Icone:{item.type}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
