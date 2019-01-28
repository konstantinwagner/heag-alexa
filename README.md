# heag-alexa

Alexa skill for presenting Darmstadt's public transportation departures (HEAG). Still work-in-progress.

## Getting started
### Prerequisites
1. Install [yarn](https://yarnpkg.com/) (not mandatory, but recommended for yarn.lock support)
2. `yarn global add serverless` / `npm install -g serverless`

### Setup
1. `yarn install` / `npm install`
2. `sls alexa auth`
3. `sls alexa create --name "HEAG Departures" --locale de-DE --type custom`
4. Paste returned skill id into serverless.yml (see `Step 3` there)
5. `sls deploy -v`
6. Paste ARN into serverless.yml again (see step `Step 5` inline)
7. Create skill scheme / invocations on [Alexa Developer Console](https://developer.amazon.com/alexa/) ~(see used intents below)~  
   **Don't forget to build your model before testing!**
8. Switch to test tab on Developer Console and enable skill

*Step 7 is eventually skippable by calling `sls alexa update` and `sls alexa build`, but I didn't test it yet*

### Deploy
`sls deploy -v`
