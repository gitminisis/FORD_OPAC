import axios from "axios";
export function login(username, password) {
  let url =
    "http://mit.minisisinc.com/scripts/mwimain.dll?logon&application=UNION_VIEW&LANGUAGE=144&file=[MIT_ROOT]home.html&cookie=BOOKMARK";
  username = "javad";
  password = "titan";
  return axios({
    method: "post",
    url: url,
    data: "USERNAME=javad&USERPASSWORD=titan"
  });
}
