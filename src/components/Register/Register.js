import { Component } from "react"

class Register extends Component {
    constructor(props){
        super()

        this.state = {

            email: '',
            password: '',
            name: ''

        }

    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }


    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onRegisterForm = (event) => {
        event.preventDefault()
        
        if(!this.state.email || !this.state.password || !this.state.name){
            alert('Enter valid registration')
        } else {
            return (
                fetch('https://pacific-falls-36803.herokuapp.com/register', {
                    method: 'POST',
                    headers: {'Content-Type': 'Application/json'},
                    body: JSON.stringify({
                        email: this.state.email,
                        password: this.state.password,
                        name: this.state.name
                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        if(res === 'Enter valid registration'){
                            console.log(res)
                        } else {
                            this.props.loadUser(res)
                            this.props.onRouteChange('home')
                        }
                    })
                    .catch(error => {
                        console.log('An error occured on registering in', error)
                    })
            ),
            alert('Registering in')
        }

    }



    render(){

        return(
            <div className="register">

                <form className="form">
                    <p className="Register_text">{'Register'}</p>


                    <div className="form_wrapper">
                        <label htmlFor="name">{'Name'}</label>
                        <input

                            onChange={this.onNameChange}
                            type='text'
                            id="name"
                            name="name"

                        />
                    </div>


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


                    <button onClick={this.onRegisterForm}>{'Register'}</button>
                </form>
            </div>
        )

    }
}

export default Register