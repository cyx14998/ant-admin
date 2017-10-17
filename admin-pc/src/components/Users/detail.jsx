import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
	updateUserAge
} from '../../actions/users'

class Detail extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	updateUserAge(id) {
		let age = prompt('update user age');
		this.props.dispatch(updateUserAge({id, age}))
	}

	render() {
		let name = this.props.match.params.name;
		let users = this.props.users;

		let user = users.find(u => u.name === name);

		if (!user) {
			return <div>can't find user from database compare the pathname!</div>
		}

		return (
			<div>
				<h2>hi, my name is {user.name}, my age is {user.age}</h2>
				<button style={{fontSize: '20px'}} onClick={this.updateUserAge.bind(this, user.id)}>updateUserAge</button>
			</div>
		)
	}
}

Detail.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			name: PropTypes.string.isRequired
		})
	})
}


function mapStateToProps(state) {
	return {
		users: state.users
	}
}


export default connect(mapStateToProps)(Detail);