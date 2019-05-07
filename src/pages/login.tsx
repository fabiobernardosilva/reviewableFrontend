import React from 'react';
import * as H from 'history';
import * as joi from "joi";
import { withRouter } from "react-router-dom";
import { setAuthToken } from "../components/with_auth/with_auth";
import { Header } from '../components/header/header';

const credentialSchema = {
    email: joi.string().email().required(),
    password: joi.string().min(3).max(30).required()
};

interface LoginProps {
    history: H.History;
}

interface LoginState {
    email: string;
    password: string;
    error: string | null;
}

export class LoginInternal extends React.Component<LoginProps, LoginState> {
    public constructor(props: LoginProps) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: null}
    }


    public render() {
        return (<div>
            <Header/>
        <div className="content">
            <div>
            {this._renderServerErrors()}
            {this._renderValidationErrors()}
            
            <input
                type='text'
                placeholder="Email"
                onKeyUp={(event) => this._updateEmail((event as any).target.value)}
            >
            </input>
            <input
                type='password'
                placeholder="Password"
                onKeyUp={(event) => this._updatePassword((event as any).target.value)}
            ></input>
            <button onClick={() => this._handleSubmit()}>Submit</button>

            {/*
            <button onClick={()=> createUser(this.state.email, this.state.password)}>Create User</button>
            */}</div></div>
        </div>);
    }

    private _handleSubmit() {

        (async () => {
            try {
                const token = await getToken(this.state.email, this.state.password);
                // Reset error
                this.setState({ error: null });
                // Save token in window object
                // (window as any).__token = token;
                setAuthToken(token);
                // Redirect to home page
                this.props.history.push("/profile/");
            } catch(err) {
                this.setState({ error: err.error });
            }
        })();

        /*
        console.log("Submit", this.state.email, this.state.password);
        (async () => {
            const token = await login(this.state.email, this.state.password);
            //(window as any).__token = token;
            console.log(token);
            // redirect

        })();
        */
    }

    private _updateEmail(email: string) {
        console.log("UpdateEmail")
        this.setState({ email: email })
    }
    private _updatePassword(password: string) {
        console.log("UpdatePassword")
        this.setState({ password: password })
    }

    private _renderServerErrors() {
        if (this.state.error === null) {
            return <div></div>;
        } else {
            return <div>{this.state.error}</div>;
        }
    }
    
    private _renderValidationErrors() {
        const validationResult = joi.validate({
            email: this.state.email,
            password: this.state.password
        }, credentialSchema);
        if (validationResult.error) {
            return <div>
                {validationResult.error.details.map(d => <div>{d.message}</div>)}
            </div>;
        } else {
            return <div>OK!</div>;
        }
    }

}

export const Login = withRouter(props => <LoginInternal {...props}/>);

/*
async function login(email: string, password: string) {
    const data = {
        email: email,
        password: password
    }
    const response = await fetch(
        "api/v1/auth/login",
        {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        }
    )
    const json = await response.json();
    //
    return json.token;
}   
*/

async function getToken(email: string, password: string) {

    return new Promise<string>(function (resolve, reject) {
        (async () => {
            const data = {
                email: email,
                password: password
            };

            const response = await fetch(
                "/api/v1/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );

            const json = await response.json();
            if (response.status === 200) {
                resolve(json.token);
            } else {
                reject(json);
            }
        })();
    });
}

/*
async function createUser(email: string, password: string) {
    const data = {
        email: email,
        password: password
    };
    const response = await fetch(
        "/api/v1/users",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );
    const json = await response.json();
    return json;
}
*/
