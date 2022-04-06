import './SearchField.scss'

const SearchField = () =>{
    return(
        <div className='searchbar'>

            <input 
                className='searchbar_input' 
                type='text' 
                placeholder='Paste your link here'
            />
            <button className='searchbar_button'>{'Start'}</button>

        </div>
    )
}

export default SearchField