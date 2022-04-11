const Register = ({ onRouteChange }) =>{
    return(
        <div className="register">
            <form className="form">
                <p className="Register_text">{'Register'}</p>
                <div className="form_wrapper">
                    <label htmlFor="name">{'Name'}</label>
                    <input
                        type='text'
                        id="name"
                        name="name"
                    />
                </div>
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
                <button onClick={() =>onRouteChange('home')}>{'Register'}</button>
            </form>
        </div>
    )
}

export default Register