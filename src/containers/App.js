import { Component } from "react"
import Particles from "react-tsparticles"
import Clarifai from 'clarifai'
import Header from "./Header/Header"
import Navigation from "../components/Navigation/Navigation"
import Logo from "../components/Logo/Logo"
import Rank from "../components/Rank/Rank"
import SearchField from "../components/SearchField/SearchField"
import FaceRecognition from '../components/FaceRecognition/FaceRecognition.js'
import SignIn from "../components/SignIn/SignIn"
import Register from "../components/Register/Register"
import "./App.scss"

/** Clarifai api config */
const app = new Clarifai.App({
    apiKey: '5b13487abef14b698fb0e37a305edeb1'
})

class App extends Component{
    constructor(){
        super()
        
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
            route: 'signIn',
            isSignedIn: false
        }
    }

    generateFaceBox = (box) => {
        this.setState({box: box})
    }

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

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input})
        // Setting up the Clarifai Api for the face detection
        app.models.predict(
            Clarifai.FACE_DETECT_MODEL,
            this.state.input
        )
        .then(response => {
            this.generateFaceBox(this.calculateFaceLocation(response))
        })
        .catch(err => {
            console.log(err)
        })
    }

    onRouteChange = (route) => {
        if(this.state.route === 'signIn'){
            this.setState({isSignedIn: false})
        } else if(this.state.route === 'home'){
            this.setState({isSignedIn: true})
        }
        this.setState({route: route})
    }

    render(){
        return(

            <div className="app">
                    <Particles className="particles"
                        // Particles background api settings
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
                    <Header>
                        <Logo />
                        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
                    </Header>
                    {
                        this.state.route === 'home'

                            ? <div>
                                <Rank />
                                <SearchField onInputChange={this.onInputChange} onSubmit={this.onButtonSubmit}/>
                                <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
                              </div>

                            : (
                                this.state.route === 'signIn'

                                ? <SignIn onRouteChange={this.onRouteChange}/>
                                : <Register onRouteChange={this.onRouteChange}/>
                            )
                    }
            </div>
        )
    }
}

export default App