import { useState, useEffect } from 'react';
import './App.css';

function App() {
	const [jokes, setJokes] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchJokes() {
			let fetchedJokes = [];
			while (fetchedJokes.length < 10) {
				try {
					const response = await fetch('https://v2.jokeapi.dev/joke/Programming');
					const data = await response.json();
					if (data.joke) {
						let hasSetup = true;
						let setup = data.setup;
						let delivery = data.delivery;
						let tags = 'twopart';
						if (data.type === 'single') {
							hasSetup = false;
							setup = data.joke;
							delivery = '';
							tags = 'single';
						}
						fetchedJokes.push({
							setup,
							delivery,
							hasSetup,
							tags,
						});
					}
				} catch (error) {
					setError('Error fetching jokes.');
					break;
				}
			}
			setJokes(fetchedJokes);
		}
		fetchJokes();
	}, []);

	return (
		<div className='container'>
			<h1>Jokes-On-You</h1>
			{error && <p className='error'>{error}</p>}
			{!error && (
				<table>
					<thead>
						<tr>
							<th>No.</th>
							<th>Tags</th>
							<th>Joke</th>
						</tr>
					</thead>
					<tbody>
						{jokes.map((joke, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>
									{joke.hasSetup ? 'Setup' : 'Joke'} {joke.hasSetup && ' / Delivery'}
								</td>
								<td>
									{joke.hasSetup && <span className='tag'>setup:</span>} {joke.setup}{' '}
									{joke.hasSetup && <span className='tag'>delivery:</span>} {joke.delivery}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}

export default App;
