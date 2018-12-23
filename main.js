/**
 * TODO
 * 1、自动更新
 * 2、自定体现
 */


/**
 * 执行规则
 * 1、顺序执行
 * 2、0-7点不执行
 * 3、每次阅读10篇文章
 * 4、阅读时候，需要有一定的停顿
 */
init();
function init(){
    var list = new Array();
    
    /**
     * 靠谱稳定不被封
     */
    list.push("红包头条");//每天稳定0.2
    list.push("中青看点");// 奖励到200就不会增加了
    list.push("趣头条");//每天稳定5毛
 
    /**
     * 验证中
     */
    list.push("微鲤看看");//每天稳定0.5
    list.push("惠头条");//
    list.push("牛牛头条");//
    list.push("头条多多");//
    list.push("薪头条");//
    list.push("看看赚");//
    list.push("兔头条");//
    //list.push("悦头条");//
    list.push("点米头条");//

    /**
     * 完犊子
     */
    //list.push("芝麻头条");//有人机认证
    //list.push("东方头条");//夜里刷被封
    //list.push("芒果看点");//被封

    /**
     * 执行条件：
     * 1、0-7点不执行
     * 2、顺序阅读
     */
    var normalRumTime = 0.5*60*60;//每次阅读的时间
    while(true){
        if(new Date().getHours() >= 7){
            var appNum = list.length;
            for(var i = 0;i< appNum;i++){
                exec(list[i],normalRumTime);
            }
        }else{
            sleep(1000*60*30);//睡眠半个小时
        }
    }
}

//执行脚本
function exec(scriptName,seconds){
    var startDate = new Date();//开始时间
    var exectuion = engines.execScriptFile("/sdcard/脚本/"+scriptName+".js");

    //计时器，检测时间
    var isIExec = true;
    while(isIExec){
        //计时
        var runSeconds = ((new Date().getTime()) - startDate.getTime())/1000;
        toast(scriptName+"已执行"+runSeconds +"秒");
        if(runSeconds >  seconds){
            isIExec = false; 
        }

        sleep(60*1000);//每一分钟检测一次

        //检测当前执行的任务是否已经完成
        //如果发现只有一个进程，则跳转到下一个
        if(engines.all().length < 2){
            isIExec = false; 
            stopCurrent(exectuion);
        }
    }
    //停止脚本
    stopCurrent(exectuion);
}

//停止当前脚本
function stopCurrent(exectuion){
    toast("执行停止");
    exectuion.getEngine().forceStop();
    sleep(2000);
    back();
    sleep(1000);
    back();
    sleep(1000);
    home();
    sleep(5000);
}

