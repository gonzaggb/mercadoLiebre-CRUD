const fs = require('fs')
const path = require('path')

module.exports = {
    productsPath: path.resolve(__dirname , '../data/productsDataBase.json'),
        readFile(){
        const productsDataBase = JSON.parse(fs.readFileSync(this.productsPath,'utf-8'))
        return productsDataBase
    },
    writeFile(newData){
        const dataJson = JSON.stringify(newData, null, 2)
        fs.writeFileSync(this.productsPath, dataJson)
        return newData

    } ,
    findAll(){
        return this.readFile()
    },
    findByPk(id){
        const products = this.readFile()
        return products.find(e => e.id == id)

    },
    lastVisit(){
        return this.findAll().filter(e=>e.category == 'visited')

    },
    inSale(){
        return this.findAll().filter(e=>e.category == 'in-sale')
    },
    update(productToUpdate, id){
        console.log(productToUpdate )
        const products = this.readFile()
        const productsNew = products.map(e => {
            if(e.id == id){
                e = {
                    id: e.id,
                    ...productToUpdate
                }
            }
            return e
        })
        this.writeFile(productsNew)

    },
    delete(id){
        const products = this.readFile()
        const productsNew = products.filter(e => e.id != id)
        this.writeFile(productsNew)
    }
}
