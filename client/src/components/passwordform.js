import React from 'react';
import Input from './input';
import Button from './button';
import LoadingIcon from './loading';

var transistion = true;

class PasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            pass: "",
            remember: 0,
        }
        transistion = true;
    }
    handleUsernameUpdate = (event) => {
        this.setState({
            user: event.target.value,
            pass: this.state.pass,
            remember: this.state.remember,
        });
    }
    handlePasswordUpdate = (event) => {
        this.setState({
            user: this.state.user,
            pass: event.target.value,
            remember: this.state.remember,
        });
    }
    handleRemember = (event) => {
        this.setState({
            user: this.state.user,
            pass: this.state.pass,
            remember: event.target.checked ? 1 : 0,
        });
    }
    handleSubmit = (event) => {
        if (!this.props.loading) {
            event.preventDefault();
            document.getElementById("passwordform").reset();
            this.props.handler(1, "");
            this.props.login(this.state.user, this.state.pass, this.state.remember);
            this.setState({
                user: "",
                pass: "",
                remember: 0,
            });
        }
    }
    render() {
        let disabled = false;
        let _transition = transistion;
        transistion = false;
        if (this.state.user === "" || this.state.pass === "") disabled = true;
        return (
            <>
                <form id="passwordform" className={_transition ? this.props.transition : ""} onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="mb-3 text-center font-bold text-xl">
                        <p>Sign In</p>
                    </div>
                    <div className="mb-3">
                        <hr/>
                    </div>
                    <div className="mb-4">
                        <Input name="Username" type="text" placeholder="Username" id="username" change={this.handleUsernameUpdate}></Input>
                    </div>
                    <div className="mb-4">
                        <Input name="Password" type="password" placeholder="*************" id="password" change={this.handlePasswordUpdate}></Input>
                    </div>
                    <div className="mb-6 content-center">
                        <input onChange={(e) => this.handleRemember(e)} className="mr-2 leading-tight" type="checkbox" id="rememberme" name="rememberme"></input>
                        <label className="md:w-2/3 text-gray-700 font-bold">
                            <span className="text-sm">
                                Remember Me
                            </span>
                        </label>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                        <a href="#" onClick={() => { this.props.handler(4, ""); }}><Button bstyle="secondary"><span>Forgot Password</span></Button></a>
                        <Button bstyle={disabled && !this.props.loading ? "disabled" : "primary"} type={disabled ? "button" : "submit"}>{this.props.loading === true ? <LoadingIcon></LoadingIcon> : <><span>Continue </span><i className="fas fa-chevron-right"></i></>}</Button>
                    </div>
                    <p className="text-center text-gray-500 text-xs">
                        <span>Not a user? </span>
                        <button onClick={() => { this.props.handler(2, ""); }} type="button" className="text-blue-600 font-bold hover:underline cursor-pointer focus:outline-none">Create an account.</button>
                    </p>
                </form>
            </>
        );
    }
}

export default PasswordForm;