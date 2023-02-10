import { Component } from "react";
import './Button.css';

class Button extends Component {
    render() {

        return (

            <input type="button" className={`${this.props.className} button`}

                value={this.props.value}
                onClick={this.props.onClick} />


        )
    }
}
export default Button;