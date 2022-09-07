async function friendsList(e) {
  e.preventDefault();
  console.log("button clicked");
  const response = await fetch("/api/friendsList", {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("dashboard/friendsList/1");
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#friends").addEventListener("click", friendsList);
