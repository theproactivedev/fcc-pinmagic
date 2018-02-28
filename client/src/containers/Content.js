import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../presentational/Home';
import Board from './Board';

export default class Content extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/myBoard" component={Board} />
      </Switch>
    );
  }
}
