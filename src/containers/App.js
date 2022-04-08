import { Component } from "react"
import Particles from "react-tsparticles"
import Clarifai from 'clarifai'
import Header from "./Header/Header"
import Navigation from "../components/Navigation/Navigation"
import Content from "./Content/Content"
import Logo from "../components/Logo/Logo"
import Rank from "../components/Rank/Rank"
import SearchField from "../components/SearchField/SearchField"
import FaceRecognition from '../components/FaceRecognition/FaceRecognition.js'
import "./App.scss"

/** Clarifai api config */
const app = new Clarifai.App({
    apiKey: '5b13487abef14b698fb0e37a305edeb1'
});

class App extends Component{
    constructor(){
        super()
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
        }
    }

    generateFaceBox = (box) => {
        this.setState({box: box})
        console.log('Data:', box)
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
        const image = document.querySelector('#inputimage')
        console.log(clarifaiFace)

        // Retreving data for the face bounding box
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

    render(){
    
        return(

            <div className="app">

                    <Particles className="particles"
                    
                        // Particles background api settings
                        id="tsparticles"
                        options={{
                            background: {
                            color: {
                                value: "#ffffff80",
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
                            opacity: 0.3,
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
                            value: 0.5,
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
                    <Content>
                        <Header>
                            <Logo />
                            <Navigation />
                        </Header>
                        <Rank />
                        <SearchField onInputChange={this.onInputChange} onSubmit={this.onButtonSubmit}/>
                        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
                    </Content>

            </div>

        )
    }
}

export default App