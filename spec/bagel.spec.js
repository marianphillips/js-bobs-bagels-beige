const Bagel = require("../src/bagel.js");

describe("Basket", () => {
  
it("get price of bagel before adding to basket", () => {
    const expected = `0.49`
    const result = Bagel.getPriceOfBagel("BGLO");
    expect(result).toEqual(expected);
  })

  it("get bagel by type", () => {
    const expected = `Onion`
    const result = Bagel.getTypeOfBagel("BGLO");
    expect(result).toEqual(expected);
  })
  
}) ;