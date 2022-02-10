import axios from "axios";
export function logout(sessionId) {
  let url = `${sessionId}?LOGOFF&file=[MIT_ROOT]home.html&cookie=BOOKMARK`;
 
  return axios({
    method: "post",
    url: url,
  
  });
}
