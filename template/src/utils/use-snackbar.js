import { useCallback } from "react";
import { useSnackbar as useSnackbar_ } from "notistack";

const useSnackbar = () => {
	const { enqueueSnackbar } = useSnackbar_();

	const success = useCallback((msg = "Done.") => enqueueSnackbar(msg, { variant: "success" }), [enqueueSnackbar]);
	const error = useCallback((msg = "Something went wrong. Please try again later.") => enqueueSnackbar(msg, { variant: "error" }), [enqueueSnackbar]);

	return { success, error };
};

export default useSnackbar;
