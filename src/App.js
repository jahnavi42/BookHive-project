import './App.css';
import {Provider} from 'react-redux'
import store from './reduxStore/store.redux'
import {BrowserRouter} from 'react-router-dom'
import RouteHome from './components/routehome.component';
import {NotificationContainer} from 'react-notifications'
import 'react-notifications/lib/notifications.css';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <RouteHome/>
          <NotificationContainer/>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
