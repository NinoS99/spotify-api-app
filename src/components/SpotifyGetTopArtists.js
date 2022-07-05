import React, { useEffect, useState } from "react";
import axios from "axios";

const ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists?time_range=medium_term";

const SpotifyGetTopArtists = () => {
  const [token, setToken] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);

  const handleGetArtists = () => {
     axios 
      .get(ARTISTS_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setData(response.data);

        let genreArray = new Array(19);
        let genreArray1D = new Array;
        for (let i = 0; i < 20; i++) {
          genreArray[i] = response.data.items[i].genres
        }
      
        genreArray1D = [].concat(...genreArray);
        console.log(genreArray1D);


      })
      .catch((error) => {
        console.log(error);
      });

    

  };

  return (
    <>
      <button onClick={handleGetArtists}>Get Top Artists</button>
      {data?.items ? data.items.map((item) => <p>{"Artist: " + item.name + " Popularity Rating: " + item.popularity}</p>) : null}
    </>
  );
};

export default SpotifyGetTopArtists;