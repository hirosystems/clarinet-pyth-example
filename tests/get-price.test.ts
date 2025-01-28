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
const price2 = 10622818273767;

describe("example tests", () => {
  it("start with the right chain heights", () => {
    const stacks = simnet.execute("stacks-block-height");
    expect(stacks.result).toBeUint(522001);
    const burn = simnet.execute("burn-block-height");
    expect(burn.result).toBeUint(881064);
  });

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

  it("can call get-price", () => {
    const { result } = simnet.callReadOnlyFn(
      "get-price",
      "get-btc-price",
      [],
      address1,
    );
    expect(result).toBeSome(Cl.int(price1));
  });

  it("can call get-price-at", () => {
    const { result } = simnet.callReadOnlyFn(
      "get-price",
      "get-btc-price-at",
      [Cl.uint(511000)],
      address1,
    );
    expect(result).toBeSome(Cl.int(price2));
  });

  it("can use at-block", () => {
    const hash =
      "0x6d9cef16a6082c9ecb0a514f99987753e5ac065ba1cf7d25b4613a1be70fb0eb";

    const code = `(at-block ${hash} (contract-call? .get-price get-btc-price))`;
    const { result } = simnet.execute(code);
    expect(result).toBeSome(Cl.int(price2));
  });

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
