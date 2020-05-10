import React, { Component } from 'react';
import axios from "axios";

export default class register extends Component {
    constructor(props) {
        super(props);

        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeVerifPassword = this.onChangeVerifPassword.bind(this);
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
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onChangeVerifPassword(e) {
        this.setState({
            verifPassword: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const registerPost = {
            login: this.state.login,
            email: this.state.email,
            password: this.state.password,
            verifPassword: this.state.verifPassword
        }
        axios.post('http://localhost:8000/register/add', registerPost)
        .then(res => console.log(res.data));
        console.log(registerPost);
        //window.location = "/";
    }

    render() {
        return (
            <div className="container">
                <div className="card text-center">
                    <div className="card-body">
                        <h1>Se crée un compte</h1>
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
                                <label>Email :</label>
                                <input type="email" 
                                className="form-control" 
                                placeholder="Email" 
                                required
                                value={this.state.email}
                                onChange={this.onChangeEmail}></input>
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
                            <div className="form-group">
                                <label>Confirm Password :</label>
                                <input type="password" 
                                className="form-control" 
                                placeholder="Confirm Password" 
                                required
                                value={this.state.verifPassword}
                                onChange={this.onChangeVerifPassword}></input>
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