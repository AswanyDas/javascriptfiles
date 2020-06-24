//validation
function validate() {
    if (form.API.value == "") {
        alert("Please provide valid API name!");
        document.myForm.API.focus();
        return false;
    }
    if (form.url.value == "") {
        alert("Please provide valid URL!");
        document.myForm.url.focus();
        return false;
    }
    if (form.schema.value == -1) {
        alert("Please select the schema!");
        document.myForm.schema.focus();
        return false;
    }
    let v = form.schema.value;
    console.log(v);
   if (v!= 'get'){
        if (form.input.value == "") {
            alert("Please enter valid input!");
            document.myForm.input.focus();
            return false;
        }
    }
    return (true); 
}
//validation ends
//Adding values to local storage and table
var arr = new Array;
function addData()
{
    getData();
   arr.push ({
        API:form.API.value,
        url:form.url.value,
        schema:form.schema.value,
        input:form.input.value
    });
    localStorage.setItem("localData",JSON.stringify(arr));
    show();
}
function getData()
{
   var str = localStorage.getItem("localData");
   if(str!= null){
       arr =JSON.parse(str);
   }

}
function deleteData()
{
      localStorage.clear();
}
function show() {
    getData();
   var tbl = document.getElementById("mytbl");
  var z = tbl.rows.length;
    while (--z) {
        tbl.deleteRow(z);
    }
    for (var i = 0; i < arr.length; i++) {
        //var tbl=document.getElementById("mytbl");
        var row = tbl.insertRow();
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        var cell4 = row.insertCell();
        var cell5 = row.insertCell();
        cell1.innerHTML = arr[i].API;
        cell2.innerHTML = arr[i].url;
        cell3.innerHTML = arr[i].schema;
        cell4.innerHTML = arr[i].input;
        cell5.innerHTML = `<a onClick= "onEdit(arr[${i}])">Edit</a>
                          <a onClick ="onDelete(arr[${i}])">Delete</a>`;


    }
}

function onEdit(rowData)
{
console.log(rowData);


}
function onDelete(rowData){
console.log(rowData);


}


//form onsubmit
var form = document.getElementById("myForm");
form.onsubmit = function (e) {
    e.preventDefault();
    validate();
    var s = form.schema.value;
    var u = form.url.value;
    var a = form.input.value;
    console.log(a);
    var choice = document.getElementById("schema").value;
    switch (choice) {
        case 'get':
            fetch(u, ['get'])
                .then(res => res.json())
                .then((data) => {
                    let x = JSON.stringify(data);
                    document.getElementById('output').innerHTML = x;
                })
            break;
        case 'post':
            let response = fetch(u, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset = utf-8'
                },
                body: a
            }).then(response => response.json())
                .then((data) => {
                    let y = JSON.stringify(data);
                    document.getElementById('output').innerHTML = y;
                })
            break;
        case 'put':
            let resp = fetch(u, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset = utf-8'
                },
                body: a
            }).then(resp => resp.json())
                .then((data) => {
                    console.log(data);
                    let y = JSON.stringify(data);
                    document.getElementById('output').innerHTML = y;
                })
            break;
        case 'patch':
            let respo = fetch(u, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json; charset = utf-8'
                },
                body: a
            }).then(respo => respo.json())
                .then((data) => {
                    console.log(data);
                    let y = JSON.stringify(data);
                    document.getElementById('output').innerHTML = y;
                })
        case 'delete':
            fetch(u, {
                method: 'DELETE'
            }).then(respon => respon.json())
                .then((data) => {
                    console.log(data);
                    let y = JSON.stringify(data);
                    document.getElementById('output').innerHTML = y;

                })

        default:
            choice = 'null';

    }

    form.reset();
}
