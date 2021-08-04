import React from 'react';

const EditInputs = ({id, data, i, num}) => (
    <div className="flex items-center border-b border-teal-500 py-2">
        <label htmlFor={id} className="bg-black text-white" >{id}</label>
        <input id={id} className="appearance-none  border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder={data[i][num] ? data[i][num] : 'None'} aria-label="Full name"/>
    </div>
)

export default EditInputs;