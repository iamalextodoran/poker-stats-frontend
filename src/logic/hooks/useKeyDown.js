import { useEffect } from 'react';

const handleKeyDown = (keyCombo, callback, event) => {
  const pressedKeys = [];

  if (event.metaKey) {
    pressedKeys.push('CMD');
  }

  if (event.shiftKey) {
    pressedKeys.push('SHIFT');
  }

  if (event.altKey) {
    pressedKeys.push('ALT');
  }

  if (event.ctrlKey) {
    pressedKeys.push('CTRL');
  }

  if (event.key !== 'Shift' && event.key !== 'Alt' && event.key !== 'Control' && event.key !== 'Meta') {
    pressedKeys.push(event.key?.toUpperCase());
  }

  if (pressedKeys.join(' + ') === keyCombo) {
    event.preventDefault();
    callback();
  }
};

const useKeyDown = (keyCombo, callback) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown.bind(null, keyCombo, callback));

    return () => {
      window.removeEventListener('keydown', handleKeyDown.bind(null, keyCombo, callback));
    };
  }, [keyCombo, callback]);
};

export default useKeyDown;
