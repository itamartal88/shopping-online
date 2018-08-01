

function editValidition(product,req){
    if(product.name !== ''){
      var name = product.name;
    }else{
      var name = product.product.productName;
    }
    if(product.price > 0){
      var price = product.price;
    }else{
      var price = product.product.unitPrice
    }
    if(req.files){
      var img = req.files.img.name
    }else{
      var img = product.product.img
    }
  
    return {
     name:name,
     price:price,
     img:img
     }
    }

    module.exports = {
        editValidition  
    }