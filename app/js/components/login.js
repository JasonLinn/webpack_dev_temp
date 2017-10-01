
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../../sass/main.scss';
import Btn from './btn.js';
class Login extends Component {
    // constructor(props) {
    //     super(props)
    // }
    render(){
        return(
            <form className="login-form" id="login-form">
                <div>My Album</div>
                <label htmlFor="login-form">
                    帳號：<input type="text"/>
                </label>
                <label htmlFor="login-form">
                    密碼：<input type="text"/>
                </label>
                
                <Btn />
            </form>
        )
    }
}

export default Login;