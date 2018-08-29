# Today I learned (as static site)

or ... a **"Netlify Contentful React Static Site example"**

![The Today I learned site](./screenshot.png)

## Features

- included content model for easy setup in Contentful
- dynamic rendering and usage of the [Contentful Preview API](https://www.contentful.com/developers/docs/references/content-preview-api/) for easier content preview in development
- static builds for better user experience using [react-snap](https://github.com/stereobooster/react-snap)

## Requirements

### [Contentful](https://www.contentful.com) – your Content Infrastructure

### [Netlify](https://www.netlify.com) – your CI service and hoster

## Setup

### Using the Netlify Deploy Button (recommended)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/stefanjudis/netlify-contentful-react-static-site-example)

This project can be used without files on any computer simply by configuring Contentful and Netlify. The tutorial is [included in the project itself](https://netlify-contentful.netlify.com/tutorial/).

### Set it up yourself

## How to develop and make changes

```
$ git clone
$ npm i
$ mv .env.sample .env
```
