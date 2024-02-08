import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Image({photo}){
  return(
    <figure>
      <img src={photo.url} alt={photo.title} />
      <figcaption>{
        photo.id}. <br />
        {photo.title}
      </figcaption>
    </figure>
  )
}

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 10;

  useEffect(() => {
    async function fetchPhotos(){
      try{
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=50');
        setPhotos(response.data);
      } catch(err){
        console.log(err);
      }
    }
    fetchPhotos();
  }, []);

  function handlePrevClick(){
    setCurrentPage(currentPage - 1);
  }
  function handleNextClick(){
    setCurrentPage(currentPage + 1);
  }

  const firstImgIndex = imagesPerPage*(currentPage - 1);
  const lastImgIndex = currentPage*imagesPerPage;
  const currentPagePhotos = photos.slice(firstImgIndex, lastImgIndex);

  return (
    <div>
      <h1>Photo Container SSR!</h1>
      <p>HTML page is rendered and sent from Server. <br />
        But, data fetching is on the client-side
      </p>
      <div className="container">
        <div className="controls">
          <button
            onClick={handlePrevClick}
            disabled={currentPage===1}
          >
            Previous
          </button>
          Page No. {currentPage}
          <button
            onClick={handleNextClick}
            disabled={lastImgIndex===photos.length}
          >
            Next
          </button>
        </div>
        <ul className="gallery">
          {currentPagePhotos.map((photo) => 
            {return (
              <li key={photo.id}>
                <Image photo={photo}></Image>
              </li>
            )})
          }
        </ul>
      </div>
    </div>
  );
}
