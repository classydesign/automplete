$(document).ready(function () {



    
   var table = $('#example').DataTable({
     
        
        ajax:{url:"data.json",dataSrc:""},
        //"deferRender":true,
        //"Sort":true,
       // bSort: true,
       
        "aoColumns": [{
            "mDataProp": "albumId"
        }, {
            "mDataProp": "id"
        }, {
            "mDataProp": "title",className:"position"
        }, {
            "mDataProp": "url"
        },{
            "mDataProp": "thumbnailUrl",className:"location"
        },
    ],
    //"scrollY":        "200px",
    //"scrollCollapse": true,
    "info":           true,
    "paging":         true
    });




  var Positions = [
    "System Architect",
    "Accountant",
    "Junior Technical Author",
    "Senior Javascript Developer",
    "Integration Specialist",
    "Sales Assistant",
    "Javascript Developer",
    "Software Engineer",
    "Office Manager",
    "Support Lead",
    "Regional Director",
    "Senior Marketing Designer",
    "Marketing Designer",
    "Chief Financial Officer (CFO)",
    "Systems Administrator",
    "Personnel Lead",
    "Development Lead",
    "Chief Marketing Officer (CMO)",
    "Pre-Sales Support",
    "Chief Executive Officer (CEO)",
    "Developer",
    "Chief Operating Officer (COO)",
    "Regional Marketing",
    "Technical Author",
    "Team Leader",
    "Post-Sales support",
    "Secretary",
    "Financial Controller",
    "Director",
    "Support Engineer",
    "Data Coordinator",
    "Junior Javascript Developer",
    "Customer Support"
  ];
  var Locations = [
    "Edinburgh",
    "Tokyo",
    "San Francisco",
    "New York",
    "London",
    "Sidney",
    "Singapore"
  ];


  $('#example tbody').on('click', '.position', function() {

  
    var row = this.parentElement;
    if (!$('#example').hasClass("editing")) {
      $('#example').addClass("editing");
      var data = table.row(row).data();
      var $row = $(row);
      var thisPosition = $row.find("td:nth-child(3)");
      var thisPositionText = thisPosition.text();
      thisPosition.empty().append($("<select></select>", {
        "id": "Position_" + data[0],
        "class": "changePosition"
      }).append(function() {
        var options = [];
        $.each(Positions, function(k, v) {
          options.push($("<option></option>", {
            "text": v,
            "value": v
          }))
        })
        return options;
      }));
      $("#Position_" + data[0]).val(thisPositionText)
    }
  });
  $('#example tbody').on('click', '.location', function() {
    var row = this.parentElement;
    if (!$('#example').hasClass("editing")) {
      $('#example').addClass("editing");
      var data = table.row(row).data();
      var $row = $(row);
      var thisLocation = $row.find("td:nth-child(5)");
      var thisLocationText = thisLocation.text();
      thisLocation.empty().append($("<select></select>", {
        "id": "Location_" + data[0],
        "class": "changeLocation"
      }).append(function() {
        var options = [];
        $.each(Locations, function(k, v) {
          options.push($("<option></option>", {
            "text": v,
            "value": v
          }))
        })
        return options;
      }));
      $("#Location_" + data[0]).val(thisLocationText)
    }
  });
  $('#example tbody').on("change", ".changePosition", function() {
    var $this = $(this);
    //alert(JSON.stringify($this));
    var $thisCell = table.cell($this.parents('td'));

alert(JSON.stringify($thisCell));

    //alert((table.row($this.closest("tr")).data()));//{"albumId":1,"id":1,"title":"accusamus beatae ad facilis cum similique qui sunt","url":"https://via.placeholder.com/600/92c952","thumbnailUrl":"https://via.placeholder.com/150/92c952"}
    var tempData1 = (table.row($this.closest("tr")).data());
    var tempData = (Object.values(tempData1)).slice();
   alert(tempData);
    tempData[2] = $this.val();

   // alert($this.val())//accountant
   // alert(data(tempData));
   
    
    /**
    * insted of updateing dom via jQuery use DataTable's Method to update dom object and 
    * also not forget to draw() your changes.
    *
    * $this.parent("td").empty().text($this.val());
    *
    **/
    //alert($this.val());
    //$this.parent("td").empty().text($this.val());
   
    table.row($this.closest("tr")).data(tempData);
    $thisCell.data($this.val()).draw();
    $('#example').removeClass("editing");
   
  });
  $('#example tbody').on("change", ".changeLocation", function() {
    var $this = $(this);
    var tempData = table.row($this.closest("tr")).data().toString().slice();
    var $thisCell = table.cell($this.parents('td'));
    tempData[5] = $this.val();
    table.row($this.closest("tr")).data(tempData);
    /**
    * insted of updateing dom via jQuery use DataTable's Method to update dom object and 
    * also not forget to draw() your changes.
    *
    * $this.parent("td").empty().text($this.val());
    *
    **/

    //$("#example").DataTable().destroy();
    $('#example').DataTable().clear().destroy();
    $this.parent("td").DataTable().destroy();
    $this.parent("td").empty().text($this.val());
    
     $thisCell.data($this.val()).draw();
    $('#example').removeClass("editing");
  });
  

/*

// when the mouse enters a cell, create an editor. 
$('#example').on('mouseenter', 'td.editable', function (e) {
   // e.preventDefault() // I'm a noob, don't know what this means
    // I think there is some delay on when the events trigger 
    // so sometimes the cell still contains the input element and this check
    // prevents accidently creating another input element
    if (e.target.localName != 'input') {
      let row = e.target._DT_CellIndex.row
      let col = e.target._DT_CellIndex.column
      if (!e.target.children.length) {
          e.target.innerHTML = `<input id="${row}-${col}" type="text" class="editor" value="${e.target.innerHTML}">`
      }
    }
  })
  
  // when the mouse exits the editor, write the data into the table and redraw
  $('#example').on('mouseleave', 'td.editable', function (e) {
    e.preventDefault()
    if (e.target.localName != 'input') {
      let row = e.target._DT_CellIndex.row
      let col = e.target._DT_CellIndex.column
      data_table.cell(row, col).data(e.target.firstElementChild.value)
      data_table.draw() // up to you
    }
    else { // forces write when there is an event delay
      let [row, col] = e.target.id.split('-')
      data_table.cell(Number(row), Number(col)).data(e.target.value)
    }
    data_table.draw()
  })          */




});