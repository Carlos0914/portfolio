// const baseURL = "https://m94pjpjiah.execute-api.us-east-1.amazonaws.com";
const baseURL = "http://localhost:3001";

const client = (endpoint, body, method, customHeaders, customConfig) => {
  try {
    const config = {
      headers: {
        // "Content-Type": "application/json",
        ...customHeaders,
      },
      ...(body && {
        body: `${customHeaders["Content-Type"]}`.includes("json")
          ? JSON.stringify(body)
          : body,
      }),
      method: method || "POST",
      ...customConfig,
    };

    console.log(config);
    return fetch(`${baseURL}/${endpoint}`, config).then(async (response) => {
      console.log(response);
      const data = await response.json();
      if (response.ok) {
        return {
          success: true,
          response: data,
        };
      } else {
        return {
          success: false,
          response: data,
        };
      }
    });
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export default client;
