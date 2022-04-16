import './Navigation.scss'

const NavigationOut = ({ onRouteChange }) => {
    return (
        <nav className='nav_bar'>
            <p onClick={() => onRouteChange('signOut')} className='nav_options'>Sign out</p>
        </nav>
    )
}

export default NavigationOut