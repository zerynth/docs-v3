
var zversions = {"versions":["v3.0.0"]}

var zversion_set = function(versions) {
    var pathArray = window.location.pathname.split('/');
    //fill version list
    var j,i;
    var vv= versions["versions"]
    vv.push("v2.6.x")
    vv.push("v2.x")
    var newPathname = "";

    for(j=0;j<vv.length;j++) {
        if (vv[j].startsWith("v3.")) {
            newPathname = "";
            for (i = 1; i < pathArray.length; i++) {
                newPathname += "/";
                newPathname += (i==1)?vv[j]:pathArray[i];
            }
        } else if (vv[j].startsWith("v2.6.") {
            newPathname = "https://docsv2.zerynth.com"
        } else {
            newPathname = "https://olddocs.zerynth.com"
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




