import React, { useEffect, useState } from "react";
import axios from "axios";

const Axios = () => {
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);

  // AXIOS GLOBALS
  axios.defaults.headers.common["X-Auth-Token"] =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  // useEffect(() => {
  //   const getData = async () => {
  //     const result = await axios.get(
  //       "https://jsonplaceholder.typicode.com/todos?_limit=5",
  //       {
  //         timeout: 5000
  //       }
  //     );
  //     setRes(result);
  //   };
  //   getData();
  // }, []);

  // function getTodos() {
  //   axios({
  //     method: 'get',
  //     url: 'https://jsonplaceholder.typicode.com/todos',
  //     params: {
  //       _limit: 5
  //     }
  //   })
  //     .then(res => showOutput(res))
  //     .catch(err => console.error(err));
  // }

  // GET TODOS
  const getTodos = async () => {
    setLoading(true);
    const result = await axios.get(
      "https://jsonplaceholder.typicode.com/todos?_limit=5",
      {
        timeout: 5000
        //params:{_limit:5}
      }
    );
    setRes(result);
    setLoading(false);
  };

  // const getRequest = async () => {
  //   try {
  //     const result = await fetch(
  //       "https://jsonplaceholder.typicode.com/todos?_limit=5",
  //       {
  //         method: "Get",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json"
  //         }
  //       }
  //     );
  //     let resolved = await result.json(); // gives data
  //     console.log(result);
  //     console.log(resolved);
  //     setRes(result);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  // ADD TODO
  const addTodo = async () => {
    setLoading(true);
    const result = await axios({
      method: "post",
      url: "https://jsonplaceholder.typicode.com/todos",
      data: {
        title: "New Todo",
        completed: false
      }
    });
    setRes(result);
    setLoading(false);
  };

  // const addTodo = async () => {
  //   setLoading(true);
  //   const result = await axios.post(
  //     "https://jsonplaceholder.typicode.com/todos",
  //     {
  //       title: "New Todo",
  //       completed: false
  //     }
  //   );
  //   setRes(result);
  //   setLoading(false);
  // };

  // EDIT WITH PATCH
  const editTodo = async id => {
    setLoading(true);
    const result = await axios.patch(
      //patch changes only part, put changes alll
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        title: "Updated Todo",
        completed: true
      }
    );
    setRes(result);
    setLoading(false);
  };

  // DELETE
  const deleteTodo = async id => {
    setLoading(true);
    const result = await axios.delete(
      //patch changes only part, put changes alll
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    setRes(result);
    setLoading(false);
  };

  const getData = async () => {
    try {
      setLoading(true);
      const result = await axios.all([
        axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
        axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5")
      ]);
      const [todos, posts] = result;
      setRes(posts);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // CUSTOM HEADERS
  function customHeaders() {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "sometoken"
      }
    };

    axios
      .get("https://jsonplaceholder.typicode.com/todos", config)
      .then(result => setRes(result))
      .catch(err => console.error(err));
  }

  const transformResponse = () => {
    const options = {
      method: "post",
      url: "https://jsonplaceholder.typicode.com/todos",
      data: {
        title: "Hello World"
      },
      transformResponse: axios.defaults.transformResponse.concat(data => {
        data.title = data.title.toUpperCase();
        return data;
      })
    };

    axios(options).then(res => setRes(res));
  };

  const errorHandling = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todoss", {
        // validateStatus: function(status) {
        //   return status < 500; // Reject only if status is greater or equal to 500
        // }
      })
      .then(res => setRes(res))
      .catch(err => {
        if (err.response) {
          // Server responded with a status other than 200 range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);

          if (err.response.status === 404) {
            alert("Error: Page Not Found");
          }
        } else if (err.request) {
          // Request was made but no response
          console.error(err.request);
        } else {
          console.error(err.message);
        }
      });
  };

  const cancelToken = () => {
    const source = axios.CancelToken.source();

    axios
      .get("https://jsonplaceholder.typicode.com/todos", {
        cancelToken: source.token
      })
      .then(res => setRes(res))
      .catch(thrown => {
        if (axios.isCancel(thrown)) {
          console.log("Request canceled", thrown.message);
        }
      });

    if (true) {
      source.cancel("Request canceled!");
    }
  };

  // AXIOS INSTANCE
  const axiosInstance = axios.create({
    // Other custom settings
    baseURL: "https://jsonplaceholder.typicode.com"
  });
  // axiosInstance.get('/comments').then(res => setRes(res));

  axios.interceptors.request.use(
    config => {
      console.log(
        `${config.method.toUpperCase()} request sent to ${
          config.url
        } at ${new Date().getTime()}`
      );

      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  // REAL APPLICATION USE
  // export const signinUser = (email, password) => async dispatch => {
  //   dispatch(clearErrors());
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   };
  //   const body = JSON.stringify({ email, password });
  //   try {
  //     const res = await axios.post("/api/auth/signin", body, config);
  //     dispatch({
  //       type: LOGIN_SUCCESS,
  //       payload: res.data
  //     });
  //     dispatch(loadUser());
  //   } catch (err) {
  //     const error = err.response.data.error;
  //     //   if (error) {
  //     //     dispatch(setAlert(error, "danger"));
  //     //   }
  //     //   dispatch({
  //     //     type: LOGIN_FAIL
  //     //   });
  //     //   return error;
  //     // }

  //     dispatch({
  //       type: GET_ERRORS,
  //       payload: error
  //     });
  //     return error;
  //   }
  // };

  // REAL APPLICATION USE
  const setAuthToken = token => {
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
    } else {
      delete axios.defaults.headers.common["x-auth-token"];
    }
  };

  // REAL APPLICATION USE
  const setAuthToken2 = token => {
    if (token) {
      // apply for every request
      axios.defaults.headers.common["Authorization"] = token;
    } else {
      // delete auth header
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // REAL APPLICATION USE
  // if (localStorage.token) {
  //   setAuthToken(localStorage.token);
  // }
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);

  return (
    <div>
      <div className="container my-5">
        <div className="text-center">
          <h1 className="display-4 text-center mb-3">Axios Crash Course</h1>
          <button
            className="btn btn-primary my-3 mr-1"
            id="get"
            onClick={() => getTodos()}
          >
            GET
          </button>
          <button
            className="btn btn-info mr-1"
            id="post"
            onClick={() => addTodo()}
          >
            POST
          </button>
          <button
            className="btn btn-warning mr-1"
            id="update"
            onClick={() => editTodo(1)}
          >
            PUT/PATCH
          </button>
          <button
            className="btn btn-danger mr-1"
            id="delete"
            onClick={() => deleteTodo(1)}
          >
            DELETE
          </button>
          <button
            className="btn btn-secondary mr-1"
            id="sim"
            onClick={() => getData()}
          >
            Sim Requests
          </button>
          <button
            className="btn btn-secondary mr-1"
            id="headers"
            onClick={() => customHeaders()}
          >
            Custom Headers
          </button>
          <button
            className="btn btn-secondary mr-1"
            id="transform"
            onClick={() => transformResponse()}
          >
            Transform
          </button>
          <button
            className="btn btn-secondary mr-1"
            id="error"
            onClick={() => errorHandling()}
          >
            Error Handling
          </button>
          <button
            className="btn btn-secondary mr-1"
            id="cancel"
            onClick={() => cancelToken()}
          >
            Cancel
          </button>
        </div>
        <hr />
        <div id="res"></div>
      </div>
      {res ? (
        <div>
          <div className="card card-body mb-4">
            <h5>Status: ${JSON.stringify(res.status, null, 2)}</h5>
          </div>
          <div className="card mt-3">
            <div className="card-header">Headers</div>
            <div className="card-body">
              <pre>${JSON.stringify(res.headers, null, 2)}</pre>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-header">Data</div>
            <div className="card-body">
              <pre>${JSON.stringify(res.data, null, 2)}</pre>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-header">Config</div>
            <div className="card-body">
              <pre>${JSON.stringify(res.config, null, 2)}</pre>
            </div>
          </div>
        </div>
      ) : loading ? (
        "Loading..."
      ) : null}
    </div>
  );
};

export default Axios;


// import axios from "axios";

// export default axios.create({
//   baseURL: "http://831e924e.ngrok.io"
// });

// import trackerApi from "../api/tracks";
// const res = await trackerApi.post("/api/auth/signup", { email, password });