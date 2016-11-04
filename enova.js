var devices = [];
var images = [];
var serverurl = "http://146.11.24.216:8010";

function _devicesSort(dev1,dev2){
    return dev1.name > dev2.name;
}

function _imagesSort(img1,img2){
    return img1.name > img2.name;
}

function getDevices(){
        // var url = "http://localhost:8010/device";
        var url = serverurl + "/device";
        $.getJSON(url, function(result) {
                        devices = result.sort(_devicesSort);
                        showDevices(devices);
                        });
}

function getDockerImages(){
        var url = serverurl + "/image";
        // var url = "http://localhost:8010/image";
        $.getJSON(url, function(result) {
                        images= result.sort(_imagesSort);
                        showDockerImages(images);
                        });
}

function deleteImage(imageName){
        $.ajax({ url:  serverurl + "/image/" + imageName, 
                        type: "DELETE",
                        crossDomain:true,
                        success: function(result){ getDockerImages();}
                        });
}

function addImage(imageObj){
        //imageObj = {"name":"albert2","uri":"docker://repository/branch/app/url","Config":"configuration string for application"};
        $.ajax({type: "POST",
                        url: serverurl + "/image",
                        dataType: "json",
                        data: JSON.stringify(imageObj),
                        success: function(result) {
                        console.log("sucess:"+ result.message);
                        },
error: function(xhr){
console.log("Fail:" + xhr.message);
},
complete: function(result){ getDockerImages();}
});
$("#imageAddModal").modal('toggle');
}

function showDevices(devices){
        $("#devicesContainer").empty();
        for (var i=0;i<devices.length;i++){
                var jobTab = "job_"+devices[i].name;
                var hwinfoTab = "hwinfo_"+devices[i].name;
                var imgTab = "images_"+devices[i].name; 
                var devicesHtml = '<div id="'+ devices[i].uuid +'" class="device-div col-xs-3 col-sm-3 col-lg-3 panel panel-info'; if(i>0) devicesHtml += ' col-md-offset-1">';
                else devicesHtml += '">';
                devicesHtml += '<div class="panel-heading"><h3 class="panel-title">'+ devices[i].name +'</h3></div>' +
                        '<table class="table table-striped"><tbody>'+
                        '<tr class="row"><td class="col-xs-4 col-sm-4 col-lg-4">UUID</td><td class="col-xs-8 col-sm-8 col-lg-8">' + devices[i].uuid + '</td></tr>' +
                        '</tbody></table>' +
                        '<ul class="nav nav-tabs" role="tablist"><li role="presentation" class="active"><a href="#' + jobTab +'" role="tab" aria-controls="'+ jobTab + '" aria-expanded="true">Job</a></li><li role="presentation"><a href="#' + hwinfoTab +'" role="tab">Hardware Info</a></li><li role="presentation"><a href="#' + imgTab +'" role="tab">Images</a></li></ul>' +
                        '<div class="tab-content">';
                devicesHtml += '<div id="' + jobTab + '" class="tab-pane fade active in" role="tabpanel" aria-labelledby="' + jobTab + '-tab">';
                if(devices[i].job && devices[i].job != null){
                        devicesHtml += '<table class="table table-striped"><tbody>'+ 
                                '<tr class="row"><td class="col-xs-4 col-sm-4 col-lg-4">Job Name:</td><td class="col-xs-8 col-sm-8 col-lg-8">'+ devices[i].job.name +'</td></tr>' +
                                '<tr class="row"><td class="col-xs-4 col-sm-4 col-lg-4">Status:</td><td class="col-xs-8 col-sm-8 col-lg-8">'+ devices[i].job.status +'</td></tr>' +
                                '<tr class="row"><td class="col-xs-4 col-sm-4 col-lg-4">Pid:</td><td class="col-xs-8 col-sm-8 col-lg-8">'+ devices[i].job.pid +'</td></tr>' +
                                '<tr class="row"><td class="col-xs-4 col-sm-4 col-lg-4">Config:</td><td class="col-xs-8 col-sm-8 col-lg-8">'+ devices[i].job.config +'</td></tr>' +
                                '<tr class="row"><td class="col-xs-4 col-sm-4 col-lg-4">Start Time:</td><td class="col-xs-8 col-sm-8 col-lg-8">'+ devices[i].job.starttime +'</td></tr>' +
                                '<tr class="row"><td class="col-xs-4 col-sm-4 col-lg-4">Image:</td><td class="col-xs-8 col-sm-8 col-lg-8">'+ devices[i].job.Image +'</td></tr>' +
                                '</tbody></table>';
                        devicesHtml += '<div class="row">' + 
                                '<div class="col-xs-3 col-sm-3 col-lg-3"><button disabled="disabled" type="button" class="btn btn-default" onclick="job_start_click(\''+ devices[i].name +'\',\''+ devices[i].job.name +'\')">Start</button></div>' +
                                '<div class="col-xs-3 col-sm-3 col-lg-3"><button type="button" class="btn btn-default" onclick="job_stop_click(\''+ devices[i].name +'\',\''+ devices[i].job.name +'\')">Stop</button></div>' +
                                '<div class="col-xs-3 col-sm-3 col-lg-3"><button type="button" class="btn btn-default" onclick="job_pause_click(\''+ devices[i].name +'\',\''+ devices[i].job.name +'\')" disabled>Pause</button></div>' +
                                '<div class="col-xs-3 col-sm-3 col-lg-3"><button disabled="disabled" type="button" class="btn btn-default" onclick="job_resume_click(\''+ devices[i].name +'\',\''+ devices[i].job.name + '\',\'' + devices[i].job.name + '\')">Resume</button></div>' +
                                '</div>';
                }
                devicesHtml += '</div>';

                devicesHtml += '<div id="' + hwinfoTab +'" class="tab-pane fade" role="tabpanel" aria-labelledby="' + hwinfoTab +'-tab">'+
                        '<table class="table table-striped"><tbody>'+
                        '<tr class="row"><td class="col-xs-4 col-sm-4 col-lg-4">Host:</td><td class="col-xs-8 col-sm-8 col-lg-8">' + devices[i]["HWInfo"].address.host + '</td></tr>' +
                        '<tr class="row"><td class="col-xs-4 col-sm-4 col-lg-4">Mac:</td><td class="col-xs-8 col-sm-8 col-lg-8">' + devices[i]["HWInfo"].address.mac + '</td></tr>' +
                        '<tr class="row"><td class="col-xs-4 col-sm-4 col-lg-4">Ports:</td> <td class="col-xs-8 col-sm-8 col-lg-8">' + devices[i]["HWInfo"].address.port + '</td></tr>' +
                        '<tr class="row"><td class="col-xs-4 col-sm-4 col-lg-4">CPU Cores:</td> <td class="col-xs-8 col-sm-8 col-lg-8">' + devices[i]["HWInfo"].capacity.cpu.cores + '</td></tr>' +
                        '<tr class="row"><td class="col-xs-4 col-sm-4 col-lg-4">CPU Index:</td> <td class="col-xs-8 col-sm-8 col-lg-8">' + devices[i]["HWInfo"].capacity.cpu.index + '</td></tr>' +
                        '<tr class="row"><td class="col-xs-4 col-sm-4 col-lg-4">RAM:</td> <td class="col-xs-8 col-sm-8 col-lg-8">' + devices[i]["HWInfo"].capacity.ram + '</td></tr>' +
                        '<tr class="row"><td class="col-xs-4 col-sm-4 col-lg-4">Storage Total:</td> <td class="col-xs-8 col-sm-8 col-lg-8">' + devices[i]["HWInfo"].capacity.storage.total + '</td></tr>' +
                        '<tr class="row"><td class="col-xs-4 col-sm-4 col-lg-4">Storage Used:</td> <td class="col-xs-8 col-sm-8 col-lg-8">' + devices[i]["HWInfo"].capacity.storage.used + '</td></tr>' +
                        '</tbody></table>'+
                        '</div>'+
                        '<div id="' + imgTab + '" class="tab-pane fade" role="tabpanel" aria-labelledby="' + imgTab + '-tab">'+
                        '<div class="row"><div class="col-xs-12">'+ dockersHtml(devices[i].name, devices[i].Images) + '</div></div>'+
                        '</div>'+
                        '</div>'+
                        '</div>';
                $("#devicesContainer").append(devicesHtml);
        }

        $('.nav-tabs a').click(function(e){ e.preventDefault();$(this).tab('show')});
}

function dockersHtml(deviceName, dockers){
        var dockersTable = '<table id="'+ deviceName + '_img_table' +'" class="table"><thead><tr><th>#</th><th>Name</th><th></th></tr></thead>';
        dockersTable += '<tbody class="docimgs">';
        var i=1;
        for(var j in dockers){
                dockersTable += '<tr><td>'+ (i++) +'</td><td>'+ dockers[j].name +'</td><td><button class="img-op-btn" onclick="showImgOptModal(\''+deviceName+ '\',\'' + dockers[j].name +'\')" type="button"><span class="glyphicon glyphicon-cog"></span></button></td></tr>';
        }
        dockersTable += '<tr ondragover="allowDrop(event)" ondrop="drop(event)"><td colspan="5"><button type="button" class="btn btn-default btn-lg" onclick="add_image_btn_click(\''+ deviceName +'\')"><span class="glyphicon glyphicon-plus-sign"><input type="hidden" value="'+ deviceName +'"> Click to add docker images</span></button></td></tr>';
        dockersTable += '</tbody></table>';
        return dockersTable;
}

function showDockerImages(dockerimages){
        $("#dockerimagesContainer").empty();
        for (var i=0;i<dockerimages.length;i++){
                var htmlText = '<div id="'+ dockerimages[i].name+'" class="image-div col-xs-3 col-sm-3 col-lg-3 panel panel-danger ';
                if(i>0) htmlText += 'col-md-offset-1" draggable="true" ondragstart="drag(event)">';
                else htmlText += '" draggable="true" ondragstart="drag(event)">';
                htmlText += '<div class="panel-heading" ondblclick="editImage(\'' + dockerimages[i].name +'\')"><h3 class="panel-title">'+ dockerimages[i].name+'</h3></div>'+
                        '<table class="table table-striped table-bordered"><tbody>'+
                        '<tr class="row"><td class="col-xs-4 col-sm-4 col-lg-4">URL</td><td class="col-xs-8 col-sm-8 col-lg-8">' + dockerimages[i].uri + '</td></tr>' +
                        '<tr class="row"><td class="col-xs-4 col-sm-4 col-lg-4">Config</td><td class="col-xs-8 col-sm-8 col-lg-8">';
                if(dockerimages[i].Config.length > 40){
                        htmlText += '<abbr title="'+ dockerimages[i].Config+'">'+ dockerimages[i].Config.substring(1,35) +"...</abbr>";
                }else{
                        htmlText += dockerimages[i].Config;
                }
                htmlText += '</td></tr>' +
                        '</tbody></table>'+ 
                        '</div>';
                $("#dockerimagesContainer").append(htmlText);
        }
}

function editImage(imgName){
        $("#imageAddModal_head").html("Eidt a Docker Image");
        $("#imgAddModal_add_btn").hide();
        $("#imgAddModal_delete_btn").show();
        $("#imgAddModal_save_btn").show();
        $("#imgAddModal_title").attr('readonly', true);
        $("#imgAddModal_title").val(imgName);
        var obj = images.find(function(element){return element.name == imgName;});
        $("#imgAddModal_url").val(obj.uri);
        $("#imgAddModal_Config").val(obj.Config);
        $("#imageAddModal").modal('show');
}

function add_image_btn_click(deviceName){
        $("#addImgToDevModal_device").val(deviceName);
        $("#addImgToDevModal").modal('show');  
}

function creatModalForm(){

}

