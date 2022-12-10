const BASE_URL = "https://notes-app-back-end-production.up.railway.app";

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function putAccessToken(accessToken) {
  return localStorage.setItem("accessToken", accessToken);
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function login({ username, password }) {
  const response = await fetch(`${BASE_URL}/authentications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const responseJson = await response.json();
  console.log(responseJson);

  if (responseJson.status !== "success") {
    alert(responseJson.message);
    // sweetAlertError(responseJson.message);

    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function signUp({ fullname, username, password }) {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fullname, username, password }),
  });

  const responseJson = await response.json();
  console.log(responseJson);

  if (responseJson.status !== "success") {
    alert(responseJson.message);
    // sweetAlertError(responseJson.message);
    return { error: true };
  }

  return { error: false };
}

async function getUserLogged() {
  const response = await fetchWithToken(`${BASE_URL}/users/me`);
  const responseJson = await response.json();

  console.log(responseJson.data)

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

export { getAccessToken, putAccessToken, login, signUp, getUserLogged };