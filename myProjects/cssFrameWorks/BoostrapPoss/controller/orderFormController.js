{
    loadOrderId();

}

$("#placeOrderButton").click(function () {
    loadItemId();
    loadCustomerId();
});


function loadOrderId() {
    if ($("#orderId").val() == "") {
        $("#orderId").val("001");
    } else {
        var value = parseInt($("#orderId").val());
        value++;
        $("#orderId").val(value);
    }
}

$("#btnPurchase").click(function () {
    loadOrderId();
});

function loadItemId() {
    $("#orderFormItemId").empty();
    itemDB.forEach(function (e) {
        $("#orderFormItemId").append($("<option></option>").attr("value", e).text(e.getItemId()));
    });
}

function loadCustomerId() {

    $("#orderFormCstId").empty();
    /*$("#orderFormCstId").append($("<option></option>").attr("value",e).text(--select Id--));*/
    customerDB.forEach(function (e) {
        $("#orderFormCstId").append($("<option></option>").attr("value", e).text(e.getCustomerId()));
    });

}

$("#orderFormCstId").change(function () {
    var selectedId = $("#orderFormCstId option:selected").text();
    setCustomerData(selectedId);
});

function setCustomerData(id) {
    for (var i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getCustomerId() == id) {
            $("#orderFormCustomerName").val(customerDB[i].getCustomerName());
            $("#orderFormCustomerAddress").val(customerDB[i].getCustomerAddress());
            $("#orderFormCustomerTp").val(customerDB[i].getCustomerTp());
        }
    }
}

$("#orderFormItemId").change(function () {
    var selectedId = $("#orderFormItemId option:selected").text();
    setItemData(selectedId);
});

function setItemData(id) {
    for (var j = 0; j < itemDB.length; j++) {
        if (itemDB[j].getItemId() == id) {
            $("#orderFormItemName").val(itemDB[j].getItemName());
            $("#orderFormQty").val(itemDB[j].getItemQty());
            $("#orderFormPrice").val(itemDB[j].getItemPrice());
        }
    }
}


$("#btnAddItem").click(function () {
    countTotal();
    saveOrder();
    loadTable();
});

function countTotal() {
    var total;
    var displayTotal=parseInt($("#total").text());
    if ( displayTotal == 0) {
        total = (parseInt($("#orderQty").val())) * (parseInt($("#orderFormPrice").val()));

        $("#total").text(total + ".00 /=");
    } else {
        var sum = displayTotal + (parseInt($("#orderQty").val())) * (parseInt($("#orderFormPrice").val()));
        $("#total").text(sum + ".00 /=");
    }

    displayTotal=parseInt($("#total").text());

    if (displayTotal > 100 || displayTotal < 1000){
        $("#txtDiscount").val("5%");
        var subTotal= displayTotal-((displayTotal * 5)/100);
        $("#subTotal").text(subTotal);
    }else if (displayTotal > 1000 ){
        $("#txtDiscount").val("10%");
        var subTotal= displayTotal-((displayTotal * 10)/100);
        $("#subTotal").text(subTotal);
    }

}

function saveOrder() {
    var orderID=$("#orderId").val();
    var date=$("#date").val();
    var customerId=$("#orderFormCstId option:selected").text();
    var itemId=$("#orderFormItemId option:selected").text();
    var itemName=$("#orderFormItemName").val();
    var itemPrice=parseInt($("#orderFormPrice").val());
    var qty=parseInt($("#orderQty").val());
    var total= itemPrice * qty;

    var orderDetails=new orderDTO();
    orderDetails.setOrderId(orderID);
    orderDetails.setOrderDate(date);
    orderDetails.setOrderCustomerId(customerId);
    orderDetails.setOrderItemId(itemId);
    orderDetails.setOrderItemName(itemName);
    orderDetails.setOrderItemPrice(itemPrice);
    orderDetails.setOrderQty(qty);
    orderDetails.setTotal(total);

    var checked=false;

    function idExits() {
      L1:  for (var i=0;i<orderDB.length;i++){
            if (itemId==orderDB[i].getOrderItemId()){
                orderDB[i].setOrderQty(orderDB[i].getOrderQty()+qty);
                orderDB[i].setTotal(orderDB[i].getTotal()+total);
                return false;
            }else {
                continue L1;
            }
        }
        return true;
    }

    if (orderDB.length==0){
        checked=true;
    }else{
        checked=idExits();
    }

    if (checked){
        orderDB.push(orderDetails);
    }
}

function loadTable() {
    $("#orderFormTableBody").empty();
    orderDB.forEach(function (a){
        let orderRow= `<tr><td>${a.getOrderItemId()}</td><td>${a.getOrderItemName()}</td><td>${a.getOrderItemPrice()}</td><td>${a.getOrderQty()}</td><td>${a.getTotal()}</td></tr>`;
        $("#orderFormTableBody").append(orderRow);
    });

}

/*========================= validation =====================================*/

let regxQty = /^[0-9]{1,3}$/;
let regxCash = /^[0-9](.){1,6}$/;

$("#btnAddItem").attr("disabled",true);
$("#btnPurchase").attr("disabled",true);

function validateOrderForm() {
    var qty=$("#orderQty").val();
    if (regxQty.test(qty)){
        var cash=$("#txtCash").val();
        $("#orderQty").css('border', '2px solid green');
        if (regxCash.test(cash)){
            $("#txtCash").css('border', '2px solid green');
        }else {
            $("#txtCash").css('border', '2px solid red');
            $("#btnAddItem").attr("disabled",true);
        }
    }else {
        $("#orderQty").css('border', '2px solid red');
        $("#btnAddItem").attr("disabled",true);
    }
}

$("#orderQty,#txtCash").on('keyup',function (){
    validateOrderForm();
});



$("#orderQty").on('keyup',function (e){
    if (e.key == "Enter"){
        checkValidation();
    }
});

$("#txtCash").on('keyup',function (e){
    if (e.key == "Enter"){
        checkValidation();
    }
});

function checkValidation() {
    var qty=$("#orderQty").val();
    if (regxQty.test(qty)){
        $("#txtCash").focus();
        $("#btnAddItem").attr("disabled",false);
        var cash=$("#txtCash").val();
        if (regxCash.test(cash)){
            $("#btnPurchase").attr("disabled",false);
        }else {
            $("#txtCash").focus();
        }
    }else {
        $("#orderQty").focus();
    }
}