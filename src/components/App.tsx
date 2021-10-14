import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom'
import { UserProvider } from '../context/usersContext';
import UsersContainer from '../components/UsersContainer'
import ToDosContainer from './TodosContainer';


function App() {

  
  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <UsersContainer />
          </Route>  
          <Route path="/:id" children={<ToDosContainer />} />
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
