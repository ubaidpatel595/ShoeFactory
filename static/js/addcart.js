function add_cart(){
    //getting Username
    let user_name =sessionStorage.getItem("req_user")
    let api = new XMLHttpRequest();
    api.onload = function(){
       result = this.responseText;
    }
    api.open("GET","api/addcart?pid="+pid)
    api.send()
    console.log(result)
    return result
}