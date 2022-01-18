import React from "react";
import "./login.css"

export default class Login extends React.Component{
    render() {
        return(
            <div className="Login">
                <form onSubmit={this.props.login}>
                    <div style={{display:"flex"}}>
                        <div className="userNameInputstyle">
                            <input name="name" type="text" required id="userNameInput"/>
                            <span className="bar"></span>
                            <label>Name</label>
                        </div>
                        <button id="a">Войти</button>
                    </div>
                </form>
            </div>
        );
    }
}
