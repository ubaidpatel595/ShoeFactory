//Getting Pid
var url = new URL(window.location.href);
var pid = new URLSearchParams(url.search);
var pid = pid.get('pid');
dot_ids=["dot-1","dot-2","dot-3","dot-4","dot-5"];
img_ids=["image-1","image-2","image-3","image-4","image-5"];
//Ajax Request
var get_data = new XMLHttpRequest();
get_data.onload=retrive;
get_data.open("GET","api/product?pid="+pid);
get_data.send();

function retrive(){
    var restext = get_data.responseText
    var restext = restext.replace(/\'/g,"\"");
    var restext = JSON.parse(restext)
    data_use(restext)
}

//Creationg Image_objects
function create_elems(pos,elem_type,img_src){
    if (elem_type == "img"){
    var cr_img = document.createElement("img");
    cr_img.id=img_ids[pos]
    cr_img.className = "carousel-image"
    cr_img.src="static/uploads/"+img_src;
    if (pos != 0){
        cr_img.style="display:none"
    }
    return cr_img
    }else{
    var cr_dot = document.createElement("span");
    cr_dot.id = dot_ids[pos]
    cr_dot.className = "dot"
    return cr_dot
    }
}

var img_carousel = document.getElementById("carousel");
var dots_container = document.getElementById("dots");
var title_elem = document.getElementById("prod-title");
var price_elem = document.getElementById("price");
var mrp_elem = document.getElementById("mrp");
var disco_elem = document.getElementById("discount");
var desc_elem = document.getElementById("desc");
//Data Rendering
function data_use(data){
    let title_str = data[0];
    let price_str = data[1];
    let mrp_str = data[2];
    let delivery_str = data[3];
    let desc_str = data[4];
    let img_list = data[5];
    let discount = disc_calc(mrp_str,price_str)

    //Displaying DAta 
    title_elem.innerHTML=title_str;
    desc_elem.innerHTML=desc_str;
    price_elem.innerHTML="₹"+price_str;
    mrp_elem.innerHTML="₹"+mrp_str;
    disco_elem.innerHTML=`${discount}% Discount`;

    for (x in img_list){
        var img_src = img_list[x]
        img_carousel.appendChild(create_elems(x,"img",img_src));
        dots_container.appendChild(create_elems(x,"dots","not"));
    }
}

//Index.js 

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
//Getting Child Elements

//Getting Backgrounds Of Image
var backgroundColorThief = new BackgroundColorTheif();
var color_list = [];

function get_backcolor(image_id){
    var rgb = backgroundColorThief.getBackGroundColor(document.getElementById(image_id));
    var get_bg_color ='rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] +')';
    return get_bg_color;
}
//Varibles of elemnets
dot_ids=["dot-1","dot-2","dot-3","dot-4","dot-5"];
img_ids=["image-1","image-2","image-3","image-4","image-5"];
//Function To Change Carousel Image
count = 0;
window.onload = setTimeout(count_carousel_child,100)
window.onload=setTimeout(set_image_bg,50);
function set_image_bg(){
    document.getElementById("carousel").style=`background-color:${get_backcolor(img_ids[count])}`;
}
function count_carousel_child(){
    var carou_elems = document.getElementById("carousel").childElementCount-1;
    
    return parseInt(carou_elems)
}
//Auto image Change
function change_image(direction){
    count = count+direction;
    if (count == -1 || count == count_carousel_child()){
        if(count == -1){
            count = count_carousel_child()-1;
        }else{
            count = 0;
        }
    }
    document.getElementById(img_ids[count]).style="display:block";
    document.getElementById(dot_ids[count]).style="background-color:black";
    document.getElementById("carousel").style=`background-color:${get_backcolor(img_ids[count])}`;
    for(x in img_ids){
        if( x == count ){continue;}
        document.getElementById(img_ids[x]).style="display:none";
        document.getElementById(dot_ids[x]).style="background-color:rgba(0, 0, 0, 0.56);";
}}

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
//Discount Calculator
function disc_calc(m_rp,p_rice){
    m_rp=parseInt(m_rp);
    p_rice=parseInt(p_rice);
    let perc = m_rp/100;
    let discount = p_rice/perc;
    discount = 100-discount;
    discount = String(discount);
    discount = discount.slice(0,2)
    return discount;
}

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

document.getElementById("buy-now").addEventListener("click",checkout)
function checkout (){
    location.href="checkout?pid="+pid
}