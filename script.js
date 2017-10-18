
// bad input alert
$(document).ready (function(){
            $("#success-alert").hide();
            $("#myWish").click(function showAlert() {
                $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
               $("#success-alert").slideUp(500);
                });   
            });
 });

// $(document).ready (function(){
//             $("#badSticksInput").hide();
//             $("#moveButton").click(function showAlert() {
//                 $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
//                $("#success-alert").slideUp(500);
//                 });   
//             });
//  });

// take turn button
function take_turn() {
    $(".alert").alert()

    player_input = document.getElementById("playerInput")
        // validate that option in turn is good, else print error message
    
    // subtract the user input from number of sticks
    total_sticks -= player_input.value
    console.log("You removed " + player_input.value + " sticks, current total = " + total_sticks)

    // update table
    // check for win condition
    // calculate optimal move
    // check for win condition
}

player_input_form = document.getElementById("playerInputForm")
player_input_form
var total_sticks = 21;



// function