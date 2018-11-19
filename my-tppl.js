//仿写TPPL，使用eval作用域特点（eval的作用域就是eval所在函数的作用域）及自执行函数
//tppl的原理是：将模板代码转化为JavaScript代码，然后执行所得的JavaScript代码，产生HTML结果代码。
function render(temp , data){
    temp=temp.replace(/\r/g," ").replace(/\n/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">");

    var CODE = 0,TEMP=1;
    var result = "(function(){var result = '';";

    var cacheOnce = temp.trim().split("<tppl>");

    for(var i=0; i<cacheOnce.length; i++){
        cache = $.trim(cacheOnce[i]).split("</tppl>");
        //一般情况下cacheOnce[i].split("</tppl>")的结果长度应当为2。第一个为JavaScript代码，第二个为HTML模板。
        //但如果模板不是已<tppl>标签开头的，则cacheOnce[0].split("</tppl>")的结果长度为1，并且此唯一的结果是HTML模板，不是JavaScript代码。
        //所以在此处统一结果
        if(i === 0 && cache.length ===1 ){
            cache[1] = cache[CODE];
            cache[CODE] = "";
        }
        if(cache[CODE].indexOf('=') === 0){
            result += "result += "+cache[CODE].substring(1)+";";
        }else{
            result += cache[CODE];
        }

        if(cache[TEMP] !== undefined && cache[TEMP] !== null){
            result += "result += '"+ cache[TEMP]+"';";
        }

    }
    result += "return result;})();";
    result = eval(result);
    return result;
}
