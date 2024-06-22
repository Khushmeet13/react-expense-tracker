import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './background.css';

const BackgroundImage = () => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        fetchRandomImage();
      }, []);

    const fetchRandomImage = () => {
        const accessKey = '5075Q8MhMvGUOyacxNigN87M9MUwAfIkeomIh4GLxRE';
        axios.get(`https://api.unsplash.com/search/photos?page=1&query=budget&client_id=${accessKey}`)
          .then(response => {
            console.log(response.data);
            const results = response.data.results;
            if (Array.isArray(results) && results.length > 0) {
              const randomIndex = Math.floor(Math.random() * results.length);
              const randomImage = results[randomIndex];
              if (randomImage && randomImage.urls && randomImage.urls.regular) {
                setImageUrl(randomImage.urls.regular);
              } else {
                console.error('Error: Image URL not found in result');
              }
            } else {
              console.error('Error: No results found');
            }
          })
          .catch(error => {
            console.error('Error fetching random image:', error);
          });
      };

  return (
    <div className="background-container">
    {/* Background image */}
    <div
      className="background"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    ></div>

    {/* Linear gradient layer */}
    <div className="gradient-layer"></div>
  </div>
  )
}

export default BackgroundImage
