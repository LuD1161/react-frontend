import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from './ThemeContext';

class Details extends React.Component {
  state = { loading: true };
  // hooks don't work with class component
  // runs only once, so use this to get the ajax data and similar kind of things
  componentDidMount() {
    // props are passed from parent to child and are read-only
    // '=>' is important here because that maintains the 'context'
    // so 'this' references the correct thing
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false,
      });
    }, console.error);
  }
  // hard requirement for class component is `render`
  render() {
    if (this.state.loading) {
      return <h1>loading...</h1>;
    }
    const { animal, breed, location, description, name, media } = this.state;
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          {/* Since we can't pass hooks to class so we use it like this */}
          <ThemeContext.Consumer>
            {(themeHook) => (
              <button style={{ backgroundColor: themeHook[0] }}>
                Adopt {name}
              </button>
            )}

            {/* {([theme]) => (
              <button style={{ backgroundColor: theme }}>
                Adopt {name}
              </button>
            )} */}

          </ThemeContext.Consumer>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      {/* Spread operator */}
      <Details {...props} />
    </ErrorBoundary>
  );
}
