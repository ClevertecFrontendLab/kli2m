import React, { ReactNode } from 'react';

import './auth.scss';

export const AuthPage: React.FC<{ child: ReactNode }> = ({ child }): JSX.Element => (
  <section className='auth-page'>
    <span className='auth-page__title'>Cleverland</span>
    <div className='auth-page__content'>{child}</div>
  </section>
);
