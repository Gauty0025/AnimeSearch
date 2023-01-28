import React from "react";
import { useLocation } from "react-router-dom";

function AnimeInfo() {
  const location = useLocation();

  const anime = location.state.anime;

  return (
    <div>
      <h2>{anime.name}</h2>
      <img src={anime.images.webp.large_image_url} alt={anime.name} />
    </div>
  );
}

export default AnimeInfo;
