import { getPath } from "../main.js";

const API_ME = "http://localhost:8080/cliente/me";

export async function obtenerUsuarioActual() {
  const token = localStorage.getItem("jwt");
  console.log("TOKEN EN AUTH:", token);
  if (!token) return null;

  try {
    const res = await fetch(API_ME, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) return null;

    return await res.json();
  } catch {
    return null;
  }
}

export function cerrarSesion() {
  localStorage.removeItem("jwt");
  window.location.href = getPath("login.html");
}

