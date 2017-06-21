count = 0;
isontrace = false;
plate="";
tracedCount = 0;

function switchTrace(){
   if(isontrace){
      $("#plateInput").removeAttr("disabled");
      $("#traceBtn").html("Trace");
      plate = "";
      tracedCount = 0;
      isontrace = false;
      alertOnMap("");
   }else{
      plate =  $("#plateInput").val().trim();
      if(plate == ""){
         isontrace = false;
         return;
      }
      $("#plateInput").attr("disabled","disabled");
      $("#traceBtn").html("Stop");
      tracedCount = 0;
      isontrace = true;
  }
}

function updateResult(result){
   var oldR = $("#carResult").val();
   var n = new Date();
   if(result){
      try{
          var resJson = $.parseJSON(result);
          var firstL = resJson.job.result.indexOf("-");
          var secondL = resJson.job.result.indexOf("-",firstL+1);
          var rstToShow = n.toUTCString() + "\t";
          if ( secondL > -1 && firstL != secondL){
              rstToShow += resJson.job.result.substring(firstL + 1, secondL).trim();
          }else{
          }
               
             
          if(count > 20){
              $("#carResult").val(rstToShow);
              count = 0;
          }else{
              $("#carResult").val(rstToShow + "\n" + oldR);
              count++;
          }

          if(isontrace){
              var platesLocation= resJson.job.result.substring(resJson.job.result.indexOf("-")+1);
              var location = platesLocation.substring(platesLocation.lastIndexOf("-") + 1);
              var regexp = new RegExp("\\w*" + plate + "\\w*", "ig");
              var traceHistory = n.toUTCString() + "\t" + location;
              if( platesLocation.indexOf(plate) > -1 ){
                  while( (tmp = regexp.exec(platesLocation)) != null){
                      traceHistory += "\n\t" + tmp; 
                  }
                  if(tracedCount < 20){
                      traceHistory += "\n" + $("#carTraceResult").val();   
                  }else{
                      tracedCount = 0;
                  }
                  tracedCount++;
                  $("#carTraceResult").val(traceHistory);
		  alertOnMap(location);
              }
          }
      }catch(e){ 
          if(count > 20) {
              $("#carResult").val(n.toUTCString() + "\n" + result + "\n\n" + oldR);
              count=0;
          }else{
              $("#carResult").val(n.toUTCString() + "\n" + result + "\n\n" + oldR);
              count++;
          }
      }
   }
}

function refreshPage(){
    var href = window.location.href;
    var deviceId = href.substring(href.lastIndexOf('/') + 1);
    var url = serverurl + "/device/" + deviceId;
    $.ajax({
        url: url,
        success: function(result) {updateResult(result.trim())}
    });
}

function alertOnMap(str){
    var tmp = str.trim().toLowerCase();
    if(tmp.indexOf("beidird") > -1){blinkCamera("#north");return};
    if(tmp.indexOf("jingzhongrd") > -1){blinkCamera("#south");return};
    if(tmp.indexOf("tianshanrd") > -1){blinkCamera("#east");return};
    blinkCamera("");
}

var blinker;
function blinkCamera(camId){
    clearInterval(blinker);
    $(".camera").css("color","black");
    $(camId).css("color","red");
    blinker = setInterval(function(){$(camId).fadeOut(100).fadeIn(100);},200);
}
