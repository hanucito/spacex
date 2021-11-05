import './App.css';
import './assets/fonts/D-DIN.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {routes.map(( {...route } ) => (
            <Route key={route.path} {...route} />
          ))}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
