## &lt;user-media&gt;

A WebComponent wrapper for the [`getUserMedia` API](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia). 

Get webcam video and microphone audio streams with a simple html tag!

## Installation

### Loading from CDN

Load the component from unpkg with a script tag: 

`<script type="module" src="https://unpkg.com/@popul-ar/user-media@latest"></script>`

### Installing from NPM

Install the module: `npm install --save @popul-ar/user-media`

Import the module: `import '@popul-ar/user-media'`


## Examples

Using the component without any attributes will give you a muted video element with default webcam settings.

`<user-media></user-media>`

You can also specify other attributes depending on your needs. 

`<user-media width="720" height="1280" controls></user-media>`

`<user-media aspect-ratio="1.333" video-facing-mode="user"></user-media>`

## Documentation

See the [`<user-media>` component API documentation](./src/components/user-media/readme.md) for more details about attributes, events, and methods.

## Demos

[Basic webcam example](www/index.html): device selector with a few controls

[Simplest usage](https://popul-ar.github.io/user-media/www/examples/simplest.html): just the tag

[Audio controls](https://popul-ar.github.io/user-media/www/examples/audio.html): audio streams and properties. ⚠️ Headphones recommended to prevent feedback loops ⚠️.

[Advanced properties](https://popul-ar.github.io/user-media/www/examples/advanced.html): zoom, contrast, exposure mode, etc...

## Development

`npm install`: installs dependencies

`npm start`: starts a dev server and runs a watcher for compiling the component

`npm run build`: builds the component in production mode and generates docs

`npm run publish`: publishes the module on [NPM](https://www.npmjs.com/package/@popul-ar/user-media)

---

![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

