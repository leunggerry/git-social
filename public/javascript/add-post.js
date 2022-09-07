async function newFormHandler(event) {
  event.preventDefault();

  console.log("post button clicked");
  const title = document.querySelector('input[name="post-title"]').value;
  const repo_name = document.querySelector('input[name="github-reponame"]').value;
  const github_repo_url = document.querySelector('input[name="github-repo-url"]').value;
  const text_body = document.querySelector('textarea[name="repo-description"]').value;

  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      repo_name,
      github_repo_url,
      text_body,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document.querySelector(".new-post-form").addEventListener("submit", newFormHandler);
