import { useState } from 'react';

import DatePicker from 'Components/DatePicker';

const Application = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div className='mx-auto w-96 my-20'>
      <DatePicker minDate='2024-01-10' maxDate='2024-01-25' value={value} onChange={onChange} />
    </div>
  );
};

export default Application;
