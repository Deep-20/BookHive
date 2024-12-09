import { useState } from "react";

/**
 * Custom React hook to persist state in localStorage
 * @param {string} keyName - Key to use for localStorage
 * @param {any} defaultValue - Default value if no value exists in localStorage
 * @returns {[any, Function]} - Returns stored value and setter function
 */
export const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Attempt to get stored value from localStorage
      const value = window.localStorage.getItem(keyName);

      if (value) {
        // If value exists, parse and return it
        return JSON.parse(value);
      }
      // If no value exists, set default value in localStorage
      window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
      return defaultValue;

    } catch (err) {
      // Return default value if localStorage is unavailable
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      // Save new value to localStorage
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.log(err)
    }
    // Update React state
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};
