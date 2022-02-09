/** @jsxImportSource @emotion/react */
import './App.css';
import React, { useState, useEffect } from 'react';
import { jsx, css } from "@emotion/react";
import 'bulma/css/bulma.css';
import axios from 'axios';
import Results from './Components/Results';

function App() {

  useEffect(() => {
    fetchStreams();
    fetchGameIds();
    fetchGames();
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
        console.log(res.data.data)
        setStreams(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchGames = async () => {

    var pagination = '';
    var options = '';

    await helix.get(`https://api.twitch.tv/helix/games/top?first=100`)
      .then(async (res) => {
        for (let i = 0; i < 100; i++) {
          games.push(res.data.data[i].name);
          options += '<option value="' + res.data.data[i].name + '" />';
        }
        pagination = res.data.pagination.cursor;
      })
      .catch(async (err) => {
        console.log(err);
      });

    document.getElementById('Categories').innerHTML = options;

    var continueGameLookup = 'yes'

    while (continueGameLookup === 'yes') {
      await helix.get(`https://api.twitch.tv/helix/games/top?first=100&after=${pagination}`)
        .then(async (res) => {
          for (let i = 0; i < 100; i++) {
            if (typeof (res.data.data[i]) === 'undefined') {
              continueGameLookup = 'no';
              break;
            } else {
              games.push(res.data.data[i].name);
              options += '<option value="' + res.data.data[i].name + '" />';
            }
          }

          pagination = res.data.pagination.cursor;

        })
        .catch(async (err) => {
          if (err.response.status === 429) {
            continueGameLookup = 'no';
          }
          console.log(err);
        });
    }

    document.getElementById('Categories').innerHTML = options;

  };

  const fetchGameIds = () => {
    helix.get(`https://api.twitch.tv/helix/games?name=World%20of%20Warcraft`)
      .then((res) => {
        setGameId(res.data.data[0].name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchKeywordHandler = (event) => {
    setKeywords(event.target.value)
  };

  const [streams, setStreams] = useState([]);
  const [games, setGames] = useState([]);
  const [gameId, setGameId] = useState('');
  const [keywords, setKeywords] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <img src='https://raw.githubusercontent.com/gslowski/AdvancedStreamSearch/main/Images/title.png' width="300" height="40" css={css`margin-left: 4%;`}></img>
      </header>

      <div className="App-background">
        <div css={css`width: 95%; position: absolute; top: 5vh`}>
          <div className="box" css={css`width: 60%; position: relative; top: 5vh; margin: auto;`}>
            <div>
              <input name="GameOrCategory" list="Categories" />
              <datalist id="Categories"></datalist>
            </div>
            <div>
              <input className="input"
                id="enteredKeywords"
                type="text"
                placeholder="What are you looking for today?"
                css={css`width: 85%`}></input>
              <button className="button is-warning" css={css`width: 15%`}>Search</button>
            </div>
            <div>

            </div>
          </div>
          <div className="box" css={css`width: 100%; position: relative; top: 2vh; margin: auto;`}>

            <Results streamList={streams} />

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
