import React from 'react'

function Button({ content }) {
    const isEnable = false;


    return (
        <div>
            {isEnable &&  <h1>HELLO</h1>}
        </div>
    )
}

export default Button
