import { useEffect, useState } from 'react';

import { mock } from 'Helpers';

const itemOffsetHeight = (totalHeight = 0, id = '') => {
  const elementHeight = document.querySelector(`#${id}`)?.offsetHeight || 0;
  totalHeight = totalHeight + elementHeight;
  return totalHeight;
};

const calculateHeight = ({ ids = [], setHeight = mock }) => {
  setHeight(ids.reduce(itemOffsetHeight, 0));
};

const useElementsHeight = ({ ids = [] }) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    calculateHeight({ setHeight, ids });
  }, [ids]);

  useEffect(() => {
    window.addEventListener('resize', calculateHeight.bind(null, { setHeight, ids }));
    return () => {
      window.removeEventListener('resize', calculateHeight.bind(null, { setHeight, ids }));
    };
  });

  return { height };
};

export default useElementsHeight;
