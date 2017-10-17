import React, { Component } from 'react';

import logo from './logo.svg';
import './index.less'

class App extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	render() {
		return (
			<div className="app-container">
				<div className="app-banner">banner</div>
				<h1>react with webpack</h1>
				<img src={logo} alt="logo" />
			</div>
		)
	}	
}

export default App;