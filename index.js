/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

/* global data, jsonChg */

var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL = '/api/irl';
var jpdbIML = '/api/iml';
var studentDBName = "Student";
var relationName = 'class-student';
var connToken = '90931396|-31949321886520282|90950362';

//$("#rollno").focus();

function saveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}

function getRollNoAsJsonObj(){
    var rollno = $("#rollno").val();
    var jsonStr = {
        rollno : rollno
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
//    $('#rollname').val(record.rollno);
    $('#fullname').val(record.name);
    $('#clas').val(record.class);
    $('#birthdate').val(record.birth);
    $('#address').val(record.address);
    $('#enrollmentdate').val(record.enrollment);
}

function resetForm(){
    $('#rollno').val("");
    $('#fullname').val("");
    $('#clas').val("");
    $('#birthdate').val("");
    $('#address').val("");
    $('#enrollmentdate').val("");
    $('#rollno').prop("disabled", false);
    $('#save').prop("disabled", true);
    $('#update').prop("disabled", true);
    $('#reset').prop("disabled", true);
    $('#rollno').focus();
}


function validateData(){
    var rollno, fullname, clas, birthdate, address, enrollmentdate;
    rollno = $("#rollno").val();
    fullname = $("#fullname").val();
    clas = $("#clas").val();
    birthdate = $("#birthdate").val();
    address = $("#address").val();
    enrollmentdate = $("#enrollmentdate").val();
    
    if (rollno === ""){
        alert('Roll No missing');
        $("#rollno").focus();
        return "";
    }
    if (fullname === ""){
        alert('Name missing');
        $("#fullname").focus();
        return "";
    }
    if (clas === ""){
        alert('clas');
        $("#clas").focus();
        return "";
    }
    if (birthdate === ""){
        alert('Birthdate Missing');
        $("#birthdate").focus();
        return "";
    }
    if (address === ""){
        alert('Address missing');
        $("#address").focus();
        return "";
    }
    if (enrollmentdate === ""){
        alert('enrollmentdate missing');
        $("#enrollment").focus();
        return "";
    }
    
    var jsonStrObj = {
        rollno: rollno,
        name: fullname,
        class: clas,
        birth: birthdate,
        address: address,
        enrollment: enrollmentdate
    };
    return JSON.stringify(jsonStrObj);
}



function getStudent(){
    var rollNoJsonObj = getRollNoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, studentDBName, relationName, rollNoJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async:true});
    if(resJsonObj.status === 400){
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#fullname").focus();
    } else if(resJsonObj.status === 200){
        
        $("#rollno").prop("disabled", true);
        fillData(resJsonObj);
        
        $("#update").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#fullname").focus();
    }
}


function saveData(){
    var jsonStrObj = validateData();
    if(jsonStrObj === ''){
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, studentDBName, relationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $('#rollno').focus();
}

function updateData(){
    $('#update').prop('disabled', true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, studentDBName, relationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $('#rollno').focus();
}





