import React from 'react'
import spinn from "../spin.gif"

function Spinner() {
    return (
        <>
             <div className="text-center my-4">
                <img src={spinn} alt="" />
            </div>
        </>
    )
}

export default Spinner
