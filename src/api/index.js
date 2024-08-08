import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_APP_API_URL;

const apiCall = async (url, method, data, token) => {

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  switch (method) {
    case "POST": {
      try {
        if (token) {
          const result = await axios.post(BASE_URL + url, data, { headers });
          return result;
        } else {
          const result = await axios.post(BASE_URL + url, data);
          return result;
        }
      } catch (err) {
        console.log("Err", err);
        return;
      }
    }
    case "GET": {
      try {
        if (token) {
          const result = await axios.get(BASE_URL + url, { headers, params: data });
          return result;
        } else {
          const result = await axios.get(BASE_URL + url, { params: data });
          return result;
        }
      } catch (err) {
        console.log("Err", err);
        return;
      }
    }
    case "PUT": {
      try {
        if (token) {
          const result = await axios.put(BASE_URL + url, data, { headers });
          return result;
        } else {
          const result = await axios.put(BASE_URL + url, data);
          return result;
        }
      } catch (err) {
        console.log("Err", err);
        return;
      }
    }
    case "PATCH": {
      try {
        if (token) {
          const result = await axios.patch(BASE_URL + url, data, { headers });
          return result;
        } else {
          const result = await axios.patch(BASE_URL + url, data);
          return result;
        }
      } catch (err) {
        console.log("Err", err);
        return;
      }
    }
    case "DELETE": {
      try {
        if (token) {
          const result = await axios.delete(BASE_URL + url, data, { headers });
          return result;
        } else {
          const result = await axios.delete(BASE_URL + url, data);
          return result;
        }
      } catch (err) {
        console.log("Err", err);
        return;
      }
    }
  }
};


export default apiCall