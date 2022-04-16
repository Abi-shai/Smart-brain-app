import './Header.scss'

const Header = (props) =>{
    return(
        <div className='header'>
            {props.children}
        </div>
    )
}

export default Header