//Axio GLOBALS
// ** front end fetch data site: "https://jsonplaceholder.typicode.com/"
axios.defaults.headers.common["X-Auth-Token"] =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
// *** token url :"https://jwt.io/"**
//Get Request

// function getTodos() {
//   axios({
//     method: "get",
//     url: "https://jsonplaceholder.typicode.com/todos?_limit=5",// ?_limit added to reduced count
//   })
//     .then((res) => showOutput(res))
//     .catch((err) => console.log(err));
// }

//Get Request
function getTodos() {
  axios
    .get(
      "https://jsonplaceholder.typicode.com/todos?_limit=5",
      { timeout: 5000 } // ?_limit added to reduced count
    )
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// //Post Request
// function addTodo() {
//   axios({
//     method: "post",
//     url: "https://jsonplaceholder.typicode.com/todos", // ?_limit added to reduced count
//     data: {
//       title: "New Todo",
//       completed: false,
//     },
//   })
//     .then((res) => showOutput(res))
//     .catch((err) => console.log(err));
// }

//Post Request
function addTodo() {
  axios
    .post(
      "https://jsonplaceholder.typicode.com/todos", // ?_limit added to reduced count

      { title: "New Todo", completed: false }
    )
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}
//Put/Patch Request
function updateTodo() {
  // Put change entire data while patch change the attribute
  axios
    .patch(
      "https://jsonplaceholder.typicode.com/todos/1", // ?_limit added to reduced count

      { title: "Updated TodoPost", completed: true }
    )
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
  //In put userId oly update while userId and id both updated
}
//Delete Request
function removeTodo() {
  axios
    .delete(
      "https://jsonplaceholder.typicode.com/todos/1" // ?_limit added to reduced count
    )
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}
//Custome Headers
function customHeaders() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "sometoken",
    },
  };
  axios
    .post(
      "https://jsonplaceholder.typicode.com/todos",

      { title: "New Todo", completed: false },
      config
    )
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

//Simultaneous Data
function getData() {
  // running two diff data together..eg post and get together
  axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
      axios.get("https://jsonplaceholder.typicode.com/photos?_limit=5"),
    ])
    .then(
      axios.spread(
        (todos, posts) => showOutput(posts) + console.log(todos, posts)
      )
      // console.log(res[0]);// both replaced by spread
      // console.log(res[1]);
      //showOutput(res[1]);
    )

    .catch((err) => console.log(err));
}

//Transform Request and Response
function transformResponse() {
  const options = {
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "Hello World",
    },
    transformResponse: axios.defaults.transformResponse.concat((data) => {
      data.title = data.title.toUpperCase();
      return data;
    }),
  };
  axios(options).then((res) => showOutput(res));
}

//Error Handling
function errorHandling() {
  axios
    .get(
      "https://jsonplaceholder.typicode.com/todos?_limit=5 "
      // **validation function was later added but comment Out**
      // {
      //   validateStatus: function (status) {
      //     return status < 500; // Reject only if status is greater or equal 500
      //   },
      // }
    )
    .then((res) => showOutput(res))
    .catch((err) => {
      if (err.response) {
        //Server responded with a status other than 200 range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        if (err.response.status === 404) {
          alert("Error: Page not found!");
        }
      } else if (err.request) {
        //Request was made but there was no response
        console.error(err.request);
      } else {
        console.error(err.message);
      }
    });
}
//Cancel Token
function cancelToken() {
  const source = axios.CancelToken.source();
  axios
    .get("https://jsonplaceholder.typicode.com/todos?_limit=5", {
      CancelToken: source.token,
    })
    .then((res) => showOutput(res))
    .catch((thrown) => {
      if (axios.isCancel(thrown)) {
        console.log("Request canceled", thrown.message);
      }
    });
  if (true) {
    source.cancel("Request canceled! ");
  }
}
//Cancel Token
// function cancelToken() {
//   console.log("Cancel Token");
// }

// Interception request and responses

axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// AXIOS INSTANCE
const axiosInstance = axios.create({
  //One can have others customs setting
  baseURL: "https://jsonplaceholder.typicode.com",
});
//** below was highlighted so that it wont run */
// axiosInstance.get("/comments?_limit=5").then((res) => showOutput(res));
// show output in the browswer
function showOutput(res) {
  document.getElementById("res").innerHTML = `
         <div class="card card-body mb-4">
          <h5>Status: ${res.status}</h5> </div>

         <div class="card mt-3">
         <div class="card-header">Headers</div>

         <div class="card-body"><pre>${JSON.stringify(
           res.headers,
           null,
           2
         )}</pre></div>
          </div>

         <div class="card mt-3">
         <div class="card-header">Data</div>
         
         
         <div class="card-body"><pre>${JSON.stringify(
           res.data,
           null,
           2
         )}</pre></div></div>
         <div class="card mt-3">
         <div class="card-header">Config</div>
         <div class="card-body"><pre>${JSON.stringify(
           res.config,
           null,
           2
         )}</pre></div>
         </div>
          `;
}
// Event listener
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sims").addEventListener("click", getData);
document.getElementById("header").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
