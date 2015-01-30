var api = new function(){
    
    base = "https://app.sycamoreeducation.com/api/v1/",
    
    getData = function(endpoint, params){
        console.log("Attempting to call API - get");
        console.log("Endpoint: " + endpoint);
        return  $.getJSON(base + endpoint, params);
    },
    
    postData = function(endpoint, data){
        console.log("Attempting to call API - post");
        console.log("Endpoint: " + endpoint);
        return $.post(base + endpoint, data);
    },
    
    redirect = function(){
        var path = 'https://app.sycamoreeducation.com/oauth/authorize.php?';
        var queryParams = ['client_id=' + CONFIG.client_id,
        'redirect_uri=' + CONFIG.callback_uri,
        'scope=general open individual',
        'response_type=token'];
        var query = queryParams.join('&');
        var url = path + query;
        window.open(url,"_self"); 
    },
    
    verifyOAuth = function(){
        var rawParams = window.location.hash.substring(1);
        var oAuthData = parseParams(rawParams);
        setLocalStorage(oAuthData[0]);
                
        window.open("classes.html", "_self");  
    };
    
    return {
        getData: getData,
        postData: postData,
        redirect: redirect,
        verifyOAuth: verifyOAuth
    };
    
} ();

/*(endpoint, verb, params, data){
    console.log("Attempting to call API");
    console.log("Endpoint: " + endpoint);
    $.ajax({
        url: "https://app.sycamoreeducation.com/api/v1/"+endpoint,
        type: verb,
        crossDomain: true,
        datatype: 'json',
        processData: false,
    })
    .done(function(data, statusText, xhr){
        console.log("data: " + data);
        console.log("status text: " + statusText);
        console.log("xhrs: " + xhr);
        work(data);
    })
    .fail(function(xhr, textStatus, errorThrown) {
        console.log(xhr);
        console.log(textStatus);
        console.log(errorThrown);
    });
}*/


$.ajaxSetup({
    'beforeSend': function(xhr) {
        //var access_token = localStorage.getItem("sycamore_auth");
        var access_token = CONFIG.access_code;
        xhr.setRequestHeader('Authorization', 'Bearer '+access_token);
    }
});

$(".logout").click(function(){
    alert("clicked");
    
    window.location.replace("index.html");
    localStorage.clear();

});