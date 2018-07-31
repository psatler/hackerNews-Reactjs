import React from 'react'
import PropTypes from 'prop-types'

const Button = ({onClick, className, children}) => {
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

Button.defaultProps = {
    className: '', //defaulting to empty string when no className assigned
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default Button;
