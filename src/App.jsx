import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Toolbar from './components/Toolbar';
import Content from './components/Content';
import Sidenav from './components/Sidenav';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import About from './pages/About';
import Books from './pages/Books';
import Login from './pages/Login';
import Logout from './pages/Logout';
import NotFound from './pages/NotFound';
import Book from './pages/Book';

class App extends Component {
    state = {
      user: null
    }

    login = user => {
      this.setState({ user }, () => {
        this.props.history.push('/books');
      });
    }

    logout = () => {
      this.setState({ user: null });
      this.props.history.push('/login');
    }


    render() {
        return ( 
          <div className="app">
              <Toolbar user={this.state.user} />
              
              <Content>
              <Route path="/books" render={() => <Sidenav topics={this.props.topics}/>} />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/about" component={About} />
                  <Route path="/login" render={() => <Login onLogin={this.login}/>}/>
                  <Route path="/logout" render={() => <Logout onLogout={this.logout}/>}/>
                  <PrivateRoute path="/books/:topic/:book" component={Book} data={this.props.books} user={this.state.user} />} />
                  <PrivateRoute path="/books/:topic?"  component={Books} data={this.props.books} user={this.state.user} />} />
                  <Route path="/error" component={NotFound} />
                  <Route component={NotFound} />
                </Switch>
              </Content>
          </div>
        );
    }
}

export default withRouter(App);