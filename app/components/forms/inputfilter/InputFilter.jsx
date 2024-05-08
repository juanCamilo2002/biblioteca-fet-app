import React, { useState, useEffect, useRef } from 'react';
import styles from './inputfilter.module.css';

const InputFilter = ({ values, selectedValue, onValueSelect, placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const optionsListRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setShowOptions(value.trim() !== '');
  };

  const handleOptionClick = (id, value) => {
    onValueSelect(id, value);
    setInputValue(value); // Autocompletar el nombre del autor en el campo de entrada
    setShowOptions(false);
  };

  const handleClickOutside = (event) => {
    if (optionsListRef.current && !optionsListRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Si el valor del input está vacío, también deselecciona el valor seleccionado
    if (inputValue.trim() === '') {
      onValueSelect(null, ''); // Aquí deberías pasar el valor adecuado para el ID del valor seleccionado
    }
  }, [inputValue, onValueSelect]);

  const filteredValues = values.filter(value =>
    value.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className={styles.authorSelector}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      {showOptions && filteredValues.length > 0 && (
        <ul className={styles.optionsList} ref={optionsListRef}>
          {filteredValues.map(value => (
            <li key={value.id} onClick={() => handleOptionClick(value.id, value[selectedValue])}>
              {value[selectedValue]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InputFilter;
