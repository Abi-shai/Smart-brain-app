const SignIn = ({ onRouteChange }) =>{
    return(
        <div className="signIn">
            <form className="form">
                <p className="signIn_text">{'Sign in'}</p>
                <div className="form_wrapper">
                    <label htmlFor="email">{'Email'}</label>
                    <input
                        type='text'
                        id="email"
                        name="username"
                    />
                </div>
                <div className="form_wrapper">
                    <label htmlFor="password">{'Password'}</label>
                    <input
                        type='password'
                        name="password"
                        id="password"
                    />
                </div>
                <button onClick={() =>onRouteChange('home')}>{'Sign in'}</button>
                <div className="form_getin">
                    <span>{'Register?'}</span>
                </div>
            </form>
        </div>

    )
}

export default SignIn