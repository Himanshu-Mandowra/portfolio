import authClient from "../api/authClient";

export async function getProjects() {
  const response = await authClient.get("/projects");
  return response.data.data;
}

export async function createProject(payload, token) {
  const response = await authClient.post("/projects", payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data.data;
}

export async function updateProject(id, payload, token) {
  const response = await authClient.put(`/projects/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data.data;
}

export async function deleteProject(id, token) {
  const response = await authClient.delete(`/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data.data;
}

