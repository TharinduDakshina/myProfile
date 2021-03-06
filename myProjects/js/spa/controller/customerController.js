$("#saveCustomer").prop("disabled", true);

$("#saveCustomer").click(function () {
    saveCustomer();
    clearAll();
    loadAllCustomers();
});

function saveCustomer() {
    //gather customer information
    let customerID = $("#cstId").val();
    let customerName = $("#cstName").val();
    let customerAddress = $("#cstAddress").val();
    let customerTp = $("#cstTp").val();

    //create Object

    var customer = new customerDTO();
    customer.setCustomerID(customerID);
    customer.setCustomerName(customerName);
    customer.setCustomerAddress(customerAddress);
    customer.setCustomerTp(customerTp);

    customerDB.push(customer);

}

function checkAlreadyExits() {
    for (let i = 0; i < customerDB.length; i++) {
        if ($("#cstId").val() == customerDB[i].getCustomerId()) {
            return -1;
        }
    }
    return 0;
}

function loadAllCustomers() {
    $("#customerTableBody").empty();
    for (var i of customerDB) {
        /*create a html row*/
        let row = `<tr><td>${i.getCustomerId()}</td><td>${i.getCustomerName()}</td><td>${i.getCustomerAddress()}</td><td>${i.getCustomerTp()}</td></tr>`;
        /*select the table body and append the row */
        $("#customerTableBody").append(row);
    }
    $("#customerTableBody>tr").click(function () {
        let cstId = $(this).children(":eq(0)").text();
        let cstName = $(this).children(":eq(1)").text();
        let cstAddress = $(this).children(":eq(2)").text();
        let cstTp = $(this).children(":eq(3)").text();


        $("#cstId").val(cstId);
        $("#cstName").val(cstName);
        $("#cstAddress").val(cstAddress);
        $("#cstTp").val(cstTp);
    });
}

function clearAll() {
    $('#cstId,#cstName,#cstAddress,#cstTp').val("");
    $('#cstId,#cstName,#cstAddress,#cstTp').css('border', '2px solid #ced4da');
    $('#cstId').focus();
    $("#saveCustomer").attr('disabled', true);
    loadAllCustomers();
    $("#errorId,#errorName,#errorAddress,#errorTp").text("");
}


$("#btnSearch").click(function () {
    var searchID = $("#txtCustomerSearch").val();

    var response = searchCustomer(searchID);
    if (response) {
        $("#cstId").val(response.getCustomerId());
        $("#cstName").val(response.getCustomerName());
        $("#cstAddress").val(response.getCustomerAddress());
        $("#cstTp").val(response.getCustomerTp());
    } else {
        clearAll();
        alert("No Such a Customer");
    }

});

function searchCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getCustomerId() == id) {
            return customerDB[i];
        }
    }
}

$("#deleteCustomer").click(function () {
    var deleteId = $("#cstId").val();
    deleteCustomer(deleteId);
    clearAll();
});

function deleteCustomer(id) {
    var index = -1;
    for (var i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getCustomerId() == id) {
            index = i;
            alert(customerDB[i].getCustomerId() + " Deleted");
        }
    }

    customerDB.splice(index, 1);
}

$("#btnUpdateCustomer").click(function () {
    var updateId = $("#cstId").val();
    var updateName = $("#cstName").val();
    var updateAddress = $("#cstAddress").val();
    var updateTp = $("#cstTp").val();
    updateCustomer(updateId, updateName, updateAddress, updateTp);
    clearAll();
});

function updateCustomer(id, name, address, tp) {
    for (let i = 0; i < customerDB.length; i++) {
        if (id == customerDB[i].getCustomerId()) {
            customerDB[i].setCustomerName(name);
            customerDB[i].setCustomerAddress(address);
            customerDB[i].setCustomerTp(tp);

            alert("Successfully Update ");
        }
    }
}


/*---------------------Validation--------------------------*/

let regxCstId = /^(C00-)[0-9]{3,4}$/;
let regxCstName = /^[A-z ]{3,20}$/;
let regxCstAddress = /^[A-z 0-9/,]{3,50}$/;
let regxTp = /^[0-9]{10}$/;

$('#cstId,#cstName,#cstAddress,#cstTp').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault();
    }
});

$('#cstId,#cstName,#cstAddress,#cstTp').on('blur', function () {
    formValid();
});

function formValid() {
    var cusID = $("#cstId").val();
    let result = checkAlreadyExits();
    if (result == -1) {
        console.log(result)
        $("#cstId").css('border', '2px solid red');
        $("#errorId").text("This id was already exits.");
        return false;
    }
    $("#cstId").css('border', '2px solid green');
    $("#errorId").text("");
    if (regxCstId.test(cusID)) {
        var cusName = $("#cstName").val();
        if (regxCstName.test(cusName)) {
            $("#cstName").css('border', '2px solid green');
            $("#errorName").text("");
            var cusAddress = $("#cstAddress").val();
            if (regxCstAddress.test(cusAddress)) {
                var cusTp = $("#cstTp").val();
                var resp = regxTp.test(cusTp);
                $("#cstAddress").css('border', '2px solid green');
                $("#errorAddress").text("");
                if (resp) {
                    $("#cstTp").css('border', '2px solid green');
                    $("#errorTp").text("");
                    return true;
                } else {
                    $("#cstTp").css('border', '2px solid red');
                    $("#errorTp").text("Cus Salary is a required field : Pattern 100.00 or 100");
                    return false;
                }
            } else {
                $("#cstAddress").css('border', '2px solid red');
                $("#errorAddress").text("Cus Address is a required field : Mimum 7");
                return false;
            }
        } else {
            $("#cstName").css('border', '2px solid red');
            $("#errorName").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#cstId").css('border', '2px solid red');
        $("#errorId").text("Cus ID is a required field : Pattern C00-000");
        return false;
    }
}

$("#cstId").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#cstName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#cstAddress").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#cstTp").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

function checkIfValid() {
    var cusID = $("#cstId").val();
    if (regxCstId.test(cusID)) {
        $("#cstName").focus();
        var cusName = $("#cstName").val();
        if (regxCstName.test(cusName)) {
            $("#cstAddress").focus();
            var cusAddress = $("#cstAddress").val();
            if (regxCstAddress.test(cusAddress)) {
                $("#cstTp").focus();
                var cstTp = $("#cstTp").val();
                var resp = regxTp.test(cstTp);
                if (resp) {
                    let res = confirm("Do you really need to add this Customer..?");
                    if (res) {
                        saveCustomer();
                        clearAll();
                    }
                } else {
                    $("#cstTp").focus();
                }
            } else {
                $("#cstAddress").focus();
            }
        } else {
            $("#cstName").focus();
        }
    } else {
        $("#cstId").focus();
    }
}

function setButton() {
    let b = formValid();
    if (b) {
        $("#saveCustomer").attr('disabled', false);
    } else {
        $("#saveCustomer").attr('disabled', true);
    }
}

$('#saveCustomer').click(function () {
    checkIfValid();
});