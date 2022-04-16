import './SearchField.scss'

const SearchField = ({onInputChange, onSubmit}) =>{
    return(
        <div className='searchbar'>

            <input 
                className='searchbar_input' 
                type='text' 
                placeholder='Insert a jpeg image here'
                onChange={onInputChange}
            />
            <button className='searchbar_button' onClick={onSubmit}>{'Start'}</button>

        </div>
    )
}

export default SearchField