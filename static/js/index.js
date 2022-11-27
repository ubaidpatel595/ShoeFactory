
//Updating Cart With Numbers of Items
let cart_cnt  = new XMLHttpRequest();
cart_cnt.onload = function(){
    let cart_items = this.responseText;
    if(cart_items < 9){
        document.getElementById("cart_items").innerHTML=cart_items;
    }else{
        document.getElementById("items-circle").setAttribute("r", "250")
        document.getElementById("items-circle").setAttribute("cx", "740")
        document.getElementById("items-circle").setAttribute("cy", "-110")
        document.getElementById("cart_items").innerHTML=cart_items;
    }
}
cart_cnt.open("GET","api/cartcount")
cart_cnt.send()


var login_status = sessionStorage.login_status;
if(login_status == "true"){
    document.getElementById("myaccount-btn").style="display:inline-block";
    document.getElementById("login-btn").style="display:none";
    document.getElementById("signup-btn").style="display:none";
}else{
    document.getElementById("myaccount-btn").style="display:none";
    document.getElementById("login-btn").style="display:inline-block";
    document.getElementById("signup-btn").style="display:inline-block";
}

//Search Sugestion
var nav_search = document.getElementById("nav-search");
nav_search.addEventListener("keyup",suggest)
function suggest(){
    alert(nav_search.value)
}

//Profile Btn Rotate
var my_profile = document.getElementById("myaccount-btn");

my_profile.addEventListener("click",rotate_drop);
val = 0;

//Checking If User Clicked Outside My Account Button
window.onclick = function (event){
    if(event.target.id != "myaccount-btn" &&  event.target.id != "myaccount-options"
    && event.target.className != "myaccount-options" &&  event.target.id != "drop_btn"){
        document.getElementById("drop_btn").style="transform:rotate(270deg)";
        document.getElementById("myaccount-options").style="display:none";
        val = 0;
    }}

//My Account dropdown
function rotate_drop(){
    if(val==0){;
    document.getElementById("drop_btn").style="transform:rotate(90deg)";
    document.getElementById("myaccount-options").style="display:block";
    val +=1;
    }else{
        document.getElementById("drop_btn").style="transform:rotate(270deg)";
        document.getElementById("myaccount-options").style="display:none";
        val = 0;
    }
}

