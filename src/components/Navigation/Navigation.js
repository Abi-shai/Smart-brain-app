import './Navigation.scss'

const Navigation = ({onRouteChange}) =>{
    return(

        <div className='nav_bar'>
            <div onClick={() =>onRouteChange('signIn')} className='nav_options'>{'Sign out'}</div>
        </div>
    )
}

export default Navigation