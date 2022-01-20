const deals = require("../src/deals.js");
const inventory = require("../src/inventory.js")


function findBySKU(SKU) {
    return inventory.find(bagel => bagel['sku'] === SKU)
  }

class Bagel {
    constructor(SKU){
        this.SKU = SKU
        this.type = findBySKU(SKU).variant
        this.price = findBySKU(SKU).price
    }

  static getPriceOfBagel(SKU) {
    return findBySKU(SKU).price
  }

  static getTypeOfBagel(SKU) {
    return findBySKU(SKU).variant
  }

}

module.exports = Bagel