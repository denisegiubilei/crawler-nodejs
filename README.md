# Crawler
Crawler to check meta tag values from a list of urls.

## Input / Output
Takes a json file as input. Expects an array of urls:
```bash
/files/input-urls.json
```
Outputs a list of json objects. <br/>
Contains the final uri path, the actual meta tag and whether or not it matched the expected value.
```bash
/files/output-<datetime>.json
```

## To run:
Install dependencies:
```bash
npm install
```
Available scripts:
```bash
npm run start
```
