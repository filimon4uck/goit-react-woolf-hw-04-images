import { useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import getImages from 'service/pictures-api';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import style from './App.module.css';
const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const data = await getImages(query, page);
        const { hits: newImages } = data;
        setImages(prev => [...prev, ...newImages]);
        setLoadMore(page < Math.ceil(data.totalHits / 15));
        setIsEmpty(
          prev => newImages?.length === 0 && prev.images?.length === 0
        );
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (!query) {
      return;
    }
    fetchImages();
  }, [page, query]);

  const handelSubmit = textToSearch => {
    if (textToSearch === query) {
      alert('Is the same word');
      return;
    }
    setQuery(textToSearch);
    setImages([]);
    setPage(1);
    setLargeImageURL('');
    setError('');
    setIsLoading(false);
    setShowModal(false);
    setLoadMore(false);
  };

  const handelImageClick = largeImageURL => {
    setLargeImageURL(largeImageURL);
    setShowModal(true);
  };

  const closeModalImage = () => {
    setShowModal(false);
    setLargeImageURL('');
  };
  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className={style.app}>
      <Searchbar submit={handelSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} handelImageClick={handelImageClick} />
      )}
      {isEmpty && <h2>Sorry there are not images</h2>}
      {error && <h2>error</h2>}
      {loadMore && <Button onClick={handleLoadMore} />}
      {isLoading && <Loader />}
      {showModal && largeImageURL && (
        <Modal largeImageURL={largeImageURL} onClose={closeModalImage} />
      )}
    </div>
  );
};

export default App;
