import React from 'react';

const Button = ({ style, id, name, color, func, subj }) => {
    return (
        <button style={style} onClick={func} id={id} name={name} className={`bg-${color}-500 hover:bg-${color}-700 text-white font-bold py-2 px-4 rounded-full`}>
            {subj}
        </button>
    )
}

export default Button;