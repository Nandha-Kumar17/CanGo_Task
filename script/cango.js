$("#form").submit(submitForm);

function openForm(e) {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

let employees = [];

function submitForm(e) {
  e.preventDefault();
  var form = $("#form");
  var arr = $.map(form.serializeArray(), function (v, k) {
    return [v.value]
  });

  let employeeObj = {
    email: arr[0],
    empname: arr[1],
    empid: arr[2],
    desgn: arr[3]
  };
  employees.push(employeeObj);
  renderEmployee(employeeObj);
  $("#form")[0].reset();
  return false; // Prevent page refresh
}

function renderEmployees() {
  employees.forEach(employee => {
   renderEmployee(employee)
  });

}

function renderEmployee(employee) {
  let table = $("#employees-table");
  table.append("<tr data-empname='" + employee.empname + "'data-desgn='" + employee.desgn + "'> <td>"+employee.empname+"</td> <td>"+employee.desgn+"</td><td> <button value='Edit' class='btn-edit'> Edit </button> </td></tr>");
//  table.append("<tr data-email='"+employee.email+"' data-name='"+employee.name+"' data-employeeId='"+employee.employeeId+"' data-designation='"+employee.desgination+"' ><td>"+employee.email+"</td><td>"+employee.name+"</td> <td>"+employee.employeeId+"</td> <td>"+employee.desgination+"</td> <td><button class='btn btn-info btn-xs btn-edit'>Edit</button> &nbsp; <button class='btn btn-danger btn-xs btn-delete'>Delete</button> &nbsp;</td></tr>");

}

$("body").on("click", ".btn-edit", function(){
  var empname = $(this).parents("tr").attr('data-empname');
  var desgn = $(this).parents("tr").attr('data-desgn');

  $(this).parents("tr").find("td:eq(0)").html('<input name="edit_empname"  value="'+empname+'">');
  $(this).parents("tr").find("td:eq(1)").html('<input name="edit_desgn" value="'+desgn+'">');

  $(this).parents("tr").find("td:eq(2)").prepend("<button class='btn-save'>Update</button> &nbsp;<button class='btn-cancel'>Cancel</button>")
  $(this).hide();
});

$("body").on("click", ".btn-cancel", function(){
  var empname = $(this).parents("tr").attr('data-empname');
  var desgn = $(this).parents("tr").attr('data-desgn');

  $(this).parents("tr").find("td:eq(0)").text(empname);
  $(this).parents("tr").find("td:eq(1)").text(desgn);

  $(this).parents("tr").find(".btn-edit").show();
  $(this).parents("tr").find(".btn-save").remove();
  $(this).parents("tr").find(".btn-cancel").remove();
});

$("body").on("click", ".btn-save", function(){
  var empname = $(this).parents("tr").find("input[name='edit_empname']").val();
  var desgn = $(this).parents("tr").find("input[name='edit_desgn']").val();

  $(this).parents("tr").find("td:eq(0)").text(empname);
  $(this).parents("tr").find("td:eq(1)").text(desgn);

  $(this).parents("tr").attr('data-name', empname);
  $(this).parents("tr").attr('data-desgn', desgn);

  $(this).parents("tr").find(".btn-edit").show();
  $(this).parents("tr").find(".btn-cancel").remove();
  $(this).parents("tr").find(".btn-save").remove();
});
