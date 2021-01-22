import React from 'react';
import NavBar from './NavBar.js';
import { Container } from '@material-ui/core'
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';

import SurveyPage from './pages/surveyPage.js';
import RecipeResultsPage from './pages/recipe-results.js';


function App() {
	//these are test items. Delete when the program is working.
	let testResults = [
		{
			name: 'Result 1',
			description: 'One',
			picture:
				'https://valentinascorner.com/wp-content/uploads/2020/07/Shrimp-Ceviche-Recipe-3.jpg',
		},
		{
			name: 'Result 2',
			description: 'Two',
			picture:
				'https://therecipecritic.com/wp-content/uploads/2015/10/porcupinemeatballs-650x975.jpg',
		},
		{
			name: 'Result 3',
			description: 'Three',
			picture:
				'https://sweetandsavorymeals.com/wp-content/uploads/2019/05/Grilled-Eggplant-Recipe-4.jpg',
		},
	];

	return (
		<Router>
			<NavBar></NavBar>
			<Container maxWidth="lg" className="App">
				<Switch>
					<Route path="/survey">
						<SurveyPage />
					</Route>

					<Route path="/recipe-results">
						<RecipeResultsPage results={testResults} />
					</Route>
				</Switch>
			</Container>
		</Router>
	);
}

export default App;
