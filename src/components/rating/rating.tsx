import React, { ReactNode } from 'react';

import './rating.scss';

export const Rating: React.FC<{ rating: number; isScore: boolean }> = ({ rating, isScore }): JSX.Element => {
  const fiveStar = Array(5).fill(false);

  const setStar = (classSvg: string, ind: number): ReactNode => (
    <svg
      key={`${ind + 1}`}
      className={classSvg}
      width='21'
      height='19'
      viewBox='0 0 21 19'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M10.0675 0.28749C10.2275 -0.0958305 10.7725 -0.0958298 10.9325 0.287491L13.3634 6.11167C13.4309 6.27326 13.5834 6.38368 13.7585 6.39766L20.0684 6.90174C20.4837 6.93492 20.6521 7.45136 20.3357 7.72144L15.5282 11.8251C15.3948 11.9389 15.3365 12.1176 15.3773 12.2878L16.8461 18.4235C16.9427 18.8274 16.5019 19.1465 16.1463 18.9301L10.7441 15.6421C10.5943 15.5509 10.4057 15.5509 10.2559 15.6421L4.85369 18.9301C4.49814 19.1465 4.05728 18.8274 4.15395 18.4235L5.62271 12.2878C5.66347 12.1176 5.60521 11.9389 5.47182 11.8251L0.664335 7.72144C0.347928 7.45136 0.516322 6.93492 0.931612 6.90174L7.24153 6.39766C7.4166 6.38368 7.56911 6.27326 7.63656 6.11167L10.0675 0.28749Z' />
    </svg>
  );

  return (
    <section className='rating'>
      <div className='rating__stars'>
        {rating
          ? fiveStar.map((_, index) => (index > rating ? setStar('nostar', index) : setStar('star', index)))
          : fiveStar.map((_, index) => setStar('nostar', index))}
      </div>
      {isScore ? (
        rating ? (
          <span className='scores'>{rating}</span>
        ) : (
          <span className='noscores'>ещё нет оценок</span>
        )
      ) : (
        ''
      )}
    </section>
  );
};