import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchGames from "./pages/SearchGames";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme/Theme";
import SubmitBtn from "./components/SubmitBtn";

// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   createHttpLink,
// } from '@apollo/client';

import SearchGames from "./pages/SearchGames";
import PieChartDemo from "./pages/PieChartDemo";

// Construct our main GraphQL API endpoint
// const httpLink = createHttpLink({
//   uri: '/graphql',
// });

function App() {
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<Navbar />
				<SubmitBtn />
				<PieChartDemo />
				<SearchGames />
				<Footer />
			</ThemeProvider>
		</div>
	);
}

export default App;
