import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Homepage from './views/Homepage.js';
import Products from './views/Products.js';
import Order from './views/Order.js';
import Report from './views/Reports.js';

class App extends React.Component{

  render(){
    return(
      <BrowserRouter key='1'>
        <Switch key='01'>
            <Route key='001' exact path="/products/" component={Products} />
            <Route key='002' exact path="/order/:id/" component={Order}/>
            <Route key='003' exact path="/reports/" component={Report} />

            <Route key='004' component={Homepage} />
        </Switch>
      </BrowserRouter>
    )
  }
}


export default App;