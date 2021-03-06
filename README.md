# ![React + Redux Example App](project-logo.png)

[![Netlify Status](https://api.netlify.com/api/v1/badges/1a274c7c-5d0a-4112-a5c8-681dfaecd8bf/deploy-status)](https://app.netlify.com/sites/conduit-ts/deploys)
[![RealWorld Frontend](https://img.shields.io/badge/realworld-frontend-%23783578.svg)](http://realworld.io)

> ### React + Redux codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld-example-apps) spec and API.

## Getting started

You can view a live demo over at https://conduit-ts.netlify.app/

To get the frontend running locally:

- Clone this repo
- `npm install` to install all req'd dependencies
- `npm start` to start the local server (this project uses create-react-app)

### Making requests to the backend API

For convenience, we have a live API server running at
https://api.realworld.io/api for the application to make requests against. You
can view
[the API spec here](https://github.com/GoThinkster/productionready/blob/master/api)
which contains all routes & responses for the server.

The source code for the backend server (available for Node, Rails and Django)
can be found in the
[main RealWorld repo](https://github.com/gothinkster/realworld).

## Functionality overview

The example application is a social blogging site (i.e. a Medium.com clone)
called "Conduit". It uses a custom API for all requests, including
authentication. You can view a live demo over at https://conduit-ts.netlify.app/

**General functionality:**

- Authenticate users via JWT (login/signup pages + logout button on settings
  page)
- CRU\* users (sign up & settings page - no deleting required)
- CRUD Articles
- CR\*D Comments on articles (no updating required)
- GET and display paginated lists of articles
- Favorite articles
- Follow other users

**The general page breakdown looks like this:**

- Home page (URL: / )
  - List of tags
  - List of articles pulled from either Feed, Global, or by Tag
  - Infinity Scroll for list of articles
- Sign in/Sign up pages (URL: /login, /register )
  - Use JWT (store the token in localStorage)
- Settings page (URL: /settings )
- Editor page to create/edit articles (URL: /editor, /editor/:slug )
- Article page (URL: /article/:slug )
  - Delete article button (only shown to article's author)
  - Comments section at bottom of page
  - Delete comment button (only shown to comment's author)
- Profile page (URL: /profile/:username)
  - Show basic user info
  - List of articles populated from author's created articles or author's
    favorited articles
