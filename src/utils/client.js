// const baseURL = "http://localhost:3001";
const baseURL = "https://m94pjpjiah.execute-api.us-east-1.amazonaws.com";
const client = async (requestPath, requestParams = {}, contentType = "application/json") => {
	try {
		const response = await fetch(`${baseURL}${requestPath}`, {
			mode: 'cors',
			credentials: 'same-origin',
			headers: {
				'Content-Type': contentType,
			},
			...requestParams,
		});

		let returnResponse = response;
		if( contentType === "application/json" || requestParams.method !== "GET" ) {
			returnResponse = await response.json();
		} else {
			returnResponse = await response.blob()
		}

		return {
			success: response.ok,
			response: returnResponse,
		};
	} catch (error) {
		return {
			success: false,
			error,
		};
	}
};

export default client;
