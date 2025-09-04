export async function fetchGitHubUser(username, token) {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers: token ? { Authorization: `token ${token}` } : {},
  });
  if (!res.ok) throw new Error("Failed to fetch GitHub user");
  return res.json();
}

export async function fetchGitHubRepos(username, token) {
  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
    headers: token ? { Authorization: `token ${token}` } : {},
  });
  if (!res.ok) throw new Error("Failed to fetch repos");
  return res.json();
}

export async function fetchGitHubReadme(owner, repo, token) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
    headers: {
      Accept: "application/vnd.github.v3.raw",
      ...(token ? { Authorization: `token ${token}` } : {}),
    },
  });
  if (!res.ok) return null; // some repos don’t have README
  return res.text();
}
