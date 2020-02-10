import React from 'react';

import "./form-input.scss";

const FormInput = ({handleChange, label, ...otherProps}) => (
    <div className="group">
        <input 
          className='form-input' 
          onChange={handleChange} 
          {...otherProps}
        />
        { /* otherProps.vale.length see if the user typed in.
             the code says, if a user type into ur label then
             apply the shrink class plus of the form-input-label
             class, to our label */
            label ? 
              (<label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
                     {label}
               </label>)
                : 
               null
        }
    </div>
);

export default FormInput;