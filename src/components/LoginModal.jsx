import { useState } from "react"

const LoginModal = ({ endpoint, onLogin, onClose }) => {

    const [emailInput, setEmailInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")

    return (
        <div id="login-card-blur">
            <div id="login-card-background" >
                <button id="login-card-close-button" onClick={() => onClose(false)}>
                    <span className="material-symbols-outlined">close</span>
                </button>
                <div id="login-card-content" >
                    <div id="login-card-content-title" >
                        <p className="login-card-content-title-p">Login</p>
                    </div>
                    <div id="login-card-content-inputs-container" >
                        <input type="email"
                            className="login-card-content-input"
                            name="email"
                            placeholder="email"
                            maxLength="40"
                            required
                            value={emailInput}
                            onChange={(event) => setEmailInput(event.target.value)}
                        />
                        <input
                            type="password"
                            className="login-card-content-input"
                            name="password"
                            placeholder="password"
                            maxLength="15"
                            required
                            value={passwordInput}
                            onChange={(event) => setPasswordInput(event.target.value)}
                        />
                    </div>
                    <div id="login-card-content-button-container" >
                        <button className="login-card-button" onClick={() => onLogin(emailInput, passwordInput, endpoint)}>
                            Login
                            <span className="material-symbols-outlined">login</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginModal
