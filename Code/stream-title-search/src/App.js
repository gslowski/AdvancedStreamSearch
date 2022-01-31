/** @jsxImportSource @emotion/react */
import './App.css';
import React, { useState, useEffect } from 'react';
import { jsx, css } from "@emotion/react";
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
      'Authorization': `Bearer ${access_token}`
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
        console.log(res.data.data[0].name)
        setGameId(res.data.data[0].name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchKeywordHandler = (event) => {
    setKeywords(event.target.value)
    console.log(keywords)
  };

  const [streams, setStreams] = useState([]);
  const [gameId, setGameId] = useState('');
  const [keywords, setKeywords] = useState("");

  return (
    <div className="App">
      <header className="App-background">
        <div className="box" css={css`width: 95%; position: absolute; top: 5%`}>
          <div className="columns">
            <div className="column is-half">
              <input className="input"
                type="text"
                placeholder="Enter search keyword."
                css={css`width: 85%`}
                onChange={searchKeywordHandler}></input>
              <button className="button is-warning" css={css`width: 15%`}>Search</button>
            </div>
            <div className="column is-half">
            </div>
          </div>
        </div>
        <div className="box" css={css`width: 95%; position: absolute; top: 25%`}>

        </div>
      </header>
    </div>
  );
}

export default App;
