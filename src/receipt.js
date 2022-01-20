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
            receiptLine += Bagel.getTypeOfBagel(key)
            ? Bagel.getTypeOfBagel(key)
            : 'Coffee'
            for (let i = 0;i<19;i++){
                if (receiptLine.length < 19){
                    receiptLine += " "
                }
            }
            receiptLine += amountOfBagels[key]
            for (let i=0;i<4;i++){
                if (receiptLine.length < 23){
                    receiptLine += " "
                }
            }
            receiptLine += "£"
            const subtotal = this.discounts.multiBuyDealTotal(amountOfBagels, key)
            receiptLine += subtotal
            purchaseLines += `${receiptLine}\n`
        }
        return purchaseLines
    }

}
module.exports = Receipt