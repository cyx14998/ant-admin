import React from 'react';
import { 
	HashRouter as Router, // for static website
	Route, 
	Link,
	Switch
} from 'react-router-dom';


import LoginPage from '../containers/login';
import IndexPage from '../containers/index';
import NotFound  from '../containers/404';

import '../theme/reset.less';
import '../theme/index.less';

const App = () => (
	<Router>
		{/* Switch only render the first one that matches the current pathname. */}
		<Switch>
			{/* exact only match '/' */}
			<Route exact path="/" component={IndexPage} />
			<Route path="/login" component={LoginPage} />
			{/* both '/users' and '/users/:name' begin with '/users' */}
			{/* <Route path="/users" component={Users} /> */}

			{/* for default match when nothing to match */}
			<Route component={NotFound} />
		</Switch>
	</Router>
)

export default App;