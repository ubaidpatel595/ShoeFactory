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
//Varibles of elemnets
var image_list = ["first-image","second-image","third-image","fourth-image"]
var dot_list = ["first-dot","second-dot","third-dot","fourth-dot"]
var back_color = ["#a45e22","#b3e140","#cecdc9","#999999"]
//Function To Change Carousel Image
count = 0;

//Auto image Change
setInterval(change_image, 3000 ,1);
function change_image(direction){
    count = count+direction;
    if (count == -1 || count == 4){
        if(count == -1){
            count = 3;
        }else{
            count = 0;
        }
    }
    document.getElementById(image_list[count]).style="display:block";
    document.getElementById(dot_list[count]).style="background-color:black";
    document.getElementById("carousel").style=`background-color:${back_color[count]}`;
    for(x in image_list){
        if( x == count ){continue;}
        document.getElementById(image_list[x]).style="display:none";
        document.getElementById(dot_list[x]).style="background-color:rgba(0, 0, 0, 0.56);";
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