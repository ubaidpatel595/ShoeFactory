function add_cart(){
    let cart_count = document.getElementById("cart_items");
    let cart_count_get = parseInt (cart_count.innerHTML)
    //getting pid
    let link = window.location.href
    let url =new URL(link);
    let url_search = new URLSearchParams(url.search);
    let pid = url_search.get('pid');
    console.log(url)
    let api = new XMLHttpRequest();
    api.onload = function(){
       if (this.status == 200){
        cart_count.innerHTML=cart_count_get+1;
        let cart = document.getElementById("add-cart");
        cart.innerHTML="Added To Cart";
        cart.style="background-color:rgb(236, 183, 79);color:black;";
        cart.setAttribute("disabled","");
       }else{
        //alert("error")
        let cart = document.getElementById("add-cart");
        cart.innerHTML="Already Added";
        cart.style="background-color:rgb(236, 183, 79);color:black;";
        cart.setAttribute("disabled","");
        //cart.setAttribute(disabled,true);
       }
    }
    api.open("GET","api/addcart?pid="+pid)
    api.send()
    console.log(result)
    return result
}