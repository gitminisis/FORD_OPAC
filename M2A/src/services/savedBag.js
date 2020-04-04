import { message } from "antd";

export function save(src, type) {
  if (!localStorage.getItem(type)) {
    localStorage.setItem(type, "[]");
  }

  let media = localStorage.getItem(type);

  media = JSON.parse(media);
  if (media.filter(e => e === src).length > 0) {
    return false;
  }
  media.unshift(src);
  media = JSON.stringify(media);
  localStorage.setItem(type, media);

  return true;
}

export function deleteItem(src, type) {
  let media = localStorage.getItem(type);
  console.log(type);
  media = JSON.parse(media);

  media = media.filter(e => {
    return e !== src;
  });
  media = JSON.stringify(media);

  localStorage.setItem(type, media);
}

export function getAll(type) {
  if (!localStorage.getItem(type)) {
    localStorage.setItem(type, "[]");
    return [];
  }

  let media = localStorage.getItem(type);
  media = JSON.parse(media);
  console.log(media);
  return media;
}

export function removeAll(type) {
  localStorage.setItem(type, "[]");
  return true;
}
export function copyURL(domId) {
  let url = document.getElementById(domId);
  url.select();
  document.execCommand("copy");

  message.success("URL Copied");
}
