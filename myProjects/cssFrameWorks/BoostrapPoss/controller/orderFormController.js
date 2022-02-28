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
});

function saveOrder() {
   /* var orderID=$("#orderId").val();
    var date=$("#date").val();
    var customerId=$("#orderFormCstId option:selected").text();
    var itemId=$("#orderFormItemId option:selected").text();
    var itemName=$("#orderFormItemName").val();
    var itemPrice=$("#orderFormPrice").val();
    var qty=$("#orderQty").val();
    var total=$("#total").val();
    var subTotal=$("#subTotal").val();*/


}


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

