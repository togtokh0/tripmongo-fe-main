import axios from "../axios";

const header = {};
export function axiosPost(path: string, data?: any) {
  return new Promise((resolve, reject) => {
    axios
      .post(path, data ? data : {}, header)
      .then((res: any) => resolve(res))
      .catch((e: any) => reject(e));
  });
}

export function axiosPut(path: string, data?: any) {
  return new Promise((resolve, reject) => {
    axios
      .put(path, data ? data : {}, header)
      .then((res: any) => resolve(res))
      .catch((e: any) => reject(e));
  });
}

export function axiosGet(path: string) {
  return new Promise((resolve, reject) => {
    axios
      .get(path, header)
      .then((res: any) => resolve(res))
      .catch((e: any) => reject(e));
  });
}

export function axiosDelete(path: string) {
  return new Promise((resolve, reject) => {
    axios
      .delete(path, header)
      .then((res: any) => resolve(res))
      .catch((e: any) => reject(e));
  });
}
