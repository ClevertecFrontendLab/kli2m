import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import classNames from 'classnames';

import crossImg from '../../assets/img/message/cross.svg';
import warningImg from '../../assets/img/message/warning.svg';
import { setValueError } from '../../redux/reducers/books-reducer';
import { RootState } from '../../redux/redux-store';

import './message.scss';

export const Message: React.FC<{ msg?: string }> = ({ msg }) => {
  const dispatch = useDispatch();

  const error = useSelector((state: RootState) => state.books.error);
  const status = useSelector((state: RootState) => state.books.status);
  const messageVisibleClass = error && status === 'failed' && 'alert';

  const onHandleCloseMessage = () => {
    dispatch(setValueError(null));
  };

  return (
    <section data-test-id='error' className={classNames('message-box', messageVisibleClass)}>
      <div className={classNames('message-box__content')}>
        <img src={warningImg} alt='warning' />
        {msg ? msg : error?.message}
      </div>
      <button className={classNames('message-box__btn-close')} type='button' onClick={onHandleCloseMessage}>
        <img src={crossImg} alt='close' />
      </button>
    </section>
  );
};
