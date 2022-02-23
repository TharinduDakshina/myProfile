$("#placeOrderButton").click(function (){
    loadItemId();
});

function  loadItemId(){
    itemDB.forEach(function (e){
        $("#orderFormItemId").append($("<option></option>").attr("value",e).text(e.getItemId()));
    });
}