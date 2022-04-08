const SignIn = () =>{
    return(
        <div className="signIn">
            <form className="form">
                <p className="signIn_text">{'Sign in'}</p>
                <div className="form_wrapper">
                    <label htmlFor="username">{'Username'}</label>
                    <input type='text'id="username" name="username"/>
                </div>
                <div className="form_wrapper">
                    <label htmlFor="password">{'Password'}</label>
                    <input type='password' name="password" id="password"/>
                </div>
                <button>{'Get in'}</button>
            </form>
        </div>

    )
}

export default SignIn