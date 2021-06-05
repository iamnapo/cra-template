import { lazy, StrictMode, Suspense, useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Router, Switch, Route, useLocation } from "react-router-dom";
import { LinearProgress, CssBaseline, Slide, Alert, Button, Snackbar as MaterialSnackbar } from "@material-ui/core";
import { ThemeProvider, createTheme, StyledEngineProvider } from "@material-ui/core/styles";
import ReactGA from "react-ga";
import * as Sentry from "@sentry/browser";
import { LocalizationProvider, AdapterDateFns } from "@material-ui/lab";
import { SWRConfig } from "swr";
import shallow from "zustand/shallow";

import "./index.scss";

import SnackBar from "./components/SnackBar";
import history from "./history";
import { useGlobalState } from "./utils";
import api from "./api";
import * as serviceWorkerRegistration from "./service-worker-registration";
import reportWebVitals from "./report-web-vitals";

const Home = lazy(() => import("./screens/Home"));

Sentry.init({
	dsn: process.env.REACT_APP_SENTRY_DSN,
	environment: process.env.REACT_APP_SENTRY_ENVIRONMENT,
	ignoreErrors: ["ResizeObserver loop limit exceeded"],
	enabled: process.env.NODE_ENV === "production",
});
ReactGA.initialize(process.env.REACT_APP_GA, { testMode: process.env.NODE_ENV !== "production" });
const swrConfig = { revalidateOnFocus: false, shouldRetryOnError: false, fetcher: api.get };
const theme = createTheme({
	palette: {
		primary: {
			main: "#61dafb",
		},
		secondary: {
			main: "#282c34",
		},
	},
});

const App = () => {
	const { pathname } = useLocation();
	const [waitingWorker, setWaitingWorker] = useState(null);
	const [newVersionAvailable, setNewVersionAvailable] = useState(false);
	const { stuff, setStuff } = useGlobalState(useCallback((e) => ({
		stuff: e.stuff,
		setStuff: e.setStuff,
	}), []), shallow);

	const updateSW = useCallback(() => {
		waitingWorker?.postMessage({ type: "SKIP_WAITING" });
		setNewVersionAvailable(false);
		window.location.reload();
	}, [waitingWorker]);

	useEffect(() => {
		serviceWorkerRegistration.register({ onUpdate: ({ waiting }) => {
			setWaitingWorker(waiting);
			setNewVersionAvailable(true);
		} });
	}, []);

	console.log(stuff);

	useEffect(() => {
		setStuff("Learn React");
	}, [setStuff]);

	useEffect(() => {
		ReactGA.set({ page: pathname, anonymizeIp: true });
		ReactGA.pageview(pathname);
	}, [pathname]);

	return (
		<StyledEngineProvider injectFirst>
			<CssBaseline />
			<ThemeProvider theme={theme}>
				<SWRConfig value={swrConfig}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<main>
							<Switch>
								<Suspense fallback={<LinearProgress />}>
									<Route exact path="/" component={Home} />
								</Suspense>
							</Switch>
						</main>
						<SnackBar />
						<MaterialSnackbar
							open={newVersionAvailable}
							anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
							TransitionComponent={Slide}
							TransitionProps={{ direction: "up" }}
						>
							<Alert
								variant="filled"
								severity="info"
								sx={{ alignItems: "center", ".MuiAlert-action": { p: 0 } }}
								action={<Button color="inherit" size="small" onClick={updateSW} sx={{ p: 1 }}>{"update"}</Button>}
							>
								{"A new version is available!"}
							</Alert>
						</MaterialSnackbar>
					</LocalizationProvider>
				</SWRConfig>
			</ThemeProvider>
		</StyledEngineProvider>
	);
};

ReactDOM.render(
	<StrictMode>
		<Router history={history}>
			<App />
		</Router>
	</StrictMode>,
	document.querySelector("#root"),
);

serviceWorkerRegistration.register();
reportWebVitals(({ id, name, value }) => {
	ReactGA.event({ category: "Web Vitals", action: name, value: Math.round(name === "CLS" ? value * 1000 : value), label: id, nonInteraction: true });
});
