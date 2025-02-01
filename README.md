# Clarinet Transaction Simulation Demo

See it in action:

```sh
$ npm i -f
$ npm t
```

## Details

This project currently uses clarinet-sdk latest beta
(`"@hirosystems/clarinet-sdk": "^2.13.0-beta15"` or above).


```toml
# clarinet.toml
[repl.remote_data]
enabled = true
api_url = "https://api.hiro.so"
initial_height = 522000
```

See usage examples in the test file:

```ts
const { result } = simnet.callReadOnlyFn(
  "SP3R4F6C1J3JQWWCVZ3S7FRRYPMYG6ZW6RZK31FXY.pyth-storage-v3",
  "get-price",
  [btcFeed],
  address1,
);
```
