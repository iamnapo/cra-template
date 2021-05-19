import useSWR from "swr";
import ky from "ky/distribution";
import queryString from "query-string";
import constructUrl from "@iamnapo/construct-url";

const { REACT_APP_SERVER_URL } = process.env;

const rootApi = ky.extend({
	prefixUrl: constructUrl(REACT_APP_SERVER_URL),
});

const api = {
	get: (path, searchParams) => rootApi.get(path, { searchParams: queryString.stringify(searchParams) }).json(),
	post: (path, json) => rootApi.post(path, { json }).json(),
	put: (path, json) => rootApi.put(path, { json }).json(),
	patch: (path, json) => rootApi.patch(path, { json }).json(),
	delete: (path, json) => rootApi.delete(path, { json }).json(),
};

export default api;

export const useStuff = (shouldTry = true, flag = true) => {
	const url = "api/stuff/";
	const { data, error, mutate } = useSWR(shouldTry ? [url, flag] : null, () => api.get(url, { flag }));
	return { stuff: data, isLoading: !error && !data, isError: error, mutate };
};
