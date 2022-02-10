import ImageGallery from "react-image-gallery";
import React from "react";
import { extractData } from "../../services/m2a";
import noImages from "../../assets/images/no-image.png";
class Carousel extends React.Component {
  constructor(props) {
    super(props);
    let rawData = this.props.data;
    let data = extractData(rawData.item);
    let images = data.media.filter(e => e.type === "Image");
    this.images =
      images.length > 0
        ? images.map(e => {
            return {
              original: e.high_res,
              thumbnail: e.low_res
            };
          })
        : null;
  }

  render() {
    if (!this.images) {
      return (
        <div id="noImageCarousel">
          {" "}
          <img src={noImages} />
        </div>
      );
    }
    return (
      <div id="detailCarousel">
        <ImageGallery showPlayButton={false} items={this.images} />
      </div>
    );
  }
}

export default Carousel;
