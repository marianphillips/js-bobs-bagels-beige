const Bagel = require("../src/bagel.js");

class Receipt {
    constructor(instanceOfBasket, instanceOfDiscounts){
    this.purchases = instanceOfBasket
    this.discounts = instanceOfDiscounts
    }

    getReceipt(){
        return `
    ~~~ Bob's Bagels ~~~    

  ${Date().substring(0,24)}
----------------------------
${this.getPurchaseList()}
Total                 £${this.purchases.getTotal()}
        Thank you
      for your order!         `
    }

    getPurchaseList(){
        let purchaseLines = ""
        const amountOfBagels = this.purchases.countBagelsInBasket()
        for (let key in amountOfBagels){
            let receiptLine = ""
            
            receiptLine += Bagel.getTypeOfBagel(key).padEnd(19," ")
 
            receiptLine += amountOfBagels[key].toString().padEnd(4," ")

            receiptLine += "£"
            
            const subtotal = this.discounts.multiBuyDealTotal(amountOfBagels, key)
            receiptLine += subtotal
            
            purchaseLines += `${receiptLine}\n`
        }
        return purchaseLines
    }

}
module.exports = Receipt