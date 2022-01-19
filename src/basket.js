const Bagel = require("../src/bagel.js");
const deals = require("../src/deals.js");

class Basket {
    constructor(number = 3) {
        this.contents = []
        this.capacity = number
        this.counts = {}
    }

    addBagel(SKU, numOfBagels = 1) { 
        if(this.basketIsFull()) {
            return "This basket is full"
        }
             
        for (let i = 0; i < numOfBagels; i++) {
            if (!this.basketIsFull()) {
            let bagelItem = new Bagel(SKU)
            this.contents.push(bagelItem)
            }
        }
        return this.contents

    }
    removeBagel(sku) {
        for (let i = 0; i < this.contents.length; i++) {
            if (this.contents[i].SKU === sku) {
                this.contents.splice(i, 1)
                return this.contents
            }
        } return "Bagel isn't in basket"
    }

    basketIsFull() {
        return this.contents.length >= this.capacity
    }

    getPriceOfBagel(SKU) {
        const output = new Bagel(SKU);
        return output.price
    }


    countBagelsInBasket(){
        this.counts = {}
        for (let i = 0; i < this.contents.length; i++){
            const SKU = this.contents[i].SKU
            if (!this.counts.hasOwnProperty(SKU)) {
                this.counts[SKU] = 1
            } else {
                this.counts[SKU]++;
            }
        }
         return this.counts;
    }

    // static getSubtotal(counts,SKU){
    //     const count = counts[SKU]
    //     const dealQuantity = deals[SKU][0]
    //     const dealPrice = deals[SKU][1]
    //     const bagelPrice = Bagel.getPriceOfBagel(SKU)
    //     const dealSum = Math.floor(count / dealQuantity) * (dealPrice)
    //     const nonDealSum = (count % dealQuantity) * (bagelPrice)
    //     return Number((dealSum + nonDealSum).toFixed(2))

    // }

    getTotalBagelwithDiscount(counts,SKU){
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

    getTotal(){
        this.countBagelsInBasket()
        let total = 0

        for (let SKU in this.counts){
          if (deals.hasOwnProperty(SKU)){
              if (deals[SKU].length === 4) {
                total -= this.comboDealSavings(this.counts, SKU)  
              }
              total += this.getTotalBagelwithDiscount(this.counts, SKU)
        }
          else {
            total += (Bagel.getPriceOfBagel(SKU) * this.counts[SKU]) 
          }
        }

        return Number(total.toFixed(2))
    }
    
        
        
        

}


module.exports = Basket



