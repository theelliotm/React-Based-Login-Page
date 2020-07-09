import React from 'react';
import PasswordForm from './passwordform';
import ForgotPasswordForm from './recoverpasswordform';
import AccountForm from './createaccountform';
import Status from './status';
import SignInStyle from './signinform.module.css';

export const pages = {
    SIGN_IN : { n : 0 },
    SIGN_IN_LOADING : { n : 1 },
    SIGN_UP : { n : 2 },
    SIGN_UP_LOADING : { n : 3 },
    FORGOT_PASSWORD : { n : 4 },
    FORGOT_PASSWORD_LOADING : { n : 5 }
};

export const warnings = {
    ERROR: { type: 2,  text: "Something went wrong. Please try again later." },
    INCORRECT_DETAILS: { type: 2, text: "Incorrect username or password. Please try again." },
    SIGNED_IN: {type: 0, text: "Congratulations, you have successfully signed in."},
    RECOVER_EMAIL_NOT_VALID: {type: 2, text: "An improper email was supplied, please make sure you typed it correctly."},
    RECOVER_SENT: {type: 1, text: "Check your inbox for recovery instructions if that email is valid."},
    SERVER_RECIEVED_BAD_DATA: {type: 2, text: "The server recieved data that didn't match requirements."},
    ACCOUNT_CREATED: {type: 0, text: "Your account was created! Check your inbox for a validation email."},
};

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: pages.SIGN_IN.n,
            warning: "",
        }
        this.updateHandler = this.updateHandler.bind(this);
        this.attemptSignIn = this.attemptSignIn.bind(this);
        this.recoverPassword = this.recoverPassword.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.render = this.render.bind(this);
    }

    updateHandler(_step, _warning) {
        this.setState({
            step: _step,
            warning: _warning,
        });
    }

    async attemptSignIn(user, pass, remember) {
        if (this.state.step !== 1) {
            this.setState({
                step: pages.SIGN_IN_LOADING.n,
                warning: "",
            });
        };
        const response = await fetch('/app/loginpage/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: user, password: pass }),
        });
        const body = await response.text();
        let _warning = "";
        if (response.status !== 200 || body === "-1") _warning = warnings.ERROR;
        else if (body === "0") _warning = warnings.INCORRECT_DETAILS;
        else if (body === "1") _warning = warnings.SIGNED_IN;
        else _warning = warnings.ERROR;
        this.setState({
            step: pages.SIGN_IN.n,
            warning: _warning,
        });
    }

    async recoverPassword(_email) {
        if (this.state.step !== 5) {
            this.setState({
                step: pages.FORGOT_PASSWORD_LOADING.n,
                warning: "",
            });
        };
        const response = await fetch('/app/loginpage/api/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: _email }),
        });
        const body = await response.text();
        let _warning = "";
        if (response.status !== 200 || body === "-1") _warning = warnings.ERROR;
        else if(body === "0") _warning = warnings.RECOVER_EMAIL_NOT_VALID;
        else if(body === "1") _warning = warnings.RECOVER_SENT;
        else if(body === "-1") _warning = warnings.ERROR;
        this.setState({
            step: _warning === warnings.RECOVER_SENT ? pages.SIGN_IN.n : pages.FORGOT_PASSWORD.n,
            warning: _warning,
        });
    }
    
    async createAccount(username, email, password) {
        if (this.state.step !== 5) {
            this.setState({
                step: pages.SIGN_UP_LOADING.n,
                warning: "",
            });
            const response = await fetch('/app/loginpage/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username, email: email, password: password }),
            });
            const body = await response.text();
            let _warning = "";
            if (response.status !== 200 || body === "-1") _warning = warnings.ERROR;
            else if(body === "0") _warning = warnings.SERVER_RECIEVED_BAD_DATA;
            else if(body === "1") _warning = warnings.ACCOUNT_CREATED;
            else if(body === "-1") _warning = warnings.ERROR;
            this.setState({
                step: _warning === warnings.ACCOUNT_CREATED ? pages.SIGN_IN.n : pages.SIGN_UP.n,
                warning: _warning,
            });
        };
    }

    render() {
        var val;
        switch (this.state.step) {
            case pages.SIGN_IN.n: val = <PasswordForm transition={SignInStyle.slidein} handler={this.updateHandler} login={this.attemptSignIn} />; break;
            case pages.SIGN_IN_LOADING.n: val = <PasswordForm handler={this.updateHandler} loading />; break;
            case pages.SIGN_UP.n: val = <AccountForm transition={SignInStyle.slidein} handler={this.updateHandler} create={this.createAccount} />; break;
            case pages.SIGN_UP_LOADING.n: val = <AccountForm handler={this.updateHandler} loading />; break;
            case pages.FORGOT_PASSWORD.n: val = <ForgotPasswordForm transition={SignInStyle.slideout} handler={this.updateHandler} recover={this.recoverPassword} />; break;
            case pages.FORGOT_PASSWORD_LOADING.n: val = <ForgotPasswordForm handler={this.updateHandler} loading />; break;
            default: val = <PasswordForm transition={SignInStyle.slidein} handler={this.updateHandler} login={this.attemptSignIn} loading={this.state.step === 1} />; break;
        }
        return (
            <>
                {this.state.warning !== "" ? <Status type={this.state.warning.type} message={this.state.warning.text}></Status> : <></>}
                <div className={"bg-white shadow-md font-bold rounded px-8 pt-5 pb-5 mb-4 " + SignInStyle.wrapper}>
                    {val}
                </div>
                <p className="text-center text-gray-500 text-xs">
                    &copy; 2020 Xcallibur. All rights reserved. <br />
                    <strong>Credentials - User: Xcallibur, Pass: 123456</strong>
                </p>
            </>
        );
    }
}

export default SignIn