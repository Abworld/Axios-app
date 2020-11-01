//Get Request
function getTodos() {
  console.log("Get Request");
}
//Post Request
function addTodo() {
  console.log("Post Request");
}
//Put/Patch Request
function updateTodo() {
  console.log("Put/Patch Request");
}
//Delete Request
function removeTodo() {
  console.log("Delete Request");
}
//Custome Headers
function customHeaders() {
  console.log("Custom Headers");
}
//Simultaneous Data
function getData() {
  console.log("Simultaneous Request");
}

//Transform Request and Response
function transformResponse() {
  console.log("Transform Response");
}

//Error Handling
function errorHandling() {
  console.log("Error Handling");
}
//Cancel Token
function cancelToken() {
  console.log("Cancel Token");
}
//Cancel Token
function cancelToken() {
  console.log("Cancel Token");
}
// Interception request and responses

// show output in the browswer
function showOutput(res) {
  document.getElementById("res").innerHTML = `
         <div class="card card-body mb-4">
          <h5>Status: ${res.status}</h5> </div>

         <div class="card mt-3">
         <div class="card-header">Header</div>

         <div class="card-body"><pre>${JSON.stringify(
           res.headers,
           null,
           2
         )}</pre></div>
          </div>

         <div class="card mt-3">
         <div class="card-header">Data</div>
         </div>
         
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
