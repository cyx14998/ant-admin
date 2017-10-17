/**
 * 登录界面
 */
import React from 'react';
import { connect } from 'react-redux';

class LoginPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="page login-page">
        <p>login page</p>
        <p>phone: {this.props.user.phone}</p>
        <p>password: {this.props.user.password}</p>
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(LoginPage);