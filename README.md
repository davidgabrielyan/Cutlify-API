# Cutlify - link shortener
## Basic link shortener API for use anywhere!

###### created by David Gabrielyan

## Running
```sh
cd Cutlify
npm i
npm run dev
```

## Usage

To generate a short link just run:
```sh
POST http://localhost:3000
```
with a request body like:
```
{ "url": "www.facebook.com" }
```
#### Note!
> the url format doesn't matter, whether it's starting with "www", "http://" or "https://".

The response will look like this:
```
{ "cutlifiedUrl": "http://localhost:3000/_v5mgj" }
```

Then just use it in the browser by going to that link: it will redirect to the original link.
## Limitations
> Every generated link is saved to the cache. After application
> restart it will still be available, but the TTL (time to live)
> for every url is 12 hours. You can change that setting from
> ".env" (variable name - "TTL", set in hours).

##### Technologies/libraries used:
- Node.js
- Express.js
- cron
- nodemon
- cacache
- babel
- eslint
- dotenv

## License

##### MIT

***Public license, free software...***
