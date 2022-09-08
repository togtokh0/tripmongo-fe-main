import axios from "axios";
import config from "./config/index";
function getCookie(c_name: string) {
  let i, x, y;
  const ARRcookies = document.cookie.split(";");
  for (i = 0; i < ARRcookies.length; i++) {
    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
    x = x.replace(/^\s+|\s+$/g, "");
    if (x == c_name) {
      return unescape(y);
    }
  }
}
axios.defaults.baseURL = config.BACK_END_URL;
axios.defaults.headers.common["Authorization"] = "Bearer " + getCookie("token");
const f: any = axios;
export default f;
