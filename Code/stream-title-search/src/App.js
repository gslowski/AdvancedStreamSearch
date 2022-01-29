/** @jsxImportSource @emotion/react */
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import 'bulma/css/bulma.css';
import axios from 'axios';

function App() {

  useEffect(() => {
    fetchStreams();
    fetchGameIds();
  }, []);

  const client_id = 'ldehwfy1d6wdrswfworww073rfxyql';
  const access_token = '73fq146dhu0yzst5oqj4wkijmvnvfo';

  const helix = axios.create({
    baseURL: 'https://api.twitch.tv/helix/',
    headers: { 
      'Client-ID': client_id,
      'Authorization' : `Bearer ${access_token}`
     }
    });

  const fetchStreams = () => {
    helix.get(`https://api.twitch.tv/helix/streams?first=100&game_id=18122`)
      .then((res) => {
        console.log(res)
        setStreams(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchGameIds = () => {
    helix.get(`https://api.twitch.tv/helix/games?name=World%20of%20Warcraft`)
      .then((res) => {
        console.log(res)
        setGameId(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [streams, setStreams] = useState([]);
  const [gameId, setGameId] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <div className="box">
          <div className="columns">
            <div className="column">
              <input className="input" type="text" placeholder="Enter search keyword."></input>
            </div>
            <div className="column">
              <button className="button is-success">Search</button>
            </div>
          </div>
        </div>
        <div className="box">

        </div>
      </header>
    </div>
  );
}

export default App;
