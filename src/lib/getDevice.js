
$(function() {
  var g = document.getElementById("deviceScript").innerHTML.replace(/[s]/g, ""),
    j = "https:" == document.location.protocol ? "https://" : "http://",
    f = j + "fk.baofoo.com/getDeviceMemBSUrl.do?callback=?",
    url = j + "fk.baofoo.com/buildBsDevice.do",
    i = document.getElementsByTagName("HEAD").item(0),
    h = document.createElement("script");

  h.type = "text/javascript", $.ajax({
    url: f,
    dataType: "jsonp",
    jsonpCallback: "callback",
    data: {
      key: g
    },
    success: function(b) {
      b = eval('('+b+')');
      h.src = j + b[1],i.appendChild(h);

      jQuery.getScript( j + b[0], function(data, status, jqxhr) {
        getBSDevice(0,g,url);
      });

    }
  })
});

function getCookie(name)
{
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}

function getBSDevice(i,key,url) {
  i++;
  if (i > 20) {
    return "";
  }
  var device = getCookie("BSFIT_DEVICEID");
  if(device == null) {
    setTimeout(function() {
      getBSDevice(i,key,url);
    },200);
  }else{
    $.ajax({
      url: url,
      dataType: "json",
      data: {
        device: device,
        key: key
      },
      success:function(data) {
        console.log("success!data:"+data)
      }
    });
    return device;
  }

}
//$(function() {
//  var g = document.getElementById("deviceScript").innerHTML.replace(/[s]/g, ""),
//    j = "https:" == document.location.protocol ? "https://" : "https://",
//    f = j + "fk.baofoo.com/getDeviceMemUrl.do?callback=?",
//    i = document.getElementsByTagName("HEAD").item(0),
//    h = document.createElement("script");
//  h.type = "text/javascript", $.ajax({
//    url: f,
//    dataType: "jsonp",
//    jsonpCallback: "callback",
//    data: {
//      key: g
//    },
//    success: function(b) {
//      h.src = j + b, i.appendChild(h)
//    }
//  })
//});

//eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('$(3(){m g=1.G("6").n.a(/[s]/g,""),j="5:"==1.7.r?"5://":"8://",f=j+"9.4.c/4-d-e/k.l?2=?",i=1.o("p").q(0),h=1.t("u");h.v="w/x",$.y({z:f,A:"B",C:"2",D:{E:g},F:3(b){h.H=j+b,i.I(h)}})});',45,45,'|document|callback|function|baofoo|https|deviceScript|location|http|tfk|replace||com|rm|front||||||deviceUrl|do|var|innerHTML|getElementsByTagName|HEAD|item|protocol||createElement|script|type|text|javascript|ajax|url|dataType|jsonp|jsonpCallback|data|key|success|getElementById|src|appendChild'.split('|'),0,{}))

//eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('$(2(){l g=1.E("5").k.8(/[s]/g,""),j="4:"==1.p.6?"4://":"7://",f=j+"9.a.c/d.e?3=?",i=1.m("n").o(0),h=1.q("r");h.t="u/v",$.w({x:f,y:"z",A:"3",B:{C:g},D:2(b){h.F=j+b,i.G(h)}})});',43,43,'|document|function|callback|https|deviceScript|protocol|http|replace|fk|baofoo||com|getDeviceMemUrl|do||||||innerHTML|var|getElementsByTagName|HEAD|item|location|createElement|script||type|text|javascript|ajax|url|dataType|jsonp|jsonpCallback|data|key|success|getElementById|src|appendChild'.split('|'),0,{}))