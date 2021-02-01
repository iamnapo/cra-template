import { lazy, StrictMode, Suspense, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { Router, Switch, Route, useLocation } from "react-router-dom";
import { LinearProgress, StyledEngineProvider } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import ReactGA from "react-ga";
import * as Sentry from "@sentry/browser";
import { LocalizationProvider, AdapterDateFns } from "@material-ui/lab";
import { SWRConfig } from "swr";
import shallow from "zustand/shallow";

import "./index.scss";

import history from "./history";
import { useGlobalState } from "./utils";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

const Home = lazy(() => import("./screens/Home"));

Sentry.init({
	dsn: process.env.REACT_APP_SENTRY_DSN,
	environment: process.env.REACT_APP_SENTRY_ENVIRONMENT,
	ignoreErrors: ["ResizeObserver loop limit exceeded"],
	enabled: process.env.NODE_ENV === "production",
});
ReactGA.initialize(process.env.REACT_APP_GA, { testMode: process.env.NODE_ENV !== "production" });
const swrConfig = { revalidateOnFocus: false, shouldRetryOnError: false };
const theme = createMuiTheme({
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
	const { stuff, setStuff } = useGlobalState(useCallback((e) => ({
		stuff: e.stuff,
		setStuff: e.setStuff,
	}), []), shallow);

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
			<ThemeProvider theme={theme}>
				<SWRConfig value={swrConfig}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<SnackbarProvider anchorOrigin={{ vertical: "bottom", horizontal: "right" }} maxSnack={1}>
							<main>
								<Switch>
									<Suspense fallback={<LinearProgress />}>
										<Route exact path="/" component={Home} />
									</Suspense>
								</Switch>
							</main>
						</SnackbarProvider>
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
