const Discounts = require("../src/discounts.js");
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

    getTotal() {
        this.countBagelsInBasket()
        let total = 0
        const discount = new Discounts()

        for (let SKU in this.counts){
          if (deals.hasOwnProperty(SKU)){
              if (deals[SKU].length === 4) {
                total -= discount.comboDealSavings(this.counts, SKU)  
              }
              total += discount.multiBuyDealTotal(this.counts, SKU)
        }
          else {
            total += (Bagel.getPriceOfBagel(SKU) * this.counts[SKU]) 
          }
        }

        return Number(total.toFixed(2))
    }
    
        
        
        

}


module.exports = Basket



