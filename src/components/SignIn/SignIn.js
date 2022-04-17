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
        if(event.target.value === ''){
            console.log('none')
        }
    }

    checkInpus = (event) => {
        if(event.target.value === ''){
            console.log('none')
        }
    }


    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }


    onSubmitSignIn = async (event) => {
        event.preventDefault()

        if(this.state.signInEmail === '' && this.state.signInPassword === ''){
            console.log('The inputs are empty')
        } else {
            return await fetch('https://pacific-falls-36803.herokuapp.com/signin', {
                   method: 'POST',
                   headers: {'Content-Type': 'Application/json'},
                   body: JSON.stringify({
                       email: this.state.signInEmail,
                       password: this.state.signInPassword
                       })
                   })
                   .then(res => res.json())
                   .then(user => {
                       const { id } = user
                       if(id) {
                           this.props.loadUser(user)
                           this.props.onRouteChange('home')
                       }
                   })
                   .catch(error => {
                       console.log('An error occured on signing in', error)
                   })
            }
    }


    loadUser = (user) =>{
        this.setState({user: {
            id: user.id,
            name: user.username,
            email: user.email,
            entries: user.entries,
            joined: user.joined
        }})
    }


    render() {

        const { onRouteChange } = this.props

        return(

            <div className="signIn">

                <form className="form">

                    <p className="signIn_text">Sign in</p>
    

                    <div className="form_wrapper">

                        <label htmlFor="email">Email</label>

                        <input

                            onChange={this.onEmailChange}
                            onSubmit={this.checkInpus}
                            type='text'
                            id="email"
                            name="email"
                        />

                    </div>


                    <div className="form_wrapper">

                        <label htmlFor="password">Password</label>

                        <input

                            onChange={this.onPasswordChange}
                            type='password'
                            name="password"
                            id="password"

                        />

                    </div>
                    

                    <button onClick={this.onSubmitSignIn}>Sign in </button>
    

                    <div className="form_getin">
                        <span onClick={() => onRouteChange('regiter')}>Register</span>
                    </div>

                </form>

            </div>
    
        )

    }


} 

export default SignIn