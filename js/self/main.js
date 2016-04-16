/**
 * Created by henry on 2016/1/2.
 */


$(".banner").on("click",function(){
    $(this).children('ul').toggle();
});
var server = "http://"+location.hostname+ ":8080/blog/";
//var server = "http://115.28.33.164:8080/blog/";
var param = {};
function selectByTag(){
    param['dataJson'] = JSON.stringify({author:"拾荒者"});
    $.post(server+"selectByAuthor",param,function(data){
        var dataJson = $.parseJSON(data);
        if (dataJson.status == 0){
            var num = dataJson.data.length;
            console.log(dataJson.data.length);
            for(var i=0;i<num;i++){
                console.log(dataJson.data[i].tag);
                $('#content').append(
                    "<div style='border-bottom: 1px solid #eeeeee;padding-bottom: 4px'>"+
                    "<h2 style='font-size: 20px'><a id='uuid"+i+"'>"+dataJson.data[i].title+"</a></h2>"+
                    "<p style='margin-top: 5px;margin-bottom: 5px;font-size: 16px'>"+dataJson.data[i].brief+"</p>"+
                    "<div class='row' style='font-size: 16px'>" +
                    "<span class='col-sm-3 '>" +
                    "<span class='glyphicon glyphicon-thumbs-up'></span>" +
                    "<span style='margin-left: 3px'>1</span>"+
                    "</span>"+
                    "<span class='col-sm-3' >" +
                    "<span class=' glyphicon glyphicon-envelope'></span>" +
                    "<span style='margin-left: 3px'>"+dataJson.data[i].comments+"</span>"+
                    "</span>"+
                    "<span class='col-sm-3'>" +
                    "<span class=' glyphicon glyphicon-time'></span>" +
                    "<span style='margin-left: 3px'>"+dateToString(dataJson.data[i].createTime)+"</span>"+
                    "</span>"+
                    "<span class='col-sm-3'>" +
                    "<span class=' glyphicon glyphicon-tag'></span>" +
                    "<span style='margin-left: 3px'>"+getTagNameByTagNo(dataJson.data[i].tag)+"</span>"+
                    "</span>"+
                    "</div>"+
                    "</div>"
                );
                document.getElementById("uuid"+i+"").value=dataJson.data[i].uuid;
            }
            $("a[id^='uuid']").on('click',function () {
                location.href = "detail.html?uuid="+document.getElementById($(this).attr("id")).value;
            });
        }else{
            alert(dataJson.message);
        }
    })
}
function getTagNameByTagNo(tagNo){
    var tagName = null;
    param['dataJson'] = JSON.stringify({tagNo:tagNo})
    $.ajaxSetup({
        async: false
    });
    $.post(server+"getTagNameByTagNo",param,function(data){
        tagName = $.parseJSON(data).data;
    });
    console.log(tagName);
    return tagName;
}

function dateToString(longDate){
    var date = new Date(longDate);
    month = date.getMonth()+1;
    var returnDate = date.getFullYear().toString().substring(2,4)+"-"+month+"-"+date.getDate();
    return returnDate;
}

function getUrlParam(){
    var url = location.search;
    var theParam = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theParam[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
        }
    }
    return theParam;
}