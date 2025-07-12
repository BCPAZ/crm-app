import { BASE_URL } from "@/utils/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

function generateBoundary() {
  let boundary = "";
  for (let i = 0; i < 32; i++) {
    boundary += Math.floor(Math.random() * 10).toString(16);
  }
  return boundary;
}

function serializeFormData(formData, boundary) {
  const serialized = [];
  for (const [name, value] of formData) {
    serialized.push(
      `--${boundary}\r\nContent-Disposition: form-data; name="${name}"\r\n\r\n${value}\r\n`
    );
  }
  serialized.push(`--${boundary}--\r\n`);
  return serialized.join("");
}

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    serializeRequest: (req) => {
      if (req.body instanceof FormData) {
        const boundary = generateBoundary();
        req.headers.set(
          "Content-Type",
          `multipart/form-data; boundary=${boundary}`
        );
        req.headers.delete("Content-Length");
        req.body = serializeFormData(req.body, boundary);
      }
      return {
        url: req.url,
        options: req,
      };
    },

    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      const { token, isAuthenticated } = state.auth;
      const { project } = state.project;
      headers.set("Accept", "application/json");
      if (isAuthenticated) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      if (project?.id) {
        headers.set("X-Project", project.id);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),

  tagTypes: [
    "POSITIONS",
    "ROLES",
    "PERMISSIONS",
    "MAILS",
    "USERS",
    "PROJECTS",
    "FIELDS",
    "COMPANIES",
    "MY_COMPANIES",
    "COMPANY_DETAILS",
    "COMPANY_USERS",
    "TEMPLATES",
    "DOCUMENTS",
    "INSIGHTS",
    "INVOICES",
    "BOARDS",
    "NOTIFICATIONS",
    "WORKFLOW",
    "INTERNAL_WORKFLOW",
    "GROUPPED_PROJECTS",
    "WORKS",
    "WORK",
  ],
});

export default api;
