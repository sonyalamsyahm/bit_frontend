import React from 'react';
import {Provider} from 'react-redux';

import store from './src/_store';
import Apps from './src/screens';

const App = () => {
  return (
    <Provider store={store}>
      <Apps />
    </Provider>
  );
};
export default App;
