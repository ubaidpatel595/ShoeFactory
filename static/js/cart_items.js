function disco_calculate(price,mrp){
    let discount = mrp-price;
    let disco_perc = discount/mrp*100;
    console.log(String(disco_perc).slice(0,2))
}
let ajax = new XMLHttpRequest();
ajax.open("GET","api/cart_items")
ajax.send();
ajax.onload = function(){
    let data = this.responseText;
    let data1 = data.replace( /'/g ,"\"")
    let data_array = JSON.parse(data1);
    console.log(data_array)
    for (x in data_array){
        let pid = data_array[x][0]
        let title = data_array[x][1]
        let price = data_array[x][2]
        let mrp = data_array[x][3]
        let image = data_array[x][4]
        let child = create_cartitem(pid,image,price,mrp,title);
        let parent = document.getElementById("all-products");
        parent.appendChild(child)
    }
}

function create_cartitem(pid,img_src,price,mrp,desc){
    //Calculating Discount
    var perc = mrp/100;
    var discount = price/perc;
    var discount = 100-discount;
    var discount = String(discount);
    var discount = discount.slice(0,2)

    var link = `products?pid=${pid}`
    //Craeting Elements
    var link_elem = document.createElement("a");
    var img_elem = document.createElement("img");
    var price_elem = document.createElement("p");
    var desc_elem = document.createElement("p");
    var div = document.createElement("div");

    //Adding class Names
    div.className="product";
    price_elem.className="product-price";
    desc_elem.className="product-desc";
    
    //Adding Src To Image
    img_elem.src="static/uploads/"+img_src;
    price_elem.innerHTML=`₹${price} <s>₹${mrp}</s> ${discount}% Discount`;
    desc_elem.innerHTML=desc;
    link_elem.href=link;

    //Appending Elements Product Element
    div.appendChild(img_elem);
    div.appendChild(price_elem);
    div.appendChild(desc_elem);
    link_elem.appendChild(div); 
    return link_elem
}