import "./App.css";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import getImages from "./components/getImages.js";
import searchImages from "./components/searchImages.js";
import AnImageCard from "./components/AnImageCard.jsx";
import Modal from "react-modal";

// Set the app element for accessibility
Modal.setAppElement("#root");

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [perPage, setPerPage] = useState(10);

  const customModalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "20px",
      maxWidth: "90vw",
      maxHeight: "90vh",
      overflow: "auto",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  // Component Section
  const Gallery = ({ toGallery }) => {
    return (
      <ul className="galleryUL">
        {toGallery.map((image) => (
          <li key={image.id}>
            <AnImageCard image={image} onImageClick={() => openModal(image)} />
          </li>
        ))}
      </ul>
    );
  };

  useEffect(() => {
    const fetchRandomImages = async () => {
      try {
        setIsLoading(true);
        const resimler = await getImages();
        setImages(resimler);
        setHasMore(resimler.length === perPage);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching random images:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRandomImages();
  }, [perPage]);

  const fetchSearchedImages = async (searchTerm, page = 1, itemsPerPage) => {
    try {
      setIsLoading(true);
      setSearchTerm(searchTerm);
      setCurrentPage(1);
      setPerPage(itemsPerPage);
      const resimler = await searchImages(searchTerm, page, itemsPerPage);
      console.log("resimler", resimler);
      setImages(resimler);
      setHasMore(resimler.length >= itemsPerPage);
    } catch (error) {
      setIsError(true);
      console.error("Error fetching searched images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMoreImages = async () => {
    if (!hasMore || isLoading) return;

    try {
      setIsLoadingMore(true);
      const nextPage = currentPage + 1;
      if (searchTerm === "") {
        return;
      }
      const moreImages = await searchImages(searchTerm, nextPage, perPage);

      if (moreImages.length === 0) {
        setHasMore(false);
        return;
      }

      setImages((prevImages) => [...prevImages, ...moreImages]);
      setCurrentPage(nextPage);
      setHasMore(moreImages.length === perPage);
    } catch (error) {
      setIsError(true);
      console.error("Error fetching more images:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <>
      <Toaster />
      <Header fetchSearchedImages={fetchSearchedImages} />

      {isError ? (
        <p className="error-message">Error fetching images</p>
      ) : isLoading ? (
        <div className="loading-container"></div>
      ) : images.length === 0 ? (
        <p className="no-images-found">No images found</p>
      ) : (
        <div>
          <Gallery toGallery={images} />
          {hasMore && (
            <button
              onClick={fetchMoreImages}
              disabled={isLoadingMore}
              style={{
                display: "block",
                margin: "20px auto",
                padding: "10px 20px",
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: isLoadingMore ? "not-allowed" : "pointer",
              }}
            >
              {isLoadingMore ? "Loading..." : "Load More"}
            </button>
          )}
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Image Modal"
      >
        {selectedImage && (
          <div style={{ textAlign: "center", position: "relative" }}>
            <img
              src={selectedImage.urls.regular}
              alt={selectedImage.alt_description}
              style={{ maxWidth: "100%", maxHeight: "80vh", display: "block" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "rgba(0, 0, 0, 0.7)",
                color: "white",
                padding: "15px",
                textAlign: "left",
              }}
            >
              <h3 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>
                {selectedImage.user.name}
              </h3>
              <p style={{ margin: 0, fontSize: "14px" }}>
                {selectedImage.description ||
                  selectedImage.alt_description ||
                  "No description available"}
              </p>
            </div>
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "rgba(0, 0, 0, 0.7)",
                border: "none",
                color: "white",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              ✕
            </button>
          </div>
        )}
      </Modal>
    </>
  );
}

export default App;
// This code is the main application component for a React app that displays images from an API.
