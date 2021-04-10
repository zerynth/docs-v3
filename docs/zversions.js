
var zversions = {"versions":["v3.0.0"]}

var zversion_set = function(versions) {
    var pathArray = window.location.pathname.split('/');
    //fill version list
    var j,i;
    var vv= versions["versions"]
    for(j=0;j<vv.length;j++) {
        var newPathname = "";
        for (i = 1; i < pathArray.length; i++) {
            newPathname += "/";
            newPathname += (i==1)?vv[j]:pathArray[i];
        } 
        $(".zversion_ul").append('<li class="md-version__item"><a href="'+newPathname+'" class="md-version__link">'+vv[j]+'</a></li>')
    }
}

var zversion_set_version_from_url = function() {
    var pathArray = window.location.pathname.split('/');
    var version=pathArray[1]
    $(".zversion_current").html(version)

}

$(document).ready(function(){
    //immediately set version text
    zversion_set_version_from_url()
    //load all versions
    $.getJSON('/versions.json', function(data) {
        // JSON result in `data` variable
        console.log(data)
        zversion_set(data)
    }).fail(function(){
        console.log("FAILED TO LOAD VERSIONS")
        zversion_set(zversions)
    });
})




