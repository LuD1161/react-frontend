import React from "react";
import { Link } from '@reach/router';
export default function Pet({ name, animal, breed, media, location, id }) {
  let hero = "http://placecorgi.com/300/300";
  if (media.length) {
    hero = media[0].small;
  }

  return (
    // <a> i.e. anchor tag was rebuilding the DOM
    // But we don't want that
    // Using `Link` it uses html history to render the page
    // Thus preserving the DOM and thus saving the context color
    // It's only if you use <a>
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
      </div>
    </Link>
  );
}
