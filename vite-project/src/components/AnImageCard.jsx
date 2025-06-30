import css from "./AnImageCard.module.css";

const AnImageCard = ({ image, onImageClick }) => {
  if (!image.description) {
    image.description = "No description";
  } else if (image.description.length > 50) {
    image.description = image.description.slice(0, 50) + "...";
  } else if (image.description.length < 3) {
    image.description = "Description too short";
  }

  return (
    <div className={css["image-container"]} onClick={() => onImageClick(image)}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        style={{ cursor: "pointer" }}
      />
      <p className={css["photographer"]}>{image.user.name}</p>
      <p className={css["description"]}>{image.description}</p>
    </div>
  );
};

export default AnImageCard;
// This component renders an image card with a thumbnail, photographer's name, and a description.
