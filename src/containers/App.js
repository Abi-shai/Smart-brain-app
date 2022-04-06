import { Component } from "react"
import Particles from "react-tsparticles"
import Header from "./Header/Header"
import Navigation from "../components/Navigation/Navigation"
import Logo from "../components/Logo/Logo"
import Rank from "../components/Rank/Rank"
import SearchField from "../components/SearchField/SearchField"
import "./App.scss"

class App extends Component{
    constructor(){
        super()

        this.state ={
            // Coming soon
        }
    }

    render(){
        return(

            <div className="app">

            <Particles className="particles"
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
                },
                },
                detectRetina: true,
                }}
                />

                <Header>
                    <Logo />
                    <Navigation />
                </Header>
                <Rank />
                <SearchField />

            </div>

        )
    }
}

export default App