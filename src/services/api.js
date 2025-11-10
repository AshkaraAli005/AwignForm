import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://awign-document-verification-ndq2uig3ta-uc.a.run.app";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiRequest = (method, endpoint, data = {}, config = {}) => {
  return api({
    method,
    url: endpoint,
    data,
    ...config,
  })
    .then((response) => response.data)
    .catch((error) => {
      console.error(`API Error [${method.toUpperCase()} ${endpoint}]:`, error);
      throw error?.response?.data || error?.message || "Unknown error occurred";
    });
};


export const createAwignForm = (data) => apiRequest("post", "/generate-uuid", data);


export const getAwignFormData = (endpoint, config = {}) => {
  return apiRequest("get", endpoint, {}, config);
};

export const updateAwignFormData = (endpoint, data, config = {}) => {
  return apiRequest("patch", endpoint, data, config);
};

export const uploadAwignaFile = (endpoint, file, name = "file" , config = {}) => {
  const formData = new FormData();
  formData.append(name, file);

  return apiRequest("patch", `/${endpoint}`, formData, { 
    headers: { "Content-Type": "multipart/form-data" },
    ...config,
  });
};





export const postFormData = (endpoint, data, config = {}) => {
  return apiRequest("post", endpoint, data, config);
};





/**
 * ✅ File Upload request
 * Automatically handles multipart/form-data
 */
export const uploadFile = (endpoint, file, config = {}) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiRequest("post", endpoint, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    ...config,
  });
};


// ✅ Fetch form data by ID
export const getFormById = async (id) => {
  const response = await api.get(`/forms/${id}`);
  return response.data;
};

// ✅ Create new form
export const createForm = async (formData) => {
  const response = await api.post("/forms", formData);
  return response.data;
};

// ✅ Update existing form
export const updateForm = async (id, formData) => {
  const response = await api.patch(`/forms/${id}`, formData);
  return response.data;
};

// ✅ Upload a single file
// export const uploadFile = async (file) => {
//   const formData = new FormData();
//   formData.append("file", file);

//   const response = await api.post("/upload", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return response.data.url; // assuming backend returns { url: 'uploaded_file_url' }
// };

export default api;
