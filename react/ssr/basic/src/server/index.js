const express = require('express');
const app = express();

import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
// import Home from '../containers/Home';
import Counter from '../containers/Counter';

app.get('/', function (req, res) {
    const htmlStr = renderToString(<Counter />);
    console.log(htmlStr);

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
        </head>
        <body>${htmlStr}</body>
        </html>
    `);
});

app.listen(3000, function () {
    console.log('server is running on https://localhost:3000');
});
