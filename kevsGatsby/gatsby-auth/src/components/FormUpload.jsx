import React from 'react';
import DatePicker from 'react-datepicker';


import TextInputs from './elements/TextInputs';


const FormUpload = ({startDate, setStartDate}) => (
    <>
        <div className="flex flex-wrap -mx-3 mb-6">
          <TextInputs
            label={'File Name(Required)'}
            id={'grid-first-name'}
            p={<p className="text-red-500 text-xs italic">Please fill out this field.</p>}
            placeholder={''}
            borderColor={'red'}
            cont={'file'}
          />

          <TextInputs
            label={'Occasion'}
            id={'occasion'}
            p={null}
            placeholder={'Bat Mitzvah'}
            borderColor={'grey'}
            cont={'occasion'}
          />
        </div>
        <TextInputs
            label={'Tag Categories(seperate by commas)'}
            id={'tags'}
            p={null}
            placeholder={"ex. vacation, birthday, honeymoon, thailand trip" }
            borderColor={'grey'}
            cont={'tag'}
          />

        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                  Date
              </label>
              <div className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <DatePicker
                  style={{ marginLeft: '10vw'}}
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  // CalendarContainer={MyContainer}
                  />
              </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
              File Type
            </label>
            <div className="relative">
              <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="file-type">
                <option>Image</option>
                <option>Video</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          <TextInputs
            label={'location'}
            id={'location'}
            p={null}
            placeholder={"ex. 90210 or Reno"}
            borderColor={'grey'}
            cont={'location'}

          />

        </div>
    </>
)

export default FormUpload;