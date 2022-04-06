import './Logo.scss'
import brainImage from './assets/brain.png'

const Logo = () =>{
    return(
        <div className='logo_wrapper'>

            <img 
                className='logo_image' 
                src={brainImage} 
                alt='A representation of a brain'
            />

        </div>
    )
}

export default Logo