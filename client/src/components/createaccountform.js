import React from 'react';
import Input from './input';
import Button from './button';
import LoadingIcon from './loading';

const emailRegx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
var transistion = true;

class AccountForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: "", password: "", password_conf: "", email: "", warn: new Array(4).fill(false), failed_email: false }
        transistion = true;
    }
    handleUsernameUpdate = (event) => {
        this.setState({
            user: event.target.value,
            password: this.state.password,
            password_conf: this.state.password_conf,
            email: this.state.email,
            warn: this.state.warn,
            failed_email: this.state.failed_email,
        });
    }
    handlePasswordUpdate = (event) => {
        this.setState({
            user: this.state.user,
            password: event.target.value,
            password_conf: this.state.password_conf,
            email: this.state.email,
            warn: this.state.warn,
            failed_email: this.state.failed_email,
        });
    }
    handleConfirmPasswordUpdate = (event) => {
        this.setState({
            user: this.state.user,
            password: this.state.password,
            password_conf: event.target.value,
            email: this.state.email,
            warn: this.state.warn,
            failed_email: this.state.failed_email,
        });
    }
    handleEmailUpdate = (event) => {
        let _email = event.target.value, currentWarn = this.state.warn.slice();
        if (this.state.failed_email)
            currentWarn[0] = !emailRegx.test(_email.toLowerCase());
        this.setState({ 
            user: this.state.user,
            password: this.state.password,
            password_conf: this.state.password_conf,
            email: _email, 
            warn: currentWarn, 
            failed_email: this.state.failed_email,
        });
    }
    handleSubmit = (event) => {
        if (!this.props.loading) {
            event.preventDefault();
            let _email = this.state.email;
            let email_failed = false, retype_failed = false, username_failed = false, password_failed = false, currentWarn = new Array(4).fill(false);
            if (!emailRegx.test(_email.toLowerCase())){
                currentWarn[0] = true;
                email_failed = true;
            }
            if(this.state.password !== this.state.password_conf){
                currentWarn[1] = true;
                retype_failed = true;
            }
            if(this.state.user.length < 5){
                currentWarn[2] = true;
                username_failed = true;
            }
            if(this.state.password.length < 8){
                currentWarn[3] = true;
                password_failed = true;
            }
            if(username_failed || retype_failed || email_failed || password_failed){
                this.setState({ 
                    user: this.state.user,
                    password: this.state.password,
                    password_conf: this.state.password_conf,
                    email: this.state.email, 
                    warn: currentWarn, 
                    failed: this.state.failed || email_failed,
                });
            } else {
                document.getElementById("accountform").reset();
                this.props.handler(3, "");

                this.props.create(this.state.user, this.state.email, this.state.password);

                this.setState({ 
                    user: "",
                    password: "",
                    password_conf: "",
                    email: "", 
                    warn: new Array(4).fill(false), 
                    failed: false, 
                });
            }
        }
    }
    render() {
        let disabled = false;
        let _transition = transistion;
        transistion = false;
        if (this.state.email === "" || this.state.user === "" || this.state.password === "" || this.state.password_conf === "") disabled = true;
        return (
            <>
                <form id="accountform" className={_transition ? this.props.transition : ""} onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="mb-3 text-center font-bold text-xl">
                        <p>Create Account</p>
                    </div>
                    <div className="mb-3">
                        <hr />
                    </div>
                    <div className="mb-4">
                        <Input name="Username" type="text" placeholder="Username" id="username" warn={this.state.warn[2] ? "The username must be at least 5 characters." : ""} change={this.handleUsernameUpdate}></Input>
                    </div>
                    <div className="mb-4">
                        <Input name="Email" type="text" placeholder="name@example.com" id="email" warn={this.state.warn[0] ? "That email is not valid or is already taken." : ""} change={this.handleEmailUpdate}></Input>
                    </div>
                    <div className="mb-4">
                        <Input name="Password" type="password" placeholder="***********" id="password" warn={this.state.warn[3] ? "The password must be at least 8 characters." : ""} change={this.handlePasswordUpdate}></Input>
                    </div>
                    <div className="mb-4">
                        <Input name="Re-Type Password" type="password" placeholder="***********" id="confpassword" warn={this.state.warn[1] ? "The passwords are not the same." : ""} change={this.handleConfirmPasswordUpdate}></Input>
                    </div>
                    <div className="mb-6 text-left text-xs">
                        <span className="text-gray-500">By clicking on 'Sign Up', you agree to our <span className="text-blue-600 hover:underline cursor-pointer">Terms and Conditions</span>.</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <a href="#" onClick={() => { if (!this.props.loading) this.props.handler(0, ""); }}><Button bstyle="secondary"><span>Back</span></Button></a>
                        <Button bstyle={disabled && !this.props.loading ? "disabled" : "primary"} type={disabled ? "button" : "submit"}>{this.props.loading === true ? <LoadingIcon></LoadingIcon> : <span>Sign Up </span>}</Button>
                    </div>
                </form>
            </>
        );
    }
}

export default AccountForm;