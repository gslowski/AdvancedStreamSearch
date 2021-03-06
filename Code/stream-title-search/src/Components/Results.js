/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import axios from 'axios';

const Results = ({ streamList }) => {

    useEffect(() => {
        fetchStreamer();
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

    const twoDimStreamList = (streamList) => {
        var matrix = [], i, k;
        var elementsPerSubArray = 4;

        for (i = 0, k = -1; i < streamList.length; i++) {
            if (i % elementsPerSubArray === 0) {
                k++;
                matrix[k] = [];
            }

            matrix[k].push(streamList[i]);
        }

        return matrix;
    }

    const streamRows = (row) => {
        return (
            <div className="columns is-full">
                {row.map(streamElements)}
            </div>)
    }

    const streamElements = (stream) => {
        return (
            <div className="column is-centered">
                <div className="box" css={css`background-color: #a697af;`}>
                    <div className="columns is-full" css={css`display: table-cell; vertical-align: middle;`}>
                        <div className="column has-text-right" css={css`padding: 0; vertical-align: middle;`}>
                            <a href={"https://www.twitch.tv/" + stream.user_name} >
                                <img id={stream.user_id} css={css`object-fit: cover; border-radius: 30px;`}>{fetchStreamer(stream.user_id)}</img>
                            </a>
                        </div>
                        <div className="column has-text-left" css={css`padding: 0; vertical-align: middle;`}>
                            {stream.user_name}
                        </div>
                        <div className="column has-text-right" css={css`padding: 0;`}>
                            <img src='https://raw.githubusercontent.com/gslowski/AdvancedStreamSearch/main/Images/viewers.png' width="30" height="30" css={css`margin-right: 0%;`}></img>
                        </div>
                        <div className="column has-text-left" css={css`padding: 0;`}>
                            {stream.viewer_count}
                        </div>
                    </div>
                    <a href={"https://www.twitch.tv/" + stream.user_name}>
                        <img src={stream.thumbnail_url.replace('{width}', '600').replace('{height}', '360')}></img>
                    </a>
                </div>
            </div>
        )
    }

    const fetchStreamer = (user_id) => {
        helix.get(`https://api.twitch.tv/helix/users?id=${user_id}`)
            .then((res) => {
                document.getElementById(user_id).src = res.data.data[0].profile_image_url;
                document.getElementById(user_id).style = "width:30px;height:30px;"
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (

        <div>
            {
                twoDimStreamList(streamList).map(streamRows)
            }
        </div>

    )

}

export default Results

