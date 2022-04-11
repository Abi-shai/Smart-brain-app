import './Navigation.scss'

const NavigationOut = ({ onRouteChange }) => {
    return (
        <nav className='nav_bar'>
            <p onClick={() => onRouteChange('signIn')} className='nav_options'>Sign out</p>
        </nav>
    )
}

export default NavigationOut