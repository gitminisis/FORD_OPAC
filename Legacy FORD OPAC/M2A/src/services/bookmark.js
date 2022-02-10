import axios from "axios";

export function bookmark(url, sisn) {
  return axios.post(url, `mcheckbox_${sisn}=${sisn}-DESCRIPTION`);
}
export function deleteBookmark(url, sisn) {
  return axios.post(url, `mcheckbox_1=${sisn}`);
}
export function deleteAllBookmakrs(url, sisnArray) {
  let sisn = sisnArray
    .map((el, index) => `mcheckbox_${index + 1}=${el}`)
    .join("&");
  return axios.post(url, sisn);
}

export function bookMarkAllOnPage(url, sisnArray) {
  let sisns = sisnArray
    .map((el, index) => `mcheckbox_${el}=${el}-DESCRIPTION`)
    .join("&");

  return axios.post(url, sisns); 
}
export function getNextPage(data) {
  let next_page = data.next_page;
  if (next_page) {
    return next_page.a._href;
  }
  return null;
}

export function getPrevPage(data) {
  let prev_page = data.prev_page;
  if (prev_page) {
    return prev_page.a._href;
  }
  return null;
}
