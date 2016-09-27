function getDevices(){
    $.getJSON("http://localhost:8080/devices", function(result) {
            var devices = result.data;
            showDevices(devices);
            });
}

function getDockerImages(){
    $.getJSON("http://localhost:8080/dockerimages", function(result) {
            var dockerimages= result.data;
            showDockerImages(dockerimages);
            });
}

function showDevices(devices){
    for (var i=0;i<devices.length;i++){
        var devicesHtml = '<div id="'+ devices[i].uuid +'" class="col-xs-4 col-sm-4 col-lg-4 panel panel-info">' +
            '<div class="panel-heading">' +
            '<h3 class="panel-title">'+ devices[i].title +'</h3>' +
            '</div>' +
            '<div class="panel-body">' +
            '<div class="row"> <div class="col-xs-4 col-sm-4 col-lg-4">UUID</div> <div class="col-xs-8 col-sm-8 col-lg-8">' + devices[i].uuid + '</div> </div>' +
            '<div class="row"> <div class="col-xs-4 col-sm-4 col-lg-4">IP:</div> <div class="col-xs-8 col-sm-8 col-lg-8">' + devices[i].address.ip + '</div> </div>' +
            '<div class="row"> <div class="col-xs-4 col-sm-4 col-lg-4">Ports:</div> <div class="col-xs-8 col-sm-8 col-lg-8">' + devices[i].address.ports.http + '</div> </div>' +
            '<div class="row"> <div class="col-xs-4 col-sm-4 col-lg-4">RAM:</div> <div class="col-xs-8 col-sm-8 col-lg-8">' + devices[i].capacity.ram + '</div> </div>' +
            '<div class="row"> <div class="col-xs-4 col-sm-4 col-lg-4">RAM:</div> <div class="col-xs-8 col-sm-8 col-lg-8">' + devices[i].capacity.cpu + '</div> </div>' +
            
            '<div class="row"><div class="divider"></div></div>'+
            '<div class="row"><div class="col-xs-12">'+ dockersHtml(devices[i].dockers) + '</div></div>'+
            '</div>' +
            '</div>';
        $("#devicesContainer").append(devicesHtml);
    }
}

function dockersHtml(dockers){
    var dockersTable = '<table class="table"><caption class="text-left"><h4>Docker Images</h4></caption><thead><tr><th>#</th><th>UUID</th><th>Title</th><th>State</th><th>URL</th></tr></thead>';
    for (var i=0; i< dockers.length; i++){
       dockersTable += '<tr><td>'+ (i+1) +'</td><td>'+ dockers[i].uuid +'</td><td>'+ dockers[i].title +'</td><td>'+ dockers[i].state +'</td><td>'+ dockers[i].url +'</td></tr>';
    }
    dockersTable += '<tr ondragover="allowDrop(event)" ondrop="drop(event)"><td colspan="5"> Drag to add docker images</td></tr>';
    dockersTable += '<tbody class="docimgs"></tbody></table>';
    return dockersTable;
}

function showDockerImages(dockerimages){
    for (var i=0;i<dockerimages.length;i++){
        var dockerimagesHtml = 
            '<div id="'+ dockerimages[i].uuid +'" class="col-xs-3 col-sm-2 col-lg-3 col-md-offset-1 panel panel-danger" draggable="true" ondragstart="drag(event)">' +
            '<div class="panel-heading">' +
            '<h3 class="panel-title">'+ dockerimages[i].title +'</h3>' +
            '</div>'+
            '</div>';
        $("#dockerimagesContainer").append(dockerimagesHtml);
    }
}

