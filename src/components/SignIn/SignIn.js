import { Component } from "react"

class SignIn extends Component {

    constructor(props){

        super()

        this.state = {

            signInEmail: '',
            signInPassword: '',
            user: {
                id: '',
                name: '',
                email: '',
                entries: '',
                joined: ''
            }
        }

    }


    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }


    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }


    onSubmitSignIn = (event) => {
        event.preventDefault()

        fetch('http://localhost:8080/signin', {
            method: 'POST',
            headers: {'Content-Type': 'Application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(res => res.json())
        .then(data => {
            const { id } = data
            if(id) {
                console.log(data)
                this.props.loadUser(data)
                this.props.onRouteChange('home')
            } else {
                alert(`This account doesn't exist`)
            }
        })
    }


    loadUser = (data) =>{
        this.setState({user: {
            id: data.id,
            name: data.username,
            email: data.email,
            entries: data.entries,
            joined: data.joined
        }})
    }


    render() {

        const { onRouteChange } = this.props

        return(

            <div className="signIn">

                <form className="form">

                    <p className="signIn_text">{'Sign in'}</p>
    

                    <div className="form_wrapper">

                        <label htmlFor="email">{'Email'}</label>

                        <input

                            onChange={this.onEmailChange}
                            type='text'
                            id="email"
                            name="email"
                        />

                    </div>
                    

                    <div className="form_wrapper">

                        <label htmlFor="password">{'Password'}</label>

                        <input

                            onChange={this.onPasswordChange}
                            type='password'
                            name="password"
                            id="password"

                        />

                    </div>
                    

                    <button onClick={this.onSubmitSignIn}>{'Sign in'}</button>
    

                    <div className="form_getin">
                        <span onClick={() => onRouteChange('regiter')}>{'Register?'}</span>
                    </div>

                </form>

            </div>
    
        )

    }


} 

export default SignIn