
$((onReady) => {
    setupClickListeners();
    getList();

});

function setupClickListeners() {

    $('.submit-btn').on('click', collectQuest);
    $('.taskList').on('click', '.delete-btn', deleteList);
    $(document).on('click', '.complete-btn', checkOff);
}

//function to send client input to database
function collectQuest() {

    //declare new variable for client inputs
    const newQuest = {
        list: $('.inputBox').val(),
        complete: false,
    };
    $.ajax({
        method: 'POST',
        url: '/quests',
        data: newQuest,
    }).then((response) => {
        console.log(response);
        $('.inputBox').val('');
        getList();
    }).catch((error) => {
        console.log('error in collectQuest post:', error);
    });

}

function getList() {
    //clear task list
    $('.taskList').empty();
    //ajax call to server to get task list from database
    $.ajax({
        url: '/quests',
        method: 'GET'
    }).then((response) => {
        console.log('response from GET:', response);
        //when ajax comes back run renderList function
        renderList(response);
    }).catch((error) => {
        console.log('error in GET:', error);
    });
}; //end GET task list

//function to render list onto DOM
function renderList(quests) {
    console.log('in renderList');
    $('.taskList').empty();
    //declare variable for input value
    let list = $('.inputBox').val();
    //log the new input
    console.log(list);

    //for of loop to loop and append new fields
    for (let quest of quests) {
        //dynamtically append input value along with delete and check box on each submit
        //if quest status is true add a class of 'next' which will change the task background color and line through it
        $('.taskList').append(`
    <div class="containerList ${quest.complete ? `next` :''} ">
        <li> ${quest.list} </li> 
        <button class="complete-btn" data-id=${quest.id} data-status=${quest.complete}> ✔ </button> 
        <button class="delete-btn" data-id= ${quest.id}><i class="material-icons">delete</i></button> 
    </div>
    `)
    };
    //clear input value field after task appends on DOM
    $('input').val('');
}





//function to send client input to database
function collectQuest() {

    //declare new variable for the client inputs
    const newQuest = {
        list: $('.inputBox').val(),
        complete: false,
        };
    //summons ajax to talk with database
    $.ajax({
        method: 'POST',
        url: '/quests',
        data: newQuest,
    }).then((response) => {
        console.log(response);
    //when ajax ruturns empty input field
        $('.inputBox').val('');
    //after empyting input field, update the DOM
        getList();
    }).catch((error) => {
        console.log('error in collectQuest post:', error);
    });

}


//function to check off completed quests
function checkOff() {
    //set variable for the touched item
    let id = $(this).data('id');
    //set variable to declare status
    let complete = $(this).data('status');

    console.log('in put show id:', id);
    //summon ajax update and follow given route
    $.ajax({
        method: 'PUT',
        url: `/quests/${id}`,
        data: { status: complete }
    }).then(() => {
    //upon return, update the DOM
        getList();
    }).catch((error) => {
        console.log('error in put:', error);
    })
}


//function to delete list
function deleteList() {
    //set variable for touched item
    let deleteId = $(this).data('id');

    //summon ajax delete 
    $.ajax({
        method: 'DELETE',
        url: `/quests/${deleteId}`,
        data: { id: deleteId }
    }).then(function () {
        console.log('In Delete');
        //once delete, update DOM & DB
        getList();
    }).catch((error) => {
        console.log('error in Delete:', error);
    })

}
