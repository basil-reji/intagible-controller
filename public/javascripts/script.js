const auth_token = `nnh2kEcoqqunS4wWWgjMlLoogQrEzgTk`;
let getUrl = `https://blynk.cloud/external/api/get`;
let updateUrl = `https://blynk.cloud/external/api/update`;

checkStatus();

function getPinValue(pin) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: getUrl,
            method: "get",
            dataType: "json",
            data: { token: auth_token, pin: `V${pin}` },
            success: (data) => {
                resolve(data);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                resolve(0);
            },
        });
    });
}

function checkStatus() {
    setInterval(() => {
        controllerStatus();
    }, 100);
}

function controllerStatus() {
    getPinValue(0).then((status) => {
        // console.log(status);
        if (status == 1) {
            updateDate();
        } else {
            noAction();
        }
    });
}

function noAction() {
    $("#navigation").css("border-color", "#f66881");
    $(`.device`).removeClass("active");
}

function updateDate() {
    $("#navigation").css("border-color", "#82cdfe");

    getPinValue(5).then((selector) => {
        // console.log(selector)
        $(`.device`).removeClass("active");
        $(`#nav_device${selector}`).addClass("active");

        getPinValue(selector).then((data) => {
            if (data == 1) {
                controllDevice(selector,data)
            } else {
                controllDevice(selector,data)
            }
        });
    });
}

function controllDevice(selector,status){
    if(selector==1){
        if(status==1){
            getPinValue(`${selector}1`).then((data)=>{
                // console.log(data/100)
                $("#hanging_light").css("opacity", `${data/100}`);
            })
        }else{
            $("#hanging_light").css("opacity", `0`);
        }
    }else if(selector==2){
        if(status==1){
            getPinValue(`${selector}1`).then((data)=>{
                // console.log(data/100)
                $("#glass_light").css("opacity", `${data/100}`);
            })
        }else{
            $(`#glass_light`).css("opacity", `0`);
        }
    }else if(selector==3){
        if(status==1){
            getPinValue(`${selector}1`).then((data)=>{
                // console.log(data/100)
                $("#bed_lamp_body").css("opacity", `${data/100}`);
                $("#bed_lamp_light").css("opacity", `${data/100}`);
            })
        }else{
            $(`#bed_lamp_body`).css("opacity", `0`);
            $(`#bed_lamp_light`).css("opacity", `0`);
        }
    }else if(selector==4){
        if(status==1){
            getPinValue(`${selector}1`).then((data)=>{
                // console.log(data/100)
                if(data>=95){
                    data=95
                }
                $(`#fan_leaf`).addClass('on');
                $("#fan_leaf").css("animation-duration", `${1-(data/100)}s`);
            })
        }else{
            $(`#fan_leaf`).removeClass('on');
        }
    }else{

    }
}