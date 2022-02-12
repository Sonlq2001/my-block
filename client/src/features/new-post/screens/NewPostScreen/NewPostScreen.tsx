import { useState } from 'react';

import RichEditor from '../../components/RichEditor/RichEditor';
import HeaderPost from '../../components/HeaderPost/HeaderPost';

const NewPostScreen = (props: any) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    console.log(value);
  };

  return (
    <div>
      <div className="container">
        <HeaderPost />
        <RichEditor handleGetValueEditor={(value: string) => setValue(value)} />

        <button onClick={handleSubmit}>Xuất bản</button>
      </div>
    </div>
  );
};

export default NewPostScreen;
