import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AltRules from './components/AltRules';
import AltRulesComp from './components/AltRulesComp';
import Homepage from "./pages/Homepage";
import Friends from './pages/Friends';
import SearchGames from "./pages/SearchGames";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme/Theme";
import FunFact from "./components/FactArray";
import Profile from "./pages/Profile"

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: (process.env.NODE_ENV === 'production'? '/graphql' : 'http://localhost:3001/graphql'),
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('id_token');

	return {
	  headers: {
		...headers,
		authorization: token ? `Bearer ${token}` : '',
	  },
	};

});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});



function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<div className="App">
					<ThemeProvider theme={theme}>
						<Navbar />
						<FunFact />
							<Routes>
								<Route path="/" element={<Homepage/>}/>
								<Route path="/searchgames" element={<SearchGames/>}/>
								<Route path="/login" element={<Login/>} />
								<Route path="/signup" element={<Signup/>} />
								<Route path="/profile" element={<Profile/>}/>
								<Route path="/altrules" element={<AltRules/>}/>
								<Route path="/altrulescomp" element={<AltRulesComp/>}/>
								<Route path="/friends" element={<Friends/>}/>
								<Route path="*" element={<NotFound/>}/>
							</Routes>
							
						<Footer />
					</ThemeProvider>
				</div>
			</Router>
		</ApolloProvider>
	);
}

export default App;
