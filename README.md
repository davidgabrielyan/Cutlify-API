# Cutlify - link shortener
## Basic link shortener API for use anywhere!

## ✨The application is currently live✨

##### version 0.1.0 is currently live! The API host is here 👉 https://cutlify.herokuapp.com

###### created by David Gabrielyan

## Running
```sh
cd Cutlify-API
npm i
npm run dev
```

## Usage

To generate a short link just run:
```sh
POST http://localhost:3000 # if using locally
POST http://cutlify.herokuapp.com # if using live version
```
with a request body like:
```
{ "url": "www.facebook.com" }
```
#### Note!
> the url format doesn't matter, whether it's starting with "www", "http://" or "https://".

The response will look like this:
```
{ "cutlifiedUrl": "http://localhost:3000/_v5mgj" } # if using locally
{ "cutlifiedUrl": "https://cutlify.herokuapp.com/_v5mgj" } # if using live version
```

Then just use it in the browser by going to that link: it will redirect to the original link.
## Limitations
> Every generated link is saved to MongoDB. After any kind of
> failure it will still be available, but the TTL (time to live)
> for every url is 24 hours. Then it will be deleted. When using
> locally, you can change that setting from ".env" (variable name - "TTL", set in hours).

#### Note 2.0 !
> The live version is open source, free-to-use and is using free
> tiers of all third-party services. Please consider, that it
> makes sense to use it only for educational, some kind of testing, etc.
> purposes, but not for production!


##### Technologies/libraries used:
- Node.js
- Express.js
- cron
- nodemon
- MongoDB (Atlas)
- Mongoose
- babel
- eslint
- dotenv
- Jest

## License

##### MIT

***Public license, free software...***
