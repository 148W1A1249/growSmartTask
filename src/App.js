import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './components/header/header'
import MainContent from './components/mainContent/MainContent';
import ADDTab from './components/operation/add';
import UpdateTab from './components/operation/update';
import DeleteTab from './components/operation/delete';


function App() {
  return <>
   <div className="">
    <Header/>
     <Router>
       <Switch>
         <Route path="/"  component={MainContent} exact={true}/>
         <Route path="/add"  component={ADDTab} exact={true}/>
         <Route path="/update/:id"  component={UpdateTab} exact={true}/>
         <Route path="/delete/:id"  component={DeleteTab} exact={true}/>
       </Switch>
     </Router>
   </div>
  </>;
}

export default App;
