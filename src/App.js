import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import SpotifyGetPlaylists from "./components/SpotifyGetPlaylists";
import SpotifyGetTopArtists from "./components/SpotifyGetTopArtists";

  const CLIENT_ID ="bfce29e7599b4915817a81ff158f472d"
  const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000"
  const SPACE_DELIMITER = "%20";
  const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const SCOPES = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "playlist-read-private",
    "user-top-read"
  ];
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);


  const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
      console.log(currentValue);
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
    }, {});
  
    return paramsSplitUp;
  };

  const App = () => {
    useEffect(() => {
      if (window.location.hash) {
        const { access_token, expires_in, token_type } =
          getReturnedParamsFromSpotifyAuth(window.location.hash);
  
        localStorage.clear();
  
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("tokenType", token_type);
        localStorage.setItem("expiresIn", expires_in);
      }
    });

    const handleLogin = (e) => {
      e.preventDefault();
      window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;


    };


    const handleLogout = () => {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("tokenType")
      localStorage.removeItem("expiresIn")
      localStorage.clear();

      window.location = window.location.origin;

  }

    console.log(localStorage.getItem("accessToken"));

  return (
    <div className="App">
      <header className="App-header">
        <h1> Spotify App </h1>

        {!window.location.toString().includes("access_token") ?  <button onClick={handleLogin}>Login to Spotify</button> 
        : <button onClick={handleLogout}>Logout of Spotify Account</button> 
         }

          <SpotifyGetPlaylists />
          <SpotifyGetTopArtists/>
      </header>
    </div>
  );

};
export default App;
