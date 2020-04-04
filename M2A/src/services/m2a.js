export function extractData(item) {
  return {
    item_link: item.item_link,
    media: item.item_media ? item.item_media : [],
    data: {
      item_sisn: {
        title: "SISN",
        type: "string",
        value: item.item_sisn
      },
      item_refd: {
        title: "Reference Code",
        type: "string",
        value: item.item_refd
      },
      item_title: {
        title: "Title",
        type: "string",
        value: item.item_title
      },
      item_level_desc: {
        title: "Level",
        type: "string",
        value: item.item_level_desc
      },
      item_date: {
        title: "Date",
        type: "string",
        value: item.item_date
      },
      item_subject: {
        title: "Subject(s)",
        type: "array",
        value: item.item_subject ? item.item_subject : []
      },
      item_box: {
        title: "Box",
        type: "string",
        value: item.item_box
      },
      item_box_qualifier: {
        title: "Box Qualifier",
        type: "string",
        value: item.item_box_qualifier
      },
      item_folder: {
        title: "Folder",
        type: "string",
        value: item.item_folder
      },

      item_collection: {
        title: "Collection",
        type: "string",
        value: item.item_collection
      },
      item_desc: {
        title: "Description",
        type: "string",
        value: item.item_box
      },
      item_location: {
        title: "Location",
        type: "array",
        value: item.item_location ? item.item_location : []
      },
      item_make: {
        title: "Make",
        type: "string",
        value: item.item_make
      },
      item_model: {
        title: "Model",
        type: "string",
        value: item.item_model
      },
      item_color: {
        title: "Color",
        type: "string",
        value: item.item_color
      }
    }
  };
}

export function getFirstImage(item) {
  let imageArray = item.media.filter(e => e.type === "Image");
  if (imageArray.length === 0) {
    return null;
  }
  return imageArray[0];
}

// export const DETAIL_DATA_FIELD = [
//   "item_refd",
//   "item_date",
//   "item_box_qualifier",
//   "item_box",
//   "item_folder",
//   "item_collection",
//   "item_location",
//   "item_level_desc",
//   "item_make",
//   "item_model",
//   "item_color",
//   "item_desc"
// ];

export const DETAIL_DATA_FIELD = ["item_refd", "item_date", "item_level_desc"];
