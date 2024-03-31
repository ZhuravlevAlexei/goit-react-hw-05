import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ btnName, onClick }) => {
  return (
    <button className={css.button} onClick={onClick} type="button">
      {btnName}
    </button>
  );
};

export default Button;

Button.propTypes = {
  btnName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
