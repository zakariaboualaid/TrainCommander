var React = require('react');
var ReactDOM = require('react-dom');
var SearchTicket = require('./search-ticket');

var element = React.createElement(SearchTicket);
ReactDOM.render(element, document.querySelector('.container'));
