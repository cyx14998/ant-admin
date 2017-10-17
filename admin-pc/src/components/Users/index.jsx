import React, { Component } from 'react';
import {
	Route,
	Link
} from 'react-router-dom';

import Detail from './detail';

import { connect } from 'react-redux';
import {
	addUser,
} from '../../actions/users';

// const _users = ['Lily', 'Lucy', 'Vica'];

class Users extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};

	  console.log('pathname /users was matched')
	}

	addUser() {
		var name = prompt('enter a user name: ');

		this.props._addUser(name)
	}

	render() {
		return (
			<div>
				<ul>
					{
						this.props.users.map(user => (
							<li key={user.id}><Link to={`/users/${user.name}`}>{user.name}</Link></li>
						))
					}
				</ul>

				<button style={{fontSize: '20px'}} onClick={this.addUser.bind(this)}> add user</button>

				<hr />

				<Route path="/users/:name" component={Detail} />
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		users: state.users
	}
}

function mapDispatchToProps(dispatch) {
	return {
		_addUser: function (name) {
			dispatch(addUser({name}))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);