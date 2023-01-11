import { auth, logout } from './auth';
import { getConfig } from './config';
import { errors } from './notifications';

export const fetchAPI = async (
	url: string,
	method: string = "GET",
	body: BodyInit | string | null = null
) => {
	const response = await fetch(getConfig<string>("api.path") + url, {
		method: method,
		headers: {
			Authorization: "Bearer " + auth.value.token,
		},
		body: body,
	});

	const data = await response.json();

	if (response.status === 401) {
		logout();
		errors.value.push("Vous avez été déconnecté");
		throw new Error();
	}

	if (response.status === 400 || response.status === 404) {
		errors.value.push(data.message);
		throw new Error();
	}

	if (response.status !== 200) {
		errors.value.push("Une erreur est survenue");
		throw new Error(data.message);
	}

	return data;
};