$(document).ready(function () {
    // event handlers always go here
    $("#tabs a").on("click", showTab);
    $("#tabs").on("click", makeReceipt)
});

// This function is required by Bootstrap to show/hide the selected tab
function showTab(event) {
    event.preventDefault();
    $(this).tab("show");
}

function makeReceipt() {

    //initialize total and subtotal variables
    let subtotal = 0;
    let total;

    //get the selected size and its price
    let size = $("input[name=size]:checked").data("size");
    let sizePrice = $("input[name=size]:checked").data("price");
    //set the size output
    $("p#size-output").text('Size: ' + size + ' $' + sizePrice);
    //add the size price to the subtotal
    subtotal += sizePrice;

    //get the selected crust type
    let crust = $("input[name=crust]:checked").data("crust");
    //change the output for the crust type
    $("p#crust-output").text('Crust: ' + crust);

    //get all of the meat types that were checked
    let checkedMeats = $("input[name=meat]:checked");
    //change the output to show all selected meats and then add $1.50 to the subtotal
    //for each meat selected
    $("p#meat-output").text('Meats(+$1.50 each): ')
    checkedMeats.each(function () {
        subtotal += 1.50;
        $("p#meat-output").append($(this).data("meat") + " ");
    });

    //get all of the vegetable types that were checked
    let checkedVeggies = $("input[name=veggie]:checked");
    //change the output to show all selected veggies and then add $1.00 to the subtotal
    //for each veggie selected
    $("p#veggie-output").text('Veggies(+$1.00 each): ')
    checkedVeggies.each(function () {
        subtotal += 1;
        $("p#veggie-output").append($(this).data("veggie") + " ");
    });

    //calculate the tax amount
    let tax = (subtotal * .051).toFixed(2);
    //calculate the total amount
    total = (subtotal + parseFloat(tax) + 2).toFixed(2);

    //change the output for the tax and totals
    $("p#subtotal").text('Subtotal: $' + subtotal);
    $("p#tax").text('Tax: $' + tax);
    $("p#total").text('Total: $' + total);

    //change the output for the delivery info
    $("p#name-output").text('Name: ' + $("#name").val());
    $("p#address-output").text('Address: ' + $("#address").val());
    $("p#phone-output").text('Phone: ' + $("#phone").val());
}

