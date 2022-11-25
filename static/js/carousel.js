//Getting Backgrounds Of Image
var backgroundColorThief = new BackgroundColorTheif();
var color_list = [];

function get_backcolor(image_id){
    var rgb = backgroundColorThief.getBackGroundColor(document.getElementById(image_id));
    var get_bg_color ='rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] +')';
    return get_bg_color;
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
