import { Grid, Link, Typography } from "@material-ui/core";
import { useCallback } from "react";
import { Loyalty } from "@material-ui/icons";

import { useGlobalState } from "../utils";
import Logo from "../components/Logo";

const Home = () => {
	const stuff = useGlobalState(useCallback((e) => e.stuff, []));

	return (
		<Grid
			container
			alignItems="center"
			justifyContent="center"
			textAlign="center"
			direction="column"
			bgcolor="secondary.main"
			height="100vh"
		>
			<Grid item>
				<Logo />
			</Grid>
			<Grid item>
				<Typography variant="h4" sx={{ color: "common.white" }}>
					{"Edit "}
					<code>{"src/App.js"}</code>
					{" and save to reload."}
					<Loyalty />
				</Typography>
			</Grid>
			<Grid item>
				<Link href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					<Typography variant="h5">{stuff}</Typography>
				</Link>
			</Grid>
		</Grid>
	);
};

export default Home;
