//Making Product Prototype
function create_fet_prod(pid,img_src,price,mrp,desc){
    //Calculating Discount
    var perc = mrp/100;
    var discount = price/perc;
    discount = 100-discount;
    discount = String(discount);
    discount = discount.slice(0,2)

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

//Getting Featured Products
var ajax = new XMLHttpRequest();
ajax.onload=data_collect;
ajax.open("GET","api/featured")
ajax.send()
function data_collect(){
    let restext = ajax.responseText;
    restext = restext.replace(/\'/g,"\"");
    restext = JSON.parse(restext)
    featured_abs(restext)
}

//Getting Product Details

//Showing Details

var all_fet_prods = document.getElementById("featured");
//Gettting Products From Api

//Data abstraction
function featured_abs (fet_data){
    for (x in fet_data){
        data_pid = fet_data[x][0]
        data_title = fet_data[x][1]
        data_price = fet_data[x][2]
        data_mrp = fet_data[x][3]
        data_img = fet_data[x][4]
        all_fet_prods.appendChild(create_fet_prod(data_pid,data_img,data_price,data_mrp,data_title))
    }
        
}