function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function start_game(){
    max_move_size = parseInt(document.getElementById("moveInput").value)
    total_sticks = parseInt(document.getElementById("sticksInput").value)
    if(max_move_size < 1 || total_sticks < 1){
        return
    }
    $('#moveInput')[0].disabled = true
    $('#sticksInput')[0].disabled = true
    $('#startGameButton')[0].style.visibility = "hidden"
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
    human_color = "LightGray"
    computer_color = "WhiteSmoke"

    var newRow = $("<tr>");
    var cols = "";
    cols += '<th scope="row">' + move_counter + '</th>';
    cols += '<td>' + player + '</td>'
    cols += '<td>' + total_sticks + '</td>'
    cols += '<td>' + move + '</td>'
    newRow.append(cols);
    $("#moveTable").prepend(newRow)
    row_human = true
    if(player == "Computer"){
        row_human = false
    }

    table_rows = $("#moveTable")[0].rows
    for (i = 1; i < table_rows.length; i++){
        if(row_human){
            table_rows[i].style.backgroundColor = human_color
        }
        else{
            table_rows[i].style.backgroundColor = computer_color
        }
        row_human = !row_human
    }
}

function calculate_optimal_move(){
    ideal_step = (total_sticks-1)%(max_move_size+1)
    if(ideal_step == 0){
        ideal_step = Math.floor(Math.random()*max_move_size + 1)
    }
    return Math.min(ideal_step, total_sticks)
}

function check_for_win(){
    if(total_sticks <= 0){
        game_over = true
        if(player_turn){
            message = "You lost, better luck next time"
            $('#alert_placeholder').html('<div class="alert alert-danger"><span>'+message+'</span></div>')
        }
        else{
            message = "Well done, you won!"
            $('#alert_placeholder').html('<div class="alert alert-success"><span>'+message+'</span></div>')
        }
    }
}

// take turn button
function take_human_turn() {
    if(!game_over){
        player_move = parseInt(document.getElementById("playerInput").value)
            // validate that option in turn is good, else print error message
        if(player_move > max_move_size || player_move < 1 || player_move > total_sticks){
            return
        }
        $('#moveButton')[0].disabled = true
        // subtract the user input from number of sticks
        total_sticks -= player_move
        $("#moveTable")[0].rows[1].cells[3].innerHTML = player_move

        console.log("You removed " + player_move + " sticks, current total = " + total_sticks)
        move_counter += 1
    }
    check_for_win()
    if (!game_over) {
        player_turn = false;
        setTimeout(take_computer_turn, 500)
    }
}

function take_computer_turn(){
    if(!game_over){

        computer_move = calculate_optimal_move()
        add_row("Computer", computer_move)
        total_sticks -= computer_move
        console.log("I removed " + computer_move + " sticks, current total = " + total_sticks)
        move_counter += 1

    }
    check_for_win()
    player_turn=true;
    if(!game_over){
        setTimeout(add_human_prompt, 500)
    }
}

function add_human_prompt(){
    if(!game_over){
        add_row("Human", "?")
        $('#moveButton')[0].disabled = false
    }
}

var player_turn = true;
var max_move_size = -1;
var total_sticks = -1;
var move_counter = 1;
var game_over = false
hide_game()
