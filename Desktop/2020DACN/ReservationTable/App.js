import React from 'react';
import MainComponents from './components/MainComponents';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore';

const store = ConfigureStore();
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainComponents />
      </Provider>
    );
  }
}

export default App;
