import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './filter.module.css';

const Filter = ({ onFilterChange, initialValue }) => {
  const [selectedOption, setSelectedOption] = useState(initialValue);

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onFilterChange(selectedValue);
  };

  return (
    <select className={styles.select} value={selectedOption} onChange={handleOptionChange}>
      <option className={styles.option} value="show-all">
        Show All
      </option>
      <option className={styles.option} value="follow">
        Follow
      </option>
      <option className={styles.option} value="followings">
        Followings
      </option>
    </select>
  );
};

export default Filter;

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  initialValue: PropTypes.string.isRequired,
};
