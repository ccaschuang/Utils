// ==UserScript== 
// @name       Ads Clean Up
// @namespace  ccaschuang@gmail.com
// @version    0.1
// @description  Test to clean up ads
// @copyright  2013+ ccas
// ==/UserScript==

//   // @match    http*://*/*
var ads1= document.getElementsByClassName('imgAd'); //remove CK101 ads
var ads2=document.getElementsByClassName('Ad'); // remove google iframe insert ads
var ads3=document.getElementsByClassName('ads');
var yahooAds= document.getElementsByClassName('yom-ad'); // Yahoo news ads
var ads= [].slice.call(ads1, 0,ads1.length).concat([].slice.call(yahooAds, 0,yahooAds.length)).concat([].slice.call(ads2, 0,ads2.length)).concat([].slice.call(ads3, 0,ads3.length));

for(var i=0;i<ads.length;i++){
    // document.getElementById(ads[i].getAttribute("id")).remove();
    ads[i].parentNode.removeChild(ads[i]);
}

// for some speical iframe settings
var ads= document.getElementsByTagName('iframe'); // remove google ads or some other ads hidden in iframe
var isAd;
//if(ads) alert("has ads. has " + ads.length+" ins tags" ); else alert("no ads");
for(var i=0;i<ads.length;i++){
    isAd= false;
    //alert("i=" + i+ " id=" + ads[i].getAttribute("id"));
   
   
    var id= ads[i].getAttribute("id");
    if(id!=null){
        if(id.toLowerCase().indexOf("ad")!= -1 || id.toLowerCase().indexOf("aswift_")!= -1 )
            isAd =true;
       
    }
   
    var link= ads[i].getAttribute("src");
    if(link!=null){
        if(link.toLowerCase().indexOf("ad_") != -1 || link.toLowerCase().indexOf("ads_") != -1 ||  link.toLowerCase().indexOf("ads_") != -1)
            isAd= true;
    }
   
    var c= ads[i].getAttribute("class");
    if(c!=null){
        if(c.toLowerCase().indexOf("ad_") != -1)
            isAd= true;
    }
   
    if(isAd){
        //alert("isAd... remove iframe");
        ads[i].parentNode.removeChild(ads[i]);
    }
}

ads= document.getElementsByTagName('ins'); // remove google ads using ins tag
for(var i=0;i<ads.length;i++){
    isAd= false;
    var id= ads[i].getAttribute("id");
    if(id!=null){
        if(id.toLowerCase().indexOf("ad_")!= -1 || id.toLowerCase().indexOf("aswift_")!= -1 )
            isAd =true;
       
    }
    if(isAd){
        //alert("isAd... remove iframe");
        ads[i].parentNode.removeChild(ads[i]);
    }
   
}
