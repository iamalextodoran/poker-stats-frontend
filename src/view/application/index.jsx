import { useState } from 'react';

import DatePicker from 'Components/DatePicker';

const Application = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>

      <DatePicker value={value} onChange={onChange} />
    </div>
  );
};

export default Application;
