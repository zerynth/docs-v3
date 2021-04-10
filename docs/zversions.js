
var zversions = {"versions":["v3.0.0"]}

var zversion_set = function(versions) {
    var version = "latest"
    var pathArray = window.location.pathname.split('/');
    if (pathArray[0] == "latest") {
        //select last version
        version="latest"
    } else {
        version=pathArray[0]
    }
    $(".zversion_current").text(version)
    //fill version list
    var j,i;
    var vv= versions["versions"]
    for(j=0;j<vv.length;j++) {
        var newPathname = "";
        for (i = 0; i < pathArray.length; i++) {
            newPathname += "/";
            newPathname += (i==0)?vv[j]:pathArray[i];
        } 
        $(".zversion_ul").append('<li class="md-version__item"><a href="'+newPathname+'" class="md-version__link">'+vv[j]+'</a></li>')
        
    }
}


$.getJSON('versions.json', function(data) {
    // JSON result in `data` variable
    console.log(data)
    zversion_set(data)
}).fail(function(){
    zversion_set(zversions)
});




