import api from "@/lib/api";

export const googleLogin = () => {
  window.location.href = `${api.defaults.baseURL}/auth/google`;
};
