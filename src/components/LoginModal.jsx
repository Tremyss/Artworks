const LoginModal = ({ onLogin, onClose }) => {

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
                        <input type="email" className="login-card-content-input" name="email" placeholder="email" />
                        <input type="password" className="login-card-content-input" name="password" placeholder="password" />
                    </div>
                    <div id="login-card-content-button-container" >
                        <button className="login-card-button" onClick={onLogin}>
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
