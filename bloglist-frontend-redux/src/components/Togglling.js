import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const Togglling = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className='toggling'>
      <div style={hideWhenVisible}>
        {/* <button onClick={toggleVisibility}>{props.buttonLabel}</button> */}
        <Button
          variant='outline-dark'
          size='sm'
          type='submit'
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant='outline-dark' size='sm' onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  );
};

Togglling.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglling;
