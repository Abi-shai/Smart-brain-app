import './Navigation.scss'

const Navigation = ({onRouteChange, isSignedIn}) =>{
        if(isSignedIn) {
            return (
                <nav className='nav_bar'>
                    <p onClick={() => onRouteChange('signIn')} className='nav_options'>Sign out</p>
                </nav>
            )    
        } else {
            return (
                <nav className='nav_bar'>
                    <p onClick={() => onRouteChange('signIn')} className='nav_options'>Sign in</p>
                    <p onClick={() => onRouteChange('register')} className='nav_options'>Register</p>
                </nav>
            )
        }
}

export default Navigation