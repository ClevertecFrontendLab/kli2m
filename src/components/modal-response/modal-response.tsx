import React from 'react';

import './modal-response.scss';

export const ModalResponse: React.FC<{ title: string; text: string; btnName: string; action: () => void }> = ({
  btnName,
  text,
  title,
  action,
}): JSX.Element => (
  <section className='modal-response'>
    <span className='modal-response__title'>{title}</span>
    <span className='modal-response__text'>{text}</span>
    <button className='modal-response__btn' type='button' onClick={action}>
      {btnName}
    </button>
  </section>
);