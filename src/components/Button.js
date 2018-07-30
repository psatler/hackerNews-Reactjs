import React from 'react'

const Button = ({onClick, className='', children}) => {
    // const {
    //     onClick,
    //     className='', //defaulting to empty string when no className assigned
    //     children,
    // } = props;

    return (
        <button 
            onClick={onClick}
            className={className}
            type='button'
        >
            {children}
        </button>
    )
}

export default Button;
