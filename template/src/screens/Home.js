import { Box, Grid, Link, Typography } from "@material-ui/core";
import { useCallback } from "react";
import { Loyalty } from "@material-ui/icons";

import { useGlobalState } from "../utils";
import logo from "../assets/images/logo.svg";

const Home = () => {
	const stuff = useGlobalState(useCallback((e) => e.stuff, []));

	return (
		<Box>
			<Grid container component="header" alignItems="center" justifyContent="center" direction="column" bgcolor="secondary.main" minHeight="100vh">
				<Grid item>
					<img src={logo} alt="logo" style={{ height: "40vmin" }} />
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
		</Box>
	);
};

export default Home;
