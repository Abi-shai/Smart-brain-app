import './Rank.scss'

const Rank = ({name, entries}) =>{
    return(

        <div className='rank'>
            <div className='rank_data'>

                <p className='rank_data_info'>Hey {name} paste an image link and see what happens</p>
                <span className='rank_data_text'>{'Your current rank is...'}</span>
                <span className='rank_data_number'>{entries}</span>
                
            </div>
        </div>

    )
}

export default Rank