import { getCookie } from "./index";

export function getSearchHistory() {
  let searchHistoryCookie = getCookie("USEARCH_HISTORY");
  let searchHistory = [];

  if (searchHistoryCookie.length > 0) {
    let raw_detail = searchHistoryCookie.split("||");
    for (let i = 0; i < raw_detail.length - 1; i++) {
      let temp_arr = [];
      if (i % 3 === 0 || i == 0) {
        temp_arr = {
          hit: raw_detail[i],
          search_term: raw_detail[i + 1],
          keyword: raw_detail[i + 2]
        };
        searchHistory.push(temp_arr);
      }
    }
  }
  searchHistory = searchHistory.map((item, index) => {
    if (index === 0) {
      item.hit = item.hit.substring(2);
    }
    return item;
  });
  console.log(searchHistory)
  searchHistory.reverse();
  return searchHistory;
}
