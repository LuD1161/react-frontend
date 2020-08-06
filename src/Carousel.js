import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0,
  };
  //   // solution - 1 for 'undefined' context of handleIndexClick
  //   constructor(props) {
  //     super(props);

  //     // this binds the handleIndexClick context to 'Carousel'
  //     // and starting it in the constructor ensures that it is
  //     // bound with the 'Carousel'
  //     this.handleIndexClick = this.handleIndexClick.bind(this);
  //   }
  static getDerivedStateFromProps({ media }) {
    let photos = ["http://placecorgi.com/600/600"];

    if (media.length) {
      // photos will be array of string of URLs of only 'large' photos
      photos = media.map(({ large }) => large);
    }

    return { photos };
  }

  //   handleIndexClick(event) {
  // solution - 2 for 'undefined' context of handleIndexClick
  // Rule of thumb ->
  //  1. Whenever you're passing functions down into children
  //  2. Or whenever you're doing event listeners do an arrow function
  //  Because that guarantees you that 'this' would be correct
  handleIndexClick = (event) => {
    // currently 'this' is of undefined context or 'window' context
    // but not of 'Carousel' context that we want it to be
    this.setState({
      //   anything that comes from DOM is a string
      // convert that to a number by placing a 'unary' operator
      // infront of it
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
