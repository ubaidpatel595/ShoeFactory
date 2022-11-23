//Getting Pid
var url = new URL(window.location.href);
var pid = new URLSearchParams(url.search);
var pid = pid.get('pid');

//Ajax Request
var get_data = new XMLHttpRequest();
get_data.onload=retrive;
get_data.open("GET","api/product?pid="+pid);
get_data.send();

function retrive(){
    alert(get_data.responseText)
}