# Description
I travel a lot using [easyJet](www.easyjet.com) and noticed that the best way to get the cheapest tickets is to buy them as soon as possible (as soon as they are released, basically).

The problem is that it's hard to know when new flights will be released, and it is quite cumbersome to check the website manually.

So I needed a way to automate that, and ideally get alerted when new flights are released.

This projects implements a simple RESTful API that processes HTTP requests.

It makes use of [Express.js](http://expressjs.com/), a minimal and flexible Node.js framework that includes a myriad of HTTP utility methods for quickly creating robust APIs. I also use the [Request](https://github.com/request/request) package, which is Node.js middleware to make http calls.

## Getting Started
For now, the only endpoint available is `max-bookable-date`.
It returns date of the farthest bookable ticket for a flight between the two airport passed in parameter.

Parameters: `origin` and `dest` are expected to be in [IATA code](https://en.wikipedia.org/wiki/International_Air_Transport_Association_airport_code) format.

### With curl
curl -X GET 'https://easyjet-api.glitch.me/max-bookable-date?dest=LYS&origin=ARN'

### In a web browser
In a new tab, go to: <https://easyjet-api.glitch.me/max-bookable-date?dest=LYS&origin=ARN>