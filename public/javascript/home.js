// go to the login page
async function loginPage(event) {
    event.preventDefault();
  
    // const response = await fetch("/login", {
    //   method: "get",
    //   headers: { "Content-Type": "application/json" },
    // });
  
    // if (response.ok) {
    //   console.log("Successfully fetch login page");
    // }
    // else {
    //   alert(response.statusText);
    // }
    document.location.replace("/login");
  }

document.querySelector("#login-btn").addEventListener("click", loginPage);