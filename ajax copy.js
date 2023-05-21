$(document).ready(function () {    
 // fnLoadDataTableInstance() ;   
})    
function fnLoadDataTableInstance() {    
  var dataSource = [    
      { id: '101', name: 'Gowtham', age: 28, city: 'Coimbatore', state: 'Tamil Nadu' },    
      { id: '102', name: 'Sudhan', age: 38, city: 'Ooty', state: 'Tamil Nadu' },    
      { id: '103', name: 'Vignesh', age: 34, city: 'Erode', state: 'Tamil Nadu' },    
      { id: '104', name: 'CSK', age: 34, city: 'Coimbatore', state: 'Tamil Nadu' },    
      { id: '105', name: 'Arvind', age: 28, city: 'Coimbatore', state: 'Tamil Nadu' },    
      { id: '106', name: 'Rahul', age: 38, city: 'Ooty', state: 'Tamil Nadu' },    
      { id: '107', name: 'Raji', age: 34, city: 'Erode', state: 'Tamil Nadu' },    
      { id: '108', name: 'Ananthi', age: 34, city: 'Coimbatore', state: 'Tamil Nadu' },     
  ]     
      
  $('#dtExample').DataTable({    
    dom: 'Bfrtip',    
    data: dataSource,    
    columns: [    
        {    
            render: function (data, type, row, meta) {    
                return meta.row + meta.settings._iDisplayStart + 1;    
            }    
        },    
        { data: 'name', class: 'editable text' },    
        { data: 'age' },    
        { data: 'city' },    
        { data: 'state' },    
        {    
            //edit button creation    
            render: function (data, type, row) {    
                return createButton('edit', row.id);    
            }    
        },    
        {    
            //delete button creation    
            render: function (data, type, row) {    
                return createButton('delete', row.id);    
            }    
        }    
    ],    
    "searching": false,    
    "paging": true,    
    "info": true,    
    "language": {    
        "emptyTable": "No data available"    
    },    
    "fnRowCallback": function (nRow, aData, iDisplayIndex) {    
        $("td:first", nRow).html(iDisplayIndex + 1);    
        return nRow;    
    },    
  })    
}    


   


function createButton(buttonType, rowID) {    
  var buttonText = buttonType == "edit" ? "Edit" : "Delete";    
  return '<button class="' + buttonType + '" type="button">' + buttonText+'</button>';    
}  



$('#dtExample').on('click', 'tbody td .edit', function (e) {    
  fnResetControls();    
  var dataTable = $('#dtExample').DataTable();    
  var clickedRow = $($(this).closest('td')).closest('tr');    
  $(clickedRow).find('td').each(function () {    
      // do your cool stuff    
      if ($(this).hasClass('editable')) {    
          if ($(this).hasClass('text')) {    
              var html = fnCreateTextBox($(this).html(), 'name');    
              $(this).html($(html))    
          }    
      }    
  });     
  
  
  $('#dtExample tbody tr td .update').removeClass('update').addClass('edit').html('Edit');    
  $('#dtExample tbody tr td .cancel').removeClass('cancel').addClass('delete').html('Delete');    
  $(clickedRow).find('td .edit').removeClass('edit').addClass('update').html('Update');    
  $(clickedRow).find('td .delete').removeClass('delete').addClass('cancel').html('Cancel');    
  
});    
  
function fnCreateTextBox(value, fieldprop) {    
  return '<input data-field="' + fieldprop + '" type="text" value="' + value + '" ></input>';    
}    




$('#dtExample').on('click', 'tbody td .cancel', function (e) {    
  fnResetControls();    
  $('#dtExample tbody tr td .update').removeClass('update').addClass('edit').html('Edit');    
  $('#dtExample tbody tr td .cancel').removeClass('cancel').addClass('delete').html('Delete');    
});    


function fnResetControls() {    
  var openedTextBox = $('#dtExample').find('input');    
  $.each(openedTextBox, function (k, $cell) {    
      $(openedTextBox[k]).closest('td').html($cell.value);    
  })    
}   




$('#dtExample').on('click', 'tbody td .update', function (e) {    
    
  var openedTextBox = $('#dtExample').find('input');    
  $.each(openedTextBox, function (k, $cell) {    
      fnUpdateDataTableValue($cell, $cell.value);    
      $(openedTextBox[k]).closest('td').html($cell.value);    
  })    

  $('#dtExample tbody tr td .update').removeClass('update').addClass('edit').html('Edit');    
  $('#dtExample tbody tr td .cancel').removeClass('cancel').addClass('delete').html('Delete');    
});    

function fnUpdateDataTableValue($inputCell, value) {    
  var dataTable = $('#dtExample').DataTable();    
  var rowIndex = dataTable.row($($inputCell).closest('tr')).index();    
  var fieldName = $($inputCell).attr('data-field');    
  dataTable.rows().data()[rowIndex][fieldName] = value;    
}    







///////////

$(document).ready(function() {
    
 
  
  var dataTable = $('#datatable').DataTable({
      
    ajax:{url:"data.json",dataSrc:""},
      
      "columns": [
          { "data": "albumId" },
          { "data": "id" },
          { "data": "title" },
          { "data": "url" },
          { "data": "thumbnailUrl" },

         { "data": null,
                "defaultContent": '<button class="clone" onclick="myFunctionadd(this);">clone</button>'
      }
          
      ]
      
  });
  
  //$('#datatable').on('click', 'tbody > tr', function() {

    $('#datatable tbody').on('click', 'tr', function () {
      
      if( !$(this).hasClass('selected') ) {
         
         $('#datatable > tbody > tr.selected').removeClass('selected')
         
         $(this).addClass('selected');
      
      }
      
  });
  
  
  $('#datatable').on('dblclick', 'tbody td', function() {

   // alert('Row ' + $(this).closest("tr").index());
//alert('Column ' + $(this).closest("td").index());
      
if($(this).closest("td").index() == '2'){
  this.innerHTML = '';
  $(this).append("<select id='nodeid'><option  value='select'>select</option><option value='dynamic'>dynamic</option><option value='static'>static</option><option value='TEST3'>TEST3</option></select>");
  var e = document.getElementById("nodeid");
 
  var oldData ='';
  var cell = dataTable.cell($(this).parent('td'));
  oldData = cell.data();

  const newOption = document.createElement('option');
const optionText = document.createTextNode(oldData);
// set option text
newOption.appendChild(optionText);
// and option value
newOption.setAttribute('value',oldData);
//e.appendChild(newOption);
  //oldData = cell.data();
 //.value = oldData;
  var outputString ='';
  // outputString = this.options[e.selectedIndex].value;
  //var getValue = document.getElementById('nodeid').selectedOptions[0].value;
 // onchange=run(this.value);
 
 
 e.addEventListener('change', function handleChange(event) {
 // alert(event.target.value); // 👉️ get selected VALUE
 //$(this).innerHTML = event.target.value;
 
  
 //alert(oldData);
 //$(this).remove();
 //alert(event.target.value);
 var outputString = event.target.value;
 //alert(outputString);
 //$(this).innerHTML = outputString;

 var cell = dataTable.cell($(this).parent('td'));

 oldData = cell.data();
      var row = dataTable.row($(this).parents('tr'));
      
      

      //alert(oldData);
     // alert(outputString);

      if(oldData == outputString){
        cell.data(oldData);

      }
      else{
        cell.data(outputString);
      }
      
     

      
 });
  //alert(outputString);
  //this.innerHTML = '';
  //$(this).empty();
  //$(this).remove('select');
  //.empty();
  //.remove();
 
/*
var text = dataTable.cell($(this)).data();
      
      var select = document.createElement('select');

// create option using DOM
const newOption = document.createElement('option');
const optionText = document.createTextNode('Option Text');
// set option text
newOption.appendChild(optionText);
// and option value
newOption.setAttribute('value','Option Value');


select.appendChild(newOption);

select.className = "editable";
      
     // this.innerHTML = '';
      
      this.appendChild(select);
      
      $(select).focus();*/

      /*
      inputElement.type = "text";
      
      inputElement.value = text;
      
      inputElement.className = "editable";
      
      this.innerHTML = '';
      
      this.appendChild(inputElement);
      
      $(inputElement).focus();*/
}
else{

  var text = dataTable.cell($(this)).data();
      
      var inputElement = document.createElement('input');
      
      inputElement.type = "text";
      
      inputElement.value = text;
      
      inputElement.className = "editable";
      
      this.innerHTML = '';
      
      this.appendChild(inputElement);
      
      $(inputElement).focus();
}
      
  
  });
  
  $('#datatable').on('change', '.editable', function() {
      
      var inputVal = this.value;
      
      var cell = dataTable.cell($(this).parent('td'));
      
      var row = dataTable.row($(this).parents('tr'));
      
      var oldData = cell.data();
      
      cell.data(inputVal);
      
      console.log(JSON.stringify(row.data()));
      
      // Make an ajax call to update table.
      
      // If the ajax call fails, put the old data back
      // and show a warning.
              
      dataTable.draw();
      
  });
  
  $('#datatable').on('blur', '.editable', function() {
      
      $(this).parent('td').html(this.value);
      
      dataTable.draw();
      
  });
  
});




 function myFunction(x){
  $this = $(this);
  var table = $('#datatable').DataTable();
 // table.closest('tr').remove().draw(false);
 

  
  if(confirm("Are you sure to delete this row?")){
 
    
    table.row('.selected').remove().draw(false);

    
  }
  //$this.css("border","2px solid red");
			var dtRow = $this.parents('tr');
      //dtRow.css("border","2px solid red");
		
    //tablename.row( this ).delete();

 }

 function myFunctionadd(x){
  var table = $('#datatable').DataTable();


  $('.clone').each(function () {
    
    $(this).on('click', function(evt){
      alert("hh");
    $(this).parent().parent().addClass("hel");
    var row_data = ["q","d","g","g","t"];
    table.row.add(row_data).draw(false);
  })
    
		
	});
  //var $newRow = $('#datatable tbody tr').clone();
  //table.row.add($newRow).draw();

  alert('Row ' + $(this).parent().closest("tr").index());
  var table = $('#datatable').DataTable();
  var row_data = ["q","d","g","g","t"];

  $(this).parent().parent().find('td').each(function() {
 
   // row_data.push($(this).text());
  });
  alert(JSON.stringify(row_data));
  // you'll need a reference to your DataTable here
  table.row.add(row_data).draw(false);
 }


 $( document ).ready(function() {


 
  
 // var tablename = $(this).closest('dataTable').DataTable();  
///$('#datatable').on("click", ".dleteRow", function(){
   /// console.log($(this).parent());
   // tablename.row($(this).parent().parents('tr')).remove().draw(false);
//});
   	//Delete buttons
	$('.dleteRowt').each(function () {
    
		$(this).on('click', function(evt){
      alert("hi");
			$this = $(this);
			var dtRow = $this.parents('tr');
			if(confirm("Are you sure to delete this row?")){
				var table = $('#datatable').DataTable();
				table.row(dtRow[0].rowIndex-1).remove().draw( false );
			}
		});
	});
});
























