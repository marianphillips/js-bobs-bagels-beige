const Bagel = require("../src/bagel.js");
const deals = require("../src/deals.js");

class Discounts {

    multiBuyDealTotal(counts,SKU){
        const count = counts[SKU]
        const dealQuantity = deals[SKU][0]
        const dealPrice = deals[SKU][1]
        const bagelPrice = Bagel.getPriceOfBagel(SKU)

        const dealSum = Math.floor(count / dealQuantity) * (dealPrice)
 
        const nonDealSum = (count % dealQuantity) * (bagelPrice)

        return Number((dealSum + nonDealSum).toFixed(2))

    }

    comboDealSavings(counts,SKU) {
        const comboDeal = deals[SKU][2]
        const numOfDiscounts = counts[comboDeal] % deals[comboDeal][0]
        const saving = Bagel.getPriceOfBagel(comboDeal) - deals[SKU][3]
        return numOfDiscounts * saving   
    }
}

module.exports = Discounts