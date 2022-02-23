$("#placeOrderButton").click(function (){
    loadItemId();
    loadCustomerId();
});

function  loadItemId(){
    $("orderFormItemId").clear();
    itemDB.forEach(function (e){
        $("#orderFormItemId").append($("<option></option>").attr("value",e).text(e.getItemId()));
    });
}

function loadCustomerId(){
    /*clearComboBox($("#orderFormCstId"));*/
    customerDB.forEach(function (e){
        $("#orderFormCstId").append($("<option></option>").attr("value",e).text(e.getCustomerId()));
    });
}

/*function clearComboBox(selectElement) {
    var i, L = selectElement.options.length - 1;
    for (i = L; i >= 0; i--) {
        selectElement.remove(i);
    }
}*/

$("#orderFormCstId").selected(function (){
    console.log("+++++++++++++++++++++++++++")
});