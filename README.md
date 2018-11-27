# Cryptocurrencies

**Repo URL**: https://github.com/matheuspiment/cryptocurrencies/

This web app is a demo app to monitor cryptoccurencies from [CoinMarketCap API](https://pro.coinmarketcap.com/). A online version is available - https://matheuspiment.github.io/cryptocurrencies/.

## How to use?

1. Open the URL above
2. Click on the "+" button
3. On the open modal, type the name/slug/symbol of a crypto. An example with bitcoin:
    * name: Bitcoin
    * slug: bitcoin
    * symbol: BTC
4. Click on the the "OK" button
4. You'll see the card for the crypto

### Noticications

This app uses the [Notification API](https://developer.mozilla.org/en-US/docs/Web/API/Notification) to show you alerts of the crypto prices. When the browser asks, accept the notifications display.

The parameters for alerts are defined by hardcode and follow the rules below:

* Displays an alert when the crypto fell 10%
* Displays an alert when the crypto rose 0.2%

## Warning

This app uses a trial API KEY from [CoinMarketCap API](https://pro.coinmarketcap.com/) so it has a limit of API calls.
