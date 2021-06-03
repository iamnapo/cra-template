import { Alert, Slide, Snackbar as MaterialSnackbar, Typography } from "@material-ui/core";
import { useCallback } from "react";
import shallow from "zustand/shallow";

import { snackStore } from "../utils";

const SnackBar = () => {
	const { severity, message, open, setOpen } = snackStore(useCallback(((e) => ({
		severity: e.severity,
		message: e.message,
		open: e.open,
		setOpen: e.setOpen,
	})), []), shallow);

	const handleClose = useCallback((_, reason) => {
		if (reason !== "clickaway") setOpen(false);
	}, [setOpen]);

	return (
		<MaterialSnackbar
			open={open}
			autoHideDuration={6000}
			onClose={handleClose}
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			TransitionComponent={Slide}
			TransitionProps={{ direction: "left" }}
		>
			<Alert onClose={handleClose} severity={severity} variant="filled" sx={{ alignItems: "center" }}>
				<Typography>{message}</Typography>
			</Alert>
		</MaterialSnackbar>
	);
};

export default SnackBar;
