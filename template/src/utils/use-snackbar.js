import { useCallback } from "react";
import create from "zustand";
import shallow from "zustand/shallow";

export const snackStore = create((set) => ({
	severity: "success",
	setSeverity: (severity) => set({ severity }),
	message: "Done.",
	setMessage: (message) => set({ message }),
	open: false,
	setOpen: (open) => set({ open }),
}));

const useSnackbar = () => {
	const { setSeverity, setMessage, setOpen } = snackStore(useCallback((e) => ({
		setSeverity: e.setSeverity,
		setMessage: e.setMessage,
		setOpen: e.setOpen,
	}), []), shallow);

	const success = useCallback((msg = "Done.") => {
		setMessage(msg);
		setSeverity("success");
		setOpen(true);
	}, [setMessage, setOpen, setSeverity]);

	const error = useCallback((msg = "Something went wrong. Please try again later.") => {
		setMessage(msg);
		setSeverity("error");
		setOpen(true);
	}, [setMessage, setOpen, setSeverity]);

	return { success, error };
};

export default useSnackbar;
