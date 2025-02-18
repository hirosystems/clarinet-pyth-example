import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const address1 = accounts.get("wallet_1")!;

/*
  The test below is an example. To learn more, read the testing documentation here:
  https://docs.hiro.so/stacks/clarinet-js-sdk
*/

const btcFeed = Cl.bufferFromHex(
  "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
);

const price1 = 10073844271302;

describe("example tests", () => {
  it("can call mainnet contract", () => {
    const { result } = simnet.callReadOnlyFn(
      "SP3R4F6C1J3JQWWCVZ3S7FRRYPMYG6ZW6RZK31FXY.pyth-storage-v3",
      "get-price",
      [btcFeed],
      address1,
    );

    // @ts-ignore
    expect(result.value.data.price).toBeInt(price1);
  });
});
