import { Component } from 'react';
import './App.css';
import Button from './components/Button';
import './data.js'
import { buttons } from './data.js';
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const oper = { '/': (x, y) => x / y, 'x': (x, y) => x * y, '+': (x, y) => x + y, '-': (x, y) => x - y, "^": (x, y) => Math.pow(x, y) }
const operators = ['/', 'x', '-', '+', "x^n", "√", "%"];
export default class App extends Component {

  constructor() {
    super();
    this.state = {
      result: "0",
      firstop: '',
      nextvalue: false,
      secondop: '',
      sign: ''
    }
  }
  handlerClick = (event) => {
    let currentInput = event.target.value;
    if (digits.includes(currentInput)) {
      this.setState((prevstate) => {
        if (prevstate.result === '0') { prevstate.result = '' }
        if (prevstate.nextvalue === true) {
          return {
            result: prevstate.result + currentInput,
            secondop: prevstate.secondop + currentInput
          }
        }
        return {
          result: prevstate.result + currentInput,
          firstop: prevstate.result + currentInput
        }
      })
    }
    else if (currentInput === '.') {
      this.setState((prevstate) => {
        let dot = prevstate.result.slice(-1);
        if (prevstate.nextvalue === true) {
          return {
            result: dot !== '.' ? prevstate.result + currentInput : prevstate.result,
            secondop: dot !== '.' ? prevstate.secondop + currentInput : prevstate.secondop
          }
        }
        return {
          result: dot !== '.' ? prevstate.result + currentInput : prevstate.result,
          firstop: dot !== '.' ? prevstate.result + currentInput : prevstate.result,
        }

      })
    }
    //-----operators----
    if (operators.includes(currentInput)) {
      this.setState((prevstate) => {
        if (prevstate.sign !== "") { return }
        return {
          result: currentInput === "x^n" ? prevstate.result + '^' : prevstate.result + currentInput,
          firstop: prevstate.firstop,
          sign: currentInput === "x^n" ? '^' : currentInput,
          nextvalue: true
        }
      })
    }
    if (currentInput === "=") { this.calculate() };
    if (currentInput === 'C') { this.reset() };
    if (currentInput === "%") { this.calculatePercent() }
    if (currentInput === "√") { this.calculateSqRoot() }
  }
  calculatePercent = () => {
    this.setState((prevstate) => {
      return {
        result: parseFloat(prevstate.firstop) / 100,
        firstop: parseFloat(prevstate.firstop) / 100,
        nextvalue: false,
        secondop: '',
        sign: ''
      }
    })
  }
  calculateSqRoot = () => {
    this.setState((prevstate) => {
      return {
        result: Math.sqrt(parseFloat(prevstate.firstop)),
        firstop: Math.sqrt(parseFloat(prevstate.firstop)),
        nextvalue: false,
        secondop: '',
        sign: ''
      }
    })
  }
  reset = () => {
    this.setState({
      result: "0",
      firstop: '',
      nextvalue: false,
      secondop: '',
      sign: ''
    })
  }
  calculate = () => {
    let { result, firstop, nextvalue, secondop, sign } = this.state;
    console.log(result, nextvalue, sign);
    for (let key in oper) {
      if (key === sign) {
        this.setState({
          result: oper[key](parseFloat(firstop), parseFloat(secondop)),
          firstop: oper[key](parseFloat(firstop), parseFloat(secondop)),
          nextvalue: false,
          secondop: '',
          sign: ''
        })
      }
    }
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <div className='wrapper'>
          <input className='screen' type="text" value={this.state.result} readOnly />
          <div className='buttonBlock'>
            {buttons.map(item => <Button className={item.button.value} key={item.id}
              value={item.button.value} onClick={this.handlerClick}
            />)}
          </div>
        </div>

      </div>
    );
  }
}

