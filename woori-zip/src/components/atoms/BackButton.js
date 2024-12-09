import React from 'react';
import Image from 'next/image';
import gobackbutton from './button.png';
const BackButton = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
   
    <div onClick={goBack} style={styles.button}>
      <Image src = {gobackbutton} width={25} height={25}/>
    </div>
  );
};

const styles = {
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: '10px', 
  },
};
export default BackButton;
