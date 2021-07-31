import React from 'react';

const border = {
    'red': "appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white",
    'grey': "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
}

const container = {
    'file': "w-full md:w-1/2 px-3 mb-6 md:mb-0",
    'occasion': "block uppercase tracking-wide text-gray-700  font-bold mb-2",
    'tag': "flex flex-wrap -mx-3 mb-6 w-full px-3",
    "location": "w-full md:w-1/3 px-3 mb-6 md:mb-0"
}

const TextInputs = ({label, id, p, placeholder, borderColor, cont}) => {
    return (
        <div className={container[cont]}>
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
            {label}
          </label>
            <input className={border[borderColor]} id={id} type="text" placeholder={ placeholder } />
            {p}
        </div>
    )
}

export default TextInputs;