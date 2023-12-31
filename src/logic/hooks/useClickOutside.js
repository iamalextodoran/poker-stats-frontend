import { useEffect } from 'react';

const handleClick = (ref, callback, e) => {
  if (ref.current && !ref.current.contains(e.target)) {
    callback();
  }
};

const listener = (ref, callback) => {
  document.addEventListener('mousedown', handleClick.bind(null, ref, callback));

  return () => {
    document.removeEventListener('mousedown', handleClick.bind(null, ref, callback));
  };
};

const useClickOutside = (ref, callback) => {
  useEffect(listener.bind(null, ref, callback));
};

export default useClickOutside;
