import { Component } from "react"
import Particles from "react-tsparticles"
import Header from "./Header/Header"
import Navigation from "../components/Navigation/Navigation"
import NavigationOut from "../components/Navigation/NavigationOut"
import Logo from "../components/Logo/Logo"
import Rank from "../components/Rank/Rank"
import SearchField from "../components/SearchField/SearchField"
import FaceRecognition from '../components/FaceRecognition/FaceRecognition.js'
import SignIn from "../components/SignIn/SignIn"
import Register from "../components/Register/Register"
import "./App.scss"


const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signIn',

    user: {
        id: '',
        name: '',
        entries: 0,
        joined: ''
    }
}

class App extends Component{
    constructor(){
        super()
        this.state = initialState
    }


    // Handles the data received back from the server
    loadUser = (user) =>{
        this.setState({user: {
            id: user.id,
            name: user.name,
            entries: user.entries,
            joined: user.joined
        }})
    }


    // Handles the box defining the face of the person in the image 
    generateFaceBox = (box) => {
        this.setState({box: box})
    }


    // Handles the calculation of the face by Clarifai api
    calculateFaceLocation = (data) => {
        // Retreving data for the face bounding box
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
        const image = document.querySelector('#inputimage')

        const width = Number(image.width)
        const height = Number(image.height)

        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }


    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }


    // Handles the communication with the server on submitting the image 
    onPictureSubmit = () => {
        this.setState({imageUrl: this.state.input})
        fetch('https://pacific-falls-36803.herokuapp.com/imageurl', {
            method: 'POST',
            headers: {"Content-Type": "Application/json"},
            body: JSON.stringify({
                input: this.state.input
            })
        })
        .then(response => response.json())
        .then(response => {
            if(response) {

                fetch('https://pacific-falls-36803.herokuapp.com/image', {
                    method: 'PUT',
                    headers: {'Content-Type': 'Application/json'},
                    body: JSON.stringify({
                        id: this.state.user.id
                    })
                })
                    .then(res => res.json())
                    .then(entrie => {
                        this.setState(Object.assign(this.state.user, {entries: entrie}))
                    })
                    .catch(error => {
                        console.log("Couldn't been able to handle this image", error)
                    })

            }

            this.generateFaceBox(this.calculateFaceLocation(response))
        })
        .catch(err => {
            console.log(err)
        })
    }


    // Handles the route change of the application interface
    onRouteChange = (route) => {
        this.setState({route: route})

        // Remove all the state settled after the user enter the  signed out route
        if(route === 'signOut'){
            this.setState(initialState)
        }
    }


    render() {
        return(

            <div className="app">
                    <Particles className="particles"
                        
                        /** Particles background api configs */
                        id="tsparticles"
                        options={{
                            background: {
                            color: {
                                value: "#fffff",
                            },
                            },
                        fpsLimit: 120,
                        interactivity: {
                        events: {
                            onClick: {
                            enable: true,
                            mode: "push",
                            },
                            onHover: {
                            enable: true,
                            mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            bubble: {
                            distance: 800,
                            duration: 2,
                            opacity: 0.8,
                            size: 40,
                            },
                            push: {
                            quantity: 4,
                            },
                            repulse: {
                            distance: 200,
                            duration: 0.2,
                            },
                        },
                        },
                        particles: {
                        color: {
                            value: "#000000",
                        },
                        links: {
                            color: "#000000",
                            distance: 150,
                            enable: true,
                            opacity: 0.1,
                            width: .5,
                        },
                        collisions: {
                            enable: true,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outMode: "bounce",
                            random: false,
                            speed: 2,
                            straight: false,
                        },
                        number: {
                            density: {
                            enable: true,
                            area: 900,
                            },
                            value: 100,
                        },
                        opacity: {
                            value: 0.1,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            random: true,
                            value: 4,
                        }},
                        detectRetina: true,
                        }}
                    />


                    {
                        // Control flow system, to handle what should be displayed on the screen depending on the current route
                        this.state.route === 'home'

                        ? <div>
                                <Header>
                                    <Logo />
                                    <NavigationOut
                                        onRouteChange={this.onRouteChange}
                                    />
                                </Header>
                                <Rank
                                    name={this.state.user.name}
                                    entries={this.state.user.entries}
                                />
                                <SearchField
                                    onInputChange={this.onInputChange}
                                    onSubmit={this.onPictureSubmit}
                                />
                                <FaceRecognition
                                    box={this.state.box}
                                    imageUrl={this.state.imageUrl}
                                />
                          </div>

                        : (
                            this.state.route === 'signIn'
                            
                            ? <div className="content2">
                                <Header>
                                    <Logo />
                                    <Navigation onRouteChange={this.onRouteChange} />
                                </Header> 
                                <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                              </div>

                            : <div className="content2">
                                <Header>
                                <Logo />
                                <Navigation loadUser={this.loadUser} onRouteChange={this.onRouteChange} isSignIn={this.state.isSignIn}/>
                                </Header> 
                                <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                              </div>
                          )
                    }
            </div>
        )
    }
}

export default App