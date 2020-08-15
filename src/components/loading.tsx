import React from 'react'
import ReactLoading from 'react-loading'


export default function Loading(){
    return(
        <div className='loading-center'>
            <ReactLoading type={"spin"} color={'#000'} height={'60px'} width={'60px'} />
            <h6>Gathering data ...</h6>
        </div>
    )
}