import { Task } from "../tipos/Task";
import { Platform } from "react-native";

const API_URL =
  Platform.OS === "web"
    ? "http://localhost:3000/todos"
    : "http://10.0.0.18:3000/todos";

export const getTasks = async () => {
  const res = await fetch(API_URL);
  const json = await res.json();
  console.log("GET /todos:", json);
  return json.data || [];
};

export const getTask = async (id: number): Promise<Task> => {
  const res = await fetch(`${API_URL}/${id}`);
  const json = await res.json();
  console.log("GET /todos/:id", json);
  return json.data;
};

export const createTask = async (task: any) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  const json = await res.json();
  console.log("POST /todos:", json);
  return json;
};

export const updateTask = async (id: number, task: Omit<Task, "id">) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  const json = await res.json();
  console.log("PUT /todos/:id", json);
  return json;
};

export const deleteTask = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  const json = await res.json();
  console.log("DELETE /todos/:id", json);
  return json;
};
