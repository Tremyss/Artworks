import { useState } from "react"

const SignupModal = ({ endpoint, onSignup, onClose, signUpMessage }) => {
console.log(endpoint)
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
                        <p className="login-card-content-title-p">Registration</p>
                    </div>
                    <div id="login-card-content-inputs-container" >
                        <input type="email"
                            className="login-card-content-input"
                            name="email"
                            placeholder="email"
                            required
                            value={emailInput}
                            onChange={(event) => setEmailInput(event.target.value)}
                        />
                        <input
                            type="password"
                            className="login-card-content-input"
                            name="password"
                            placeholder="password"
                            required
                            value={passwordInput}
                            onChange={(event) => setPasswordInput(event.target.value)}
                        />
                    </div>
                    <div id="login-card-content-button-container" >
                        <p>{signUpMessage}</p>
                        <button
                            className="login-card-button"
                            onClick={() => onSignup(emailInput, passwordInput, endpoint)}>
                            Sign&nbsp;up
                            <span className="material-symbols-outlined">how_to_reg</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupModal
