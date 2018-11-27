# Cryptocurrencies

**Repo URL**: https://github.com/matheuspiment/cryptocurrencies/

This web app is a demo app to monitor cryptoccurencies from [CoinMarketCap API](https://pro.coinmarketcap.com/). A online version is available - https://matheuspiment.github.io/cryptocurrencies/.

![Launch Image](https://github.com/matheuspiment/cryptocurrencies/blob/master/docs/images/launch.png)

* [How to use?](#how-to-use)
    * [Notifications](#notifications)
* [Warning](#warning)
* [Run Locally](#run-locally)

## How to use?

1. Open the URL above
2. Click on the "+" button
3. On the open modal, type the name/slug/symbol of a crypto. An example with bitcoin:
    * name: Bitcoin
    * slug: bitcoin
    * symbol: BTC
4. Click on the the "OK" button
4. You'll see the card for the crypto

### Notifications

This app uses the [Notification API](https://developer.mozilla.org/en-US/docs/Web/API/Notification) to show you alerts of the crypto prices. When the browser asks, accept the notifications display.

The parameters for alerts are defined by hardcode and follow the rules below:

* Displays an alert when the crypto fell 10%
* Displays an alert when the crypto rose 0.2%

## Warning

This app uses a trial API KEY from [CoinMarketCap API](https://pro.coinmarketcap.com/) so it has a limit of API calls.

## Run Locally

To run this app locally you need:
  1. An instance of the [cors-server](https://github.com/matheuspiment/cors-server) running.
  2. Set the [`process.env.API_KEY` in the `index`](https://github.com/matheuspiment/cors-server/blob/master/routes/index.js#L19) file of the server app with an APY KEY from [CoinMarketCap API](https://pro.coinmarketcap.com/).
  3. Set the [`baseURL` of the axios instance](https://github.com/matheuspiment/cryptocurrencies/blob/master/src/services/api.js#L4) in the `src/servises/api.js` file to poit to the local server instance.
