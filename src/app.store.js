import { combineReducers } from 'redux';
import { app } from './app.module';
import { usersReducer } from './app.reducers';

app.config([
  '$ngReduxProvider',
  $ngReduxProvider => {
    $ngReduxProvider.createStoreWith(
      combineReducers({
        users: usersReducer,
      }),
    );
  },
]);
