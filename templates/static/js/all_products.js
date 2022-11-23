//Making Product Prototype
function create_prod(img_src,price,desc){
    //Craeting Elements
    var img_elem = document.createElement("img");
    var price_elem = document.createElement("p");
    var desc_elem = document.createElement("p");
    var prod = document.createElement("div");

    //Adding class Names
    prod.className="product";
    price_elem.className="product-price";
    desc_elem.className="product-desc";
    
    //Adding Src To Image
    img_elem.src="static/uploads/"+img_src;
    price_elem.innerHTML=price;
    desc_elem.innerHTML=desc;

    //Appending Elements Product Element
    prod.appendChild(img_elem);
    prod.appendChild(price_elem);
    prod.appendChild(desc_elem);
    return prod
}
var all_prods = document.getElementById("all-products");
//Gettting Products From Api
var fetch_data = new XMLHttpRequest();
fetch_data.onload=data_clean;
fetch_data.open("GET","api");
fetch_data.send();
function data_clean(){
    var response = fetch_data.responseText;
    var response = response.replace(/\'/g,"\"");
    var response = JSON.parse(response);
    data_abs(response);
}

//Data abstraction
function data_abs (data){
    for (x in data){
        pid=data[x][0];
        title=data[x][1];
        price=data[x][2];
        mrp=data[x][3];
        delivery=data[x][4];
        desc=data[x][5];
        image=data[x][6][0];
        //all_prods.appendChild(create_prod(image,price,desc))
    }
}
