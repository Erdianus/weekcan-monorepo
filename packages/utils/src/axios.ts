import axios, { type AxiosError, type AxiosRequestConfig } from "axios";

const Axios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_API}/api`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const authToken = (
  token: string,
): AxiosRequestConfig<any> | undefined => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const message: unknown = error.response.data.message;
    console.log(message);
    if (error.response.data.errors) {
      const errs = error.response.data.errors;

      error.message = Object.keys(errs)
        .slice(0, 1)
        .map((e) => {
          return errs[e].map((ee: any) => ee).join("\n");
        })
        .join("\n");
    } else if (typeof message === "string") {
      error.message = message;
    } else if (typeof message === "object") {
      error.message = Object.keys(message as any)
        // @ts-ignore
        .map((m: any) => message[m])
        .join("\n");
    }

    throw error;
  },
);

export const axiosError = (error: AxiosError) => {
  const { message, errors } = error.response?.data as {
    message: string;
    errors: any;
  };
  if (errors) {
    const errs = errors;
    error.message = Object.keys(errs)
      .slice(0, 1)
      .map((e) => {
        return errs[e].map((ee: any) => ee).join("\n");
      })
      .join("\n");
  } else if (typeof message === "string") {
    error.message = message;
  } else if (typeof message === "object") {
    error.message = Object.keys(message as any)
      // @ts-ignore
      .map((m: any) => message[m])
      .join("\n");
  }
};

export {
  Axios
}

export default Axios;
