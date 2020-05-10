import React, { Component } from 'react';

export default class login extends Component {
    constructor(props) {
        super(props);

        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            login: '',
            email: '',
            password: '',
            verifPassword: '',
        }
    }

    onChangeLogin(e) {
        this.setState({
            login: e.target.value
        });
    }
    
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const loginPost = {
            login: this.state.login,
            password: this.state.password,
        }
        console.log(loginPost);
        //window.location = "/";
    }
    render() {
        return (
            <div className="container">
                <div className="card text-center">
                    <div className="card-body">
                        <h1>Se connecter</h1>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Login :</label>
                                <input type="text" 
                                className="form-control" 
                                placeholder="Login" 
                                required
                                value={this.state.login}
                                onChange={this.onChangeLogin}></input>
                            </div>
                            <div className="form-group">
                                <label>Password :</label>
                                <input type="password" 
                                className="form-control" 
                                placeholder="Password" 
                                required
                                value={this.state.password}
                                onChange={this.onChangePassword}></input>
                            </div>
                            <button type="submit" 
                            className="btn btn-primary"
                            value="createAccount">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}