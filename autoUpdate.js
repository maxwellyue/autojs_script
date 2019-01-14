function 更新程序(){
    var spid = "趣头条刷金币";//脚本识别id
    var Edition = 3;//当前版本号
    var url = "http://wj.aiselp.ml/index.php?share/fileDownload&user=1&sid=REf4bvdm";
    var str = http.get(url)
    str = JSON.parse(str.body.string());
    if (str[spid].版本>Edition){
        var f = engines.myEngine().cwd()+"/"+spid+"("+str[spid].版本+").js";
        if (!files.exists(f)){
        files.write(f,http.get(str[spid].url).body.string());
        toast("脚本已更新，保存在当前脚本所在目录，请使用新的脚本");
        } else toast("文件已存在");
        exit();
        } else if (str[spid].版本==Edition) toast("脚本已是最新");
    }
    更新程序();