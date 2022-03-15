$("#homePageRow").css("display", "block");
$("#customer").css("display", "none");
$("#item").css("display", "none");
$("#placeOrder").css("display", "none");

$("#homeButton").click(function () {
    $("#homePageRow").css("display", "block");
    $("#customer").css("display", "none");
    $("#item").css("display", "none");
    $("#placeOrder").css("display", "none");

    $("#homePageCustomers").text(customerDB.length);
    $("#homePageAmount").text(itemDB.length);
});

$("#customerButton").click(function () {
    $("#homePageRow").css("display", "none");
    $("#customer").css("display", "block");
    $("#item").css("display", "none");
    $("#placeOrder").css("display", "none");
});

$("#itemButton").click(function () {
    $("#homePageRow").css("display", "none");
    $("#customer").css("display", "none");
    $("#item").css("display", "block");
    $("#placeOrder").css("display", "none");
});

$("#placeOrderButton").click(function () {
    $("#homePageRow").css("display", "none");
    $("#customer").css("display", "none");
    $("#item").css("display", "none");
    $("#placeOrder").css("display", "block");
    loadItemId();
    loadCustomerId();
});

$("#homePageCustomers").text(customerDB.length);
$("#homePageAmount").text(itemDB.length);
$("#homePageOrderAmount").text(orderDB.length);