const Bagel = require("../src/bagel.js");
const Basket = require("../src/basket.js");

describe("Basket", () => {
    let basket

    beforeEach(() => {
        basket = new Basket();
    });

    it("basket is empty", () => {
        const expected = []
        const result = basket.contents
        expect(result).toEqual(expected);
    });


    it("add item to basket", () => {

        const expected = [new Bagel("BGLO")]

        const result = basket.addBagel("BGLO")

        expect(result).toEqual(expected);
    });

    it("remove item from basket", () => {

        const expected = []
        basket.addBagel("BGLO")
        const result = basket.removeBagel("BGLO")

        expect(result).toEqual(expected);
    });

    it("cannot remove an item that isn't in the basket", () => {
        const expected = "Bagel isn't in basket"
        const result = basket.removeBagel("random")
        expect(result).toEqual(expected);
    });

    it("add a second bagel to basket", () => {

        const expected = [new Bagel("BGLO"),
        new Bagel("BGLO")]
        basket.addBagel("BGLO")
        const result = basket.addBagel("BGLO")
        expect(result).toEqual(expected);
    });

    it("when Basket is full", () => {

        const expected = true
        basket.addBagel("BGLO", 4)
        const result = basket.basketIsFull()
        expect(result).toEqual(expected);
        expect(basket.contents.length).toEqual(3);
    });

    it("when Basket is full, error message return", () => {

        const expected = "This basket is full"
        basket.addBagel("BGLO", 3)
        const result = basket.addBagel('BGLO')
        expect(result).toEqual(expected);
    });


    it("when Basket is not full, return false", () => {

        const expected = false
        basket.addBagel("BGLO", 2)
        const result = basket.basketIsFull()
        expect(result).toEqual(expected);
    });

    
    it("prevent adding bagels past basket capacity", () => {
        // shouldn't be able to add 4 bagels to basket of capacity 3.
        const expected = 3
        basket.addBagel("BGLO", 4)
        const result = basket.contents.length
        expect(result).toEqual(expected);
    });

    it("create basket with larger capacity", () => {
        const expected = true
        const largeBasket = new Basket(5)
        const result = largeBasket.capacity > basket.capacity
        expect(result).toEqual(expected);
    });



    it("total sum of bagels in my basket ", () => {
        const expected = 3 * 0.49
        basket.addBagel("BGLO", 3)
        const result = basket.getTotal();
        expect(result).toEqual(expected);
      });

      it("total sum of bagels in my basket sesame ", () => {
        const expected = 3 * 0.49
        basket.addBagel("BGLS", 3)
        const result = basket.getTotal();
        expect(result).toEqual(expected);
      });
});