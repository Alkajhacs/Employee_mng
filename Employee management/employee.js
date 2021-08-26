var arr= new Array();
var selectedRow= null;

function onform1submit() {
    var formdata= readformdata();
    if(selectedRow== null)
        addData();
    else
        updateRecord(formdata,selectedRow)
    resetForm();
}

function readformdata() {
    var formdata= {};
    formdata["txtid"]= document.getElementById("txtid").value;
    formdata["txtname"]= document.getElementById("txtname").value;
    formdata["txtage"]= document.getElementById("txtage").value;
    return formdata;
}

function addData(){
    getData();
    var tempar= new Array();
    for(var i=0;i<arr.length;i++){
        tempar[i]=arr[i].txtid;
    }
    if(!tempar.includes(document.getElementById("txtid").value)){
        arr.push({
            txtid:document.getElementById("txtid").value,
            txtname:document.getElementById("txtname").value,
            txtage:document.getElementById("txtage").value
        });
    }
    else{
            alert("This id already exist");
    }
    localStorage.setItem("localData",JSON.stringify(arr));
    showData();
    getData();
    numberOfPages= Math.ceil(arr.length / numberPerPage);
    load();
    lastPage();
    resetForm();
}

function getData(){
    var str= localStorage.getItem("localData");
    if(str!=null){
        arr= JSON.parse(str);
    }
    else{
        arr= new Array();
    }
    return arr;
}

function showData(){
    getData();
    var table= document.getElementById("employeelist");
    var x= table.rows.length;
    while(--x){
        table.deleteRow(x);
    }
    for(i=0;i<arr.length;i++){
        var newrow= table.insertRow(table.length);
        var cell1= newrow.insertCell(0);
        var cell2= newrow.insertCell(1);
        var cell3= newrow.insertCell(2);
        var cell4= newrow.insertCell(3);
   
        cell1.innerHTML= arr[i].txtid;
   
        cell2.innerHTML= arr[i].txtname;
    
        cell3.innerHTML= arr[i].txtage;
   
        cell4.innerHTML= `<a onClick="onrowEdit(this)" style="color: blue;"><u>Edit</u></a> 
                    <a onClick="onrowDelete(this)" style="color: blue;"><u>delete</u></a> `;
    } 
    resetForm();
}

function onrowEdit(td){
    selectedRow= td.parentElement.parentElement;
    document.getElementById("txtid").value= selectedRow.cells[0].innerHTML;
    document.getElementById("txtname").value= selectedRow.cells[1].innerHTML;
    document.getElementById("txtage").value= selectedRow.cells[2].innerHTML;
    document.getElementById("txtid").disabled= true;
    localStorage.setItem("localData",JSON.stringify(arr));
    
}
function resetForm() {
    document.getElementById("txtid").value="";
    document.getElementById("txtname").value="";
    document.getElementById("txtage").value="";
    selectedRow= null;
}
function deletedata(){
    localStorage.clear();
}
function updateRecord(formdata) {
    for(var i=0; i<arr.length;i++){
        if(arr[i].txtid == formdata.txtid){
            arr[i].txtid= formdata.txtid
            arr[i].txtname= formdata.txtname
            arr[i].txtage= formdata.txtage
        }
    }
    document.getElementById("txtid").disabled= false;
   localStorage.setItem("localData", JSON.stringify(arr));
   load();
   resetForm();
}

function onrowDelete(td){
    if(confirm('Are you sure to delete this record')){
        selectedRow= td.parentElement.parentElement.rowIndex;
        var page= currentPage-1;
        var i= page*numberPerPage+selectedRow;
        var d=arr.splice(i-1,1);
        localStorage.setItem("localData",JSON.stringify(arr));
        
        showData();
        numberOfPages= Math.ceil(arr.length / numberPerPage);
        load();
        resetForm();
    }
}

var arr= JSON.parse(localStorage.getItem("localData"));
var pageList = new Array();
var currentPage = 1;
var numberPerPage = 3;
var numberOfPages = getNumberOfPages();

function getNumberOfPages() {
return Math.ceil(arr.length / numberPerPage);
}

function nextPage() {
    
        currentPage += 1;
        loadList();
}

function previousPage() {
currentPage -= 1;
loadList();
}

function firstPage() {
currentPage = 1;
loadList();
}

function lastPage() {
currentPage = numberOfPages;
loadList();
}

function loadList() {
var arr= JSON.parse(localStorage.getItem("localData"));

var begin = ((currentPage - 1) * numberPerPage);
var end = begin + numberPerPage;

pageList = arr.slice(begin, end);
drawList();
check();
}

function drawList() {
document.getElementById("employeelist").innerHTML = "";
document.getElementById("employeelist").innerHTML=` <caption><h3>Employee details</h3><caption><br>
<input type="text" id="myInput" placeholder="Search by Name,Age......." onkeyup="searchFun('data1')" size="115">
<tr style="background-color: cornflowerblue;">
<th onclick="sortTable(0)"><u>Id</u></th>
<th onclick="sortTable(1)"><u>Name</u> </th>
<th onclick="sortTable(2)"><u>Age </u></th>
<th>Operations</th>
</tr>`;
var table=document.getElementById("employeelist")
for (r = 0; r < pageList.length; r++) {
    var newrow= table.insertRow(table.length);
    var cell1= newrow.insertCell(0);
    var cell2= newrow.insertCell(1);
    var cell3= newrow.insertCell(2);
    var cell4= newrow.insertCell(3);

    cell1.innerHTML= pageList[r].txtid;

    cell2.innerHTML= pageList[r].txtname;

    cell3.innerHTML= pageList[r].txtage;

    cell4.innerHTML= `<a onClick="onrowEdit(this)" style="color: blue;"><u>Edit</u></a> 
                <a onClick="onrowDelete(this)" style="color: blue;"><u>delete</u></a> `;
}
}

function check() {
document.getElementById("next").disabled = currentPage == (numberOfPages) ? true : false;
document.getElementById("previous").disabled = currentPage == 1 ? true : false;
document.getElementById("first").disabled = currentPage == 1 ? true : false;
document.getElementById("last").disabled = (currentPage == (numberOfPages))? true : false;
}

function load() {
loadList();
}

window.onload = load;
