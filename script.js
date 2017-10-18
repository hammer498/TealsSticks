function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function start_game(){
    $('#moveInput')[0].disabled = true
    $('#sticksInput')[0].disabled = true
    $('#startGameButton')[0].style.visibility = "hidden"
    max_move_size = parseInt(document.getElementById("moveInput").value)
    total_sticks = parseInt(document.getElementById("sticksInput").value)
    show_game()
    add_row("Human", "?")
}
function hide_game(){
    $('#moveTable')[0].style.visibility = "hidden"
    $('#moveButton')[0].style.visibility = "hidden"
    $('#playerInput')[0].style.visibility = "hidden"
    $('#inputLabel3')[0].style.visibility = "hidden"

}

function show_game(){
    $('#moveTable')[0].style.visibility = "visible"
    $('#moveButton')[0].style.visibility = "visible"
    $('#playerInput')[0].style.visibility = "visible"
    $('#inputLabel3')[0].style.visibility = "visible"
}

function add_row(player, move){
    var newRow = $("<tr>");
    var cols = "";
    cols += '<th scope="row">' + move_counter + '</th>';
    cols += '<td>' + player + '</td>'
    cols += '<td>' + total_sticks + '</td>'
    cols += '<td>' + move + '</td>'
    newRow.append(cols);
    $("#moveTable").prepend(newRow)
}

function calculate_optimal_move(){
    ideal_step = (total_sticks-1)%(max_move_size+1)
    console.log(ideal_step)
    if(ideal_step == 0){
        ideal_step = Math.floor(Math.random()*max_move_size + 1)
        console.log(ideal_step)
    }
    return Math.max(ideal_step, 0)
}

function check_for_win(){
    if(total_sticks <= 0){
        game_over = true 
    }
}

// take turn button
function take_turn() {
    if(!game_over){
        player_input = document.getElementById("playerInput")
            // validate that option in turn is good, else print error message
        
        // subtract the user input from number of sticks
        player_move = parseInt(player_input.value)
        total_sticks -= player_move
        $("#moveTable")[0].rows[1].cells[3].innerHTML = player_move 

        console.log("You removed " + player_input.value + " sticks, current total = " + total_sticks)
        move_counter += 1
    }
    check_for_win()
    if(!game_over){    
        
        computer_move = calculate_optimal_move()
        add_row("Computer", computer_move)    
        total_sticks -= computer_move
        console.log("I removed " + computer_move + " sticks, current total = " + total_sticks)
        move_counter += 1
        check_for_win()

        add_row("Human", "?")



        // update table
        // check for win condition
        // calculate optimal move
        // check for win condition
    }
}

player_input_form = document.getElementById("playerInputForm")
player_input_form
var max_move_size = 4;
var total_sticks = 21;
var move_counter = 1;
var game_over = false
hide_game()
