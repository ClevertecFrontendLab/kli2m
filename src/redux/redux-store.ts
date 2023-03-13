import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './reducers/auth-reducer';
import { booksReducer } from './reducers/books-reducer';
import { cardViewReducer } from './reducers/card-view-reducer';
import { menuReducer } from './reducers/menu-reducer';
import { navReducer } from './reducers/navigation-reducer';
import { regReducer } from './reducers/reg-reducer';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    nav: navReducer,
    cardView: cardViewReducer,
    books: booksReducer,
    auth: authReducer,
    reg: regReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
