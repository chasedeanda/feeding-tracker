import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import _ from 'lodash';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import { createContainer } from 'meteor/react-meteor-data';
import { Feeds} from '../api/_collections.js';
let {array} = React.PropTypes;

//injectTapEventPlugin();
 
// App component - represents the whole app
let App = React.createClass({
  render() {
    if(this.props.feeds){
      return <AppComponent {...this.props}/>
    }else{
      return null
    }
  }
});

let AppComponent = React.createClass({
  propTypes:{
    feeds:array
  },
  getInitialState(){
    return{
      backgroundImage: '/images/cohen-bg.jpg',
      last_feed: this.props.feeds[0],
      open: false
    }
  },
  componentWillReceiveProps(nextProps){
    this.setState({
      last_feed: nextProps.feeds[0]
    })
  },
  trackFeed(e){
    Feeds.insert({
      date: new Date(),
      amount: 150,
      finished: true
    })
  },
  render() {
    return (
      <MuiThemeProvider>
        <div className="main-content clearfix" style={{backgroundImage: `url('${this.state.backgroundImage}')`}}>
          <span className="glyphicon glyphicon-menu-hamburger menu-toggle" onClick={(e)=>{this.setState({open:!this.state.open})}}></span>
          <div className="header">
            <span className="lead block bottom0"> Last time Cohen was fed: </span>
            <span className="feed-time">{moment(_.get(this.state.last_feed,'date')).format('hh:mm A')}</span>
            <hr/>
          </div>
          <button className="feed-btn center-block btn-lg" onClick={this.trackFeed}>Track Feed</button>
          <Drawer open={this.state.open} docked={false} onRequestChange={(open) => this.setState({open})}>
            <MenuItem>Home</MenuItem>
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
});
 
export default createContainer(() => {
  return {
    feeds: Feeds.find({},{sort: { date: -1 }}).fetch()
  };
}, App);


/* TODO LIST
1. Add background image collection
2. Have background rotate images
3. Image Uploader
4. Add feed tracking logic
*/