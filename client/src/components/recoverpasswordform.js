import React from 'react';
import Input from './input';
import Button from './button';
import LoadingIcon from './loading';

const emailRegx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
var transistion = true;

class ForgotPasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: "", warn: false, failed: false }
        transistion = true;
    }
    handleEmailUpdate = (event) => {
        let _email = event.target.value, _warn = false;
        if (this.state.failed)
            _warn = !emailRegx.test(_email.toLowerCase());
        this.setState({ email: _email, warn: _warn, failed: this.state.failed });
    }
    handleSubmit = (event) => {
        if (!this.props.loading) {
            event.preventDefault();
            let _email = this.state.email;
            if (!emailRegx.test(_email.toLowerCase())) {
                this.setState({ email: _email, warn: true, failed: true });
            } else {
                document.getElementById("passwordresetform").reset();
                this.props.handler(5, "");
                this.props.recover(_email);
                this.setState({ email: "", warn: false, failed: false });
            }
        }
    }
    render() {
        let disabled = false;
        let _transition = transistion;
        transistion = false;
        if (this.state.email === "" || this.state.email === "") disabled = true;
        return (
            <>
                <form id="passwordresetform" className={_transition ? this.props.transition : ""} onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="mb-3 text-center font-bold text-xl">
                        <p>Recover Password</p>
                    </div>
                    <div className="mb-3">
                        <hr />
                    </div>
                    <div className="mb-2">
                        <Input name="Email" type="text" placeholder="name@example.com" id="email" warn={this.state.warn ? "That email is not valid." : ""} change={this.handleEmailUpdate}></Input>
                    </div>
                    <div className="mb-6">
                        <p className="text-left text-gray-500 text-xs" >If a user account is tied to this email address, an email will be sent with recovery instructions.</p>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                        <a href="#" onClick={() => { if (!this.props.loading) this.props.handler(0, ""); }}><Button bstyle="secondary"><span>Back</span></Button></a>
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

export default ForgotPasswordForm;