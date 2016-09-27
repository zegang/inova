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
        var devicesHtml = '<div id="'+ devices[i].uuid +'" class="col-xs-3 col-sm-3 col-lg-3 panel panel-info';
        if(i>0) devicesHtml += ' col-md-offset-1">';
        else devicesHtml += '">';
        devicesHtml += '<div class="panel-heading"><h3 class="panel-title">'+ devices[i].title +'</h3></div>' +
            '<table class="table table-striped"><tbody>'+
            '<tr class="row"><td class="col-xs-4 col-sm-4 col-lg-4">UUID</td><td class="col-xs-8 col-sm-8 col-lg-8">' + devices[i].uuid + '</td></tr>' +
            '<tr class="row"><td class="col-xs-4 col-sm-4 col-lg-4">IP:</td><td class="col-xs-8 col-sm-8 col-lg-8">' + devices[i].address.ip + '</td></tr>' +
            '<tr class="row"><td class="col-xs-4 col-sm-4 col-lg-4">Ports:</td> <td class="col-xs-8 col-sm-8 col-lg-8">' + devices[i].address.ports.http + '</td></tr>' +
            '<tr class="row"><td class="col-xs-4 col-sm-4 col-lg-4">RAM:</td> <td class="col-xs-8 col-sm-8 col-lg-8">' + devices[i].capacity.ram + '</td></tr>' +
            '<tr class="row"><td class="col-xs-4 col-sm-4 col-lg-4">CPU:</td> <td class="col-xs-8 col-sm-8 col-lg-8">' + devices[i].capacity.cpu + '</td></tr>' +
            '</tbody></table>'+
            '<div class="row"><div class="col-xs-12">'+ dockersHtml(devices[i].dockers) + '</div></div>'+
            '</div>';
        $("#devicesContainer").append(devicesHtml);
    }
}

function dockersHtml(dockers){
    var dockersTable = '<table class="table"><caption class="text-left"><h4>Docker Images</h4></caption><thead><tr><th>#</th><th>UUID</th><th>Title</th><th>State</th><th>URL</th></tr></thead>';
    dockersTable += '<tbody class="docimgs">';
    for (var i=0; i< dockers.length; i++){
        dockersTable += '<tr><td>'+ (i+1) +'</td><td>'+ dockers[i].uuid +'</td><td>'+ dockers[i].title +'</td><td>'+ dockers[i].state +'</td><td>'+ dockers[i].url +'</td></tr>';
    }
    dockersTable += '<tr ondragover="allowDrop(event)" ondrop="drop(event)"><td colspan="5"> Drag to add docker images</td></tr>';
    dockersTable += '</tbody></table>';
    return dockersTable;
}

function showDockerImages(dockerimages){
    for (var i=0;i<dockerimages.length;i++){
        var htmlText = '<div id="'+ dockerimages[i].uuid +'" class="col-xs-3 col-sm-3 col-lg-3 panel panel-danger ';
        if(i>0) htmlText += 'col-md-offset-1" draggable="true" ondragstart="drag(event)">';
        else htmlText += '" draggable="true" ondragstart="drag(event)">';
        htmlText += '<div class="panel-heading"><h3 class="panel-title">'+ dockerimages[i].title +'</h3></div>'+
            '<table class="table table-striped"><tbody>'+
            '<tr class="row"><td class="col-xs-4 col-sm-4 col-lg-4">UUID</td><td class="col-xs-8 col-sm-8 col-lg-8">' + dockerimages[i].uuid + '</td></tr>' +
            '</tbody></table>'+ 
            '</div>';
        $("#dockerimagesContainer").append(htmlText);
    }
}

