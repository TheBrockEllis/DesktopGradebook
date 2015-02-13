var api = new function(){
    
    base = "https://app.sycamoreeducation.com/api/v1/",

    get = function(key){
        console.log("Getting " + key);
        return localStorage.getItem(key);
    },

    set = function(key, value){
        console.log("Setting " + key + " => " + value);
        return localStorage.setItem(key, value);
    },
    
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
    
    authenticate = function(){
        var path = 'https://app.sycamoreeducation.com/oauth/authorize.php?';
        var queryParams = ['client_id=' + CONFIG.client_id,
        'redirect_uri=' + CONFIG.callback_uri,
        'scope=general open individual',
        'response_type=token'];
        var query = queryParams.join('&');
        var url = path + query;
   
        function Response() {
            this.access_token = null; 
            this.expires_in  = null;
        };

        var response = new Response();
    
        window.hashUpdate = function(){ 
            //function called every 500ms to check if token is in url
            console.log("Checking hash");
            console.log(window.loginWindow);

            if(window.loginWindow.closed){
                window.clearInterval(intervalID);
            } else {
                var url = window.loginWindow.document.URL;
                console.log(url);
                var tabUrl = url.split("#"); //first split to separate the domain part and the parameter part
                var hashString = tabUrl[1]; //I concerned only by the second part after the '#'
                
                if(hashString != undefined){
                    var allParam = hashString.split("&");
                    for (var i = 0; i < allParam.length; i++) {
                        var oneParamKeyValue = allParam[i].split("=");
                        response[oneParamKeyValue[0]] = oneParamKeyValue[1]; //store my token in form of key => value
                    };

                    //close the window after 1500ms
                    setTimeout(function(){
                        //save shit here
                        console.log(response);
                        api.set("access_token", response.access_token);
                        api.getData("Me").done(function(me){
                            console.log("Gettin done gettin me");
                            for(var key in me){
                                api.set(key, me[key]);
                            }
                        
                            window.loginWindow.close();
                            location.href = "classes.html";
                        
                        });
                    }, 1500);
                }
            }
        };

        window.loginWindow = window.open(url, "Login Sycamore", false);
        window.intervalID = window.setInterval("window.hashUpdate()", 1000); 
    };

    return {
        get: get,
        set: set,
        getData: getData,
        postData: postData,
        authenticate: authenticate,
    };
    
} ();

$.ajaxSetup({
    'beforeSend': function(xhr) {
        var access_token = api.get("access_token");
        //var access_token = CONFIG.access_code;
        xhr.setRequestHeader('Authorization', 'Bearer '+access_token);
    }
});

$(".logout").click(function(){
    alert("clicked");
    
    window.location.replace("index.html");
    localStorage.clear();

});
