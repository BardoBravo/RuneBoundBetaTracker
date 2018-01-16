
// Userlist data array for filling in info box
var userListData = [];
var charData;

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load    
    populateTable(); 

    //populate lists
    populateScenarioList();
    populatePlayerList();
    populateGameList();
    populateCharList();
    populateEquipList();
    populateSkillList();

    // Username link click
    //$('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
    $('#userList table tbody').on('click', 'td a.linkPlayerPerGame', populatePlayerPerGameTable);

    //$('#btnAddUser').on('click', addUser);
    $('#btnAddGame').on('click', addGame);
    $('#btnAddPlayerInGame').on('click', addPlayerInGame);
    $('#btnAdminMode').on('click', show_hide_admin);

    // Delete User link click
    $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);

    

});

// Functions =============================================================

// Fill table with data
// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';  

    // jQuery AJAX call for JSON
    $.getJSON( '/users/userlist', function( data ) {

        // Stick our user data array into a userlist variable in the global object        
        userListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><button><a href="#" class="linkPlayerPerGame" rel="' + this._id + '" title="Detalhes da Partida">' + this._id + '</a></button></td>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.player_overview[0]._id + '" title="Detalhes do Jogador">' + this.player_overview[0].name + '</a></td>';
            tableContent += '<td>' + this.scenario_overview[0].name + '</td>';
            tableContent += '<td>' + this.Date + '</td>';
            tableContent += '<td>' + this.numberOfPlayers + '</td>';
            tableContent += '<td>' + this.losers + '</td>';
            tableContent += '<td>' + this.laters + '</td>';
            tableContent += '<td>' + this.beginTime + '</td>';
            tableContent += '<td>' + this.endTime + '</td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
    });
};

function populatePlayerPerGameTable() {

    // Empty content string
    var tableContent = '';
    var divContent = '';


    // jQuery AJAX call for JSON
    $.getJSON( '/users/playerPerGame/' + $(this).attr('rel'), function( data ) {  

        // Stick our user data array into a userlist variable in the global object
        userListData = data;
        if ( data.length == 0 ) { 
            hide_player_per_game(); }
        else {
            show_player_per_game();
        };

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){                      

            divContent += '<div class="w3-container w3-content w3-card w3-round w3-white">';
            divContent += '<div class="w3-row">';
            divContent += '<div class="w3-col m3">';
            divContent += '<div class="w3-container">';
            divContent += '<h4 class="w3-center playerPerGame_titles">Nome:</h4>';
            divContent += '<p class="w3-center"><img class="w3-circle" src="' + this.player_in_game[0].image + '"</img></p><hr>';
            divContent += '<p class="w3-center">"' + this.player_in_game[0].name + '"</>';
            divContent += '<p class="w3-left-align">Venceu:"' + this.winner + '"</>';
            divContent += '<p class="w3-left-align">Enfrentou BOSS:"' + this.foughtBoss +'"</>';
            divContent += '<p class="w3-left-align">Saúde final:"' + this.remainingHP + '"</>';
            divContent += '</div>';
            divContent += '</div>';            
            divContent += '<div class="w3-col m9">';
            divContent += '<div class="w3-container">';
            divContent += '<h4 class = "w3-center">Herói:</h4>';
            divContent += '<p class="w3-center"><img id="hero" style="height:75%;width:75%" src="' + this.char_in_game[0].image + '"</img></p>';
            divContent += '<h4 class = "w3-center">Itens:</h4>';
            divContent += '<div class="w3-container w3-content w3-card w3-round w3-white">';
            divContent += '<div id="teste">';
            divContent += '<p class="w3-center"><strong>Arma:</strong></p>';
            divContent += '<p class="w3-center"><img id="weapon" src="' + this.weapon_in_game[0].token_image + '"</img></p>';
            divContent += '<p class="w3-center"><img id="weapon" style="height:75%;width:75%" src="' + this.weapon_in_game[0].card_image + '"</img></p>';
            divContent += '</div>';
            divContent += '<div id="teste">';
            divContent += '<p class="w3-center"><strong>Vestimenta:</strong></p>';
            divContent += '<p class="w3-center"><img id="clothing" src="' + this.cloth_in_game[0].token_image + '"</img></p>';
            divContent += '<p class="w3-center"><img id="clothing" style="height:75%;width:75%" src="' + this.cloth_in_game[0].card_image + '"</img></p>';
            divContent += '</div>';
            divContent += '<div id="teste">';
            divContent += '<p class="w3-center"><strong>Equipamento:</strong></p>';
            divContent += '<p class="w3-center"><img id="equipment" src="' + this.equip_in_game[0].token_image + '"</img></p>';
            divContent += '<p class="w3-center"><img id="equipment" style="height:75%;width:75%" src="' + this.equip_in_game[0].card_image + '"</img></p>';
            divContent += '</div>';
            divContent += '<div id="teste">';
            divContent += '<p class="w3-center"><strong>Movimentação:</strong></p>';
            divContent += '<p class="w3-center"><img id="movement" src="' + this.move_in_game[0].token_image + '"</img></p>';
            divContent += '<p class="w3-center"><img id="movement" style="height:75%;width:75%" src="' + this.move_in_game[0].card_image + '"</img></p>';
            divContent += '</div>';
            divContent += '<div id="teste">';
            divContent += '<p class="w3-center"><strong>Utensílio:</strong></p>';
            divContent += '<p class="w3-center"><img id="goods" src="' + this.goods_in_game[0].token_image + '"</img></span></p>';
            divContent += '<p class="w3-center"><img id="goods" style="height:75%;width:75%" src="' + this.goods_in_game[0].card_image + '"</img></span></p>';
            divContent += '</div>';
            divContent += '</div>';
            divContent += '<h4 class = "w3-center">Skills:</h4>';
            divContent += '<div class="w3-container w3-content w3-card w3-round w3-white">';            
           
            $.each(this.skills_in_game, function(){
                divContent += '<div id="teste">';
                //divContent += '<p class="w3-center"><strong>Utensílio:"' + this.name + '"</strong></p>';
                divContent += '<p class="w3-center"><img id="skills" style="height:75%;width:75%" src="' + this.image + '"</img></span></p>';                
                divContent += '</div>';
            });

            divContent += '</div>';
            divContent += '</div>';
            divContent += '</div>';
            divContent += '</div>';
            divContent += '</div>';
            divContent += '<br><br>';
            //divContent += '<strong>Skills:</strong><span id="skills"><img id="goods" src="' + this.goods_in_game[0].image + '"</img></span><br>';

            $('#playerPerGame2 p').html(divContent);
            /*$('#weapon').text(this.weapon_in_game[0].name);
            $('#clothing').text(this.cloth_in_game[0].name);
            $('#movement').text(this.move_in_game[0].name);
            $('#equipment').text(this.equip_in_game[0].name);
            $('#goods').text(this.goods_in_game[0].name);*/
            
        });

        // Inject the whole content string into our existing HTML table
        $('#playerPerGame table tbody').html(tableContent);
    });
};

// Show User Info
function showUserInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);

    // Get our User Object
    var thisUserObject = userListData[arrayPosition];

    //Populate Info Box
    $('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoName').append("<img id='img1' src='/images/justinian.png' />");    
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);    

};

// Add Game
function addGame(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    //do a proper check in the future
    // $('#addGame input').each(function(index, val) {
    //     if($(this).val() === '') { console.log($(this)); errorCount++; }
    // });

    // $('#addGame select').each(function(index, val) {
    //     if($(this).val() === '') { console.log($(this)); errorCount++; }
    // });

    var gamesCounter = document.getElementById("games");
    console.log(gamesCounter.rows.length - 1);

    var newGame = {
            '_id': gamesCounter.rows.length,
            'winner': $('#addGame fieldset select#inputGameWinner').val(),
            'Date': $('#addGame fieldset input#inputGameDate').val(),
            'beginTime': $('#addGame fieldset input#inputGameBeginTime').val(),
            'endTime': $('#addGame fieldset input#inputGameEndTime').val(),
            'scenario': $('#addGame fieldset select#inputGameScenario').val(),
            'numberOfPlayers': $('#addGame fieldset input#inputGameNumberOfPlayers').val(),
            'losers': $('#addGame fieldset input#inputGameLosers').val(),
            'laters': $('#addGame fieldset input#inputGameLaters').val()
        };

        console.log(newGame);

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newGame = {
            '_id': gamesCounter.rows.length,
            'winner': $('#addGame fieldset select#inputGameWinner').val(),
            'Date': $('#addGame fieldset input#inputGameDate').val(),
            'beginTime': $('#addGame fieldset input#inputGameBeginTime').val(),
            'endTime': $('#addGame fieldset input#inputGameEndTime').val(),
            'scenario': $('#addGame fieldset select#inputGameScenario').val(),
            'numberOfPlayers': $('#addGame fieldset input#inputGameNumberOfPlayers').val(),
            'losers': $('#addGame fieldset input#inputGameLosers').val(),
            'laters': $('#addGame fieldset input#inputGameLaters').val()
        }



        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newGame,
            url: '/users/addGame',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addGame fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

//ADD player in a game
function addPlayerInGame(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    //do a proper check in the future
    // $('#addPlayerInGame input').each(function(index, val) {
    //     if($(this).val() === '') { console.log($(this)); errorCount++; }
    // });

    // $('#addPlayerInGame select').each(function(index, val) {
    //     if($(this).val() === '') { console.log($(this)); errorCount++; }
    // });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newPlayerInGame = {
            'play_Id': $('#addPlayerInGame fieldset select#inputGames').val(),
            'player': $('#addPlayerInGame fieldset select#inputPlayer').val(),
            'char': $('#addPlayerInGame fieldset select#inputChar').val(),
            'weaponID': $('#addPlayerInGame fieldset select#inputWeapon').val(),
            'clothID': $('#addPlayerInGame fieldset select#inputCloth').val(),
            'goodsID': $('#addPlayerInGame fieldset select#inputGoods').val(),
            'moveID': $('#addPlayerInGame fieldset select#inputMove').val(),
            'equipID': $('#addPlayerInGame fieldset select#inputEquip').val(),
            'attackTurn': $('#addPlayerInGame fieldset input#inputAttackTurn').val(),
            'remainingHP': $('#addPlayerInGame fieldset input#inputRemainingHP').val(),
            'skillList': $('#addPlayerInGame fieldset select#inputSkillList').chosen().val(),
            'winner': $('#addPlayerInGame fieldset input#inputWinner').val(),
            'foughtBoss': $('#addPlayerInGame fieldset input#inputFoughtBoss').val()
        }

        alert(JSON.stringify(newPlayerInGame));


        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newPlayerInGame,
            url: '/users/addPlayerInGame',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addPlayerInGame fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Add User
function addUser(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addGame input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newUser = {
            'username': $('#addGame fieldset input#inputUserName').val(),
            'email': $('#addGame fieldset input#inputUserEmail').val(),
            'fullname': $('#addGame fieldset input#inputUserFullname').val(),
            'age': $('#addGame fieldset input#inputUserAge').val(),
            'location': $('#addGame fieldset input#inputUserLocation').val(),
            'gender': $('#addGame fieldset input#inputUserGender').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addGame fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Delete User
function deleteUser(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {
        alert('Error: ');
        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/users/deleteuser/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};

function show_player_per_game() {
    var x = document.getElementById("playerPerGame2");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    }
};

function hide_player_per_game() {
    var x = document.getElementById("playerPerGame2");
    if (x.className.indexOf("w3-show") != -1) {
        x.className = x.className.replace(" w3-show", "");
    }
};

function show_hide_admin() {
    hide_player_per_game();
    var x = document.getElementById("addGame");
    if (x.className.indexOf("w3-show") != -1) {
        x.className = x.className.replace(" w3-show", "");
    } else {
        x.className += " w3-show";   
    };

    var y = document.getElementById("addPlayerInGame");
    if (y.className.indexOf("w3-show") != -1) {
        y.className = y.className.replace(" w3-show", "");
    } else {
        y.className += " w3-show";   
    };

    var z = document.getElementById("addGameTitle");
    if (z.className.indexOf("w3-show") != -1) {
        z.className = z.className.replace(" w3-show", "");
    } else {
        z.className += " w3-show";   
    };

    var w = document.getElementById("addPlayerPerGameTitle");
    if (w.className.indexOf("w3-show") != -1) {
        w.className = w.className.replace(" w3-show", "");
    } else {
        w.className += " w3-show";   
    };
};


function populatePlayerList() {

    // Empty content string
    var playersSelectList = '';  

    // jQuery AJAX call for JSON
    $.getJSON( '/users/playersList', function( data ) {

        playersSelectList += '<option disabled selected value>Jogador</option>';

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            playersSelectList += '<option value=' + this._id + '>' + this.name + '</option>';            

        });

        // Inject the whole content string into our existing HTML table
        $('#addGame fieldset select#inputGameWinner').append(playersSelectList);
        $('#addPlayerInGame fieldset select#inputPlayer').append(playersSelectList);
        $('.chosen-select_player').chosen({no_results_text: "Opa, nada encontrado!", width: "25%"}); 
    });
};

function populateScenarioList() {

    // Empty content string
    var scenarioSelectList = '';  

    // jQuery AJAX call for JSON
    $.getJSON( '/users/scenarioList', function( data ) {

        scenarioSelectList += '<option disabled selected value>Cenário</option>';

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            scenarioSelectList += '<option value=' + this._id + '>' + this.name + '</option>';            

        });

        // Inject the whole content string into our existing HTML table
        $('#addGame fieldset select#inputGameScenario').append(scenarioSelectList);
        $('.chosen-select').chosen({no_results_text: "Opa, nada encontrado!", width: "25%"}); 
    });
};

function populateGameList() {

    // Empty content string
    var gameSelectList = '';  

    // jQuery AJAX call for JSON
    $.getJSON( '/users/userList', function( data ) {

        gameSelectList += '<option disabled selected value>Partida</option>';

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            gameSelectList += '<option value=' + this._id + '>' + this._id + '</option>';            

        });

        // Inject the whole content string into our existing HTML table
        $('#addPlayerInGame fieldset select#inputGames').append(gameSelectList);
        $('.chosen-select_game_list').chosen({no_results_text: "Opa, nada encontrado!", width: "25%"});
    });
};

function populateCharList() {

    // Empty content string
    var charSelectList = '';  

    // jQuery AJAX call for JSON
    $.getJSON( '/users/char', function( data ) {

        charSelectList += '<option disabled selected value>Personagem</option>';

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            charSelectList += '<option value=' + this.char + '>' + this.name + '</option>';            

        });

        // Inject the whole content string into our existing HTML table
        $('#addPlayerInGame fieldset select#inputChar').append(charSelectList);
        $('.chosen-select_char').chosen({no_results_text: "Opa, nada encontrado!", width: "25%"});         
    });
};

function populateEquipList() {

    // Empty content string
    var equipSelectList = '';  

    // jQuery AJAX call for JSON
    $.getJSON( '/users/equipList', function( data ) {

        equipSelectList += '<option disabled selected value>Equipamento</option>';

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            equipSelectList += '<option value=' + this._id + '>' + this.name + '</option>';            

        });

        // Inject the whole content string into our existing HTML table
        $('#addPlayerInGame fieldset select#inputWeapon').append(equipSelectList);
        $('#addPlayerInGame fieldset select#inputCloth').append(equipSelectList);
        $('#addPlayerInGame fieldset select#inputGoods').append(equipSelectList);
        $('#addPlayerInGame fieldset select#inputMove').append(equipSelectList);
        $('#addPlayerInGame fieldset select#inputEquip').append(equipSelectList);
        $('.chosen-select_equip').chosen({no_results_text: "Opa, nada encontrado!", width: "25%"});         
    });
};

function populateSkillList() {

    // Empty content string
    var skillSelectList = '';  

    // jQuery AJAX call for JSON
    $.getJSON( '/users/skillList', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            skillSelectList += '<option value=' + this._id + '>' + this.name + '</option>';            

        });

        // Inject the whole content string into our existing HTML table
        console.log(skillSelectList);
        $('#addPlayerInGame fieldset select#inputSkillList').append(skillSelectList);
        $('.chosen-select_skill').chosen({no_results_text: "Opa, nada encontrado!",
                                          width: "95%",
                                          placeholder_text_multiple: "Selecione as Skills"});         
    });
};