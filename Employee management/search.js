function searchFun(str) {
    // Declare variables
    var input, filter, table,i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("employeelist");
    
    for(i=1;i<table.rows.length;i++)
    {
    table.deleteRow(i);
    }
    // Loop through all table rows, and hide those who don't match the search query
    if(str=='data1')
    {
      for (i = 0; i < arr.length; i++) {
        if((arr[i].txtname.toUpperCase()== filter) || (arr[i].txtage.toUpperCase()== filter)){
        var keys= Object.values(arr[i]);
        var newrow= table.insertRow(table.length);
        var cell1= newrow.insertCell(0);
        var cell2= newrow.insertCell(1);
        var cell3= newrow.insertCell(2);
        var cell4= newrow.insertCell(3);

        cell3.innerHTML= arr[i].txtage;
        
        cell1.innerHTML= arr[i].txtid;
   
        cell2.innerHTML= arr[i].txtname;
   
        cell4.innerHTML= `<a onClick="onrowEdit(this)" style="color: blue;"><u>Edit</u></a> 
                    <a onClick="onrowDelete(this)" style="color: blue;"><u>delete</u></a> `;
        }
    }
}
else {
  for (i = 0; i < arr.length; i++) {
    if(arr[i].txtname.toUpperCase()== filter){
    var newrow= table.insertRow(table.length);
    var cell1= newrow.insertCell(0);
    var cell2= newrow.insertCell(1);
    var cell3= newrow.insertCell(2);

    cell1.innerHTML= arr[i].txtid;

    cell2.innerHTML= arr[i].txtname;

    cell3.innerHTML= `<a onClick="onrowEdit(this)" style="color: blue;"><u>Edit</u></a> 
                <a onClick="onrowDelete(this)" style="color: blue;"><u>delete</u></a> `;
    }
}
}
}