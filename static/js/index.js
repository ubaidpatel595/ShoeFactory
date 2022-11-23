//Getting Backgrounds Of Image
var backgroundColorThief = new BackgroundColorTheif();
var color_list = [];

function get_backcolor(image_id){
    var rgb = backgroundColorThief.getBackGroundColor(document.getElementById(image_id));
    var get_bg_color ='rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] +')';
    return get_bg_color;
}
//console.log(backgroundColorThief)

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


//Varibles of elemnets
dot_ids=["dot-1","dot-2","dot-3","dot-4","dot-5"];
img_ids=["image-1","image-2","image-3","image-4","image-5"];

//Function To Change Carousel Image
count = 0;
window.onload = setTimeout(aaa,1000)
function aaa(){
    var carou_elems = document.getElementById("carousel").childElementCount-1;
    return parseInt(carou_elems)
}
//Auto image Change
setInterval(change_image, 3000 ,1);
function change_image(direction){
    count = count+direction;
    if (count == -1 || count == aaa()){
        if(count == -1){
            count = aaa()-1;
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

