function update(scriptName,scriptVersion){
    var url = "https://raw.githubusercontent.com/RyanPro/autojs_script/master/version.js";
    var str = http.get(url)
    str = JSON.parse(str.body.string());
    for(var i = 0; i< str.length;i++){
        var thisScript = str[i];
        var name = thisScript.name;
        var version = thisScript.version;
        
        if(scriptName == name && version != scriptVersion){
            var path = "/sdcard/"+scriptName+".js";
            var scriptContent = "https://raw.githubusercontent.com/RyanPro/autojs_script/master/"+scriptName+".js";
            files.write(path,scriptContent);
            return true;
        }
        return false;
    }
}