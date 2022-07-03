$((onReady) => {
    setupClickListeners();
    collectQuest();

});

function setupClickListeners() {

    $('.submit-btn').on('click', collectQuest);
    $('.taskList').on('click','.delete-btn', deleteList);
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
    //ajax call to server to get task list
    $.ajax({
        url: '/quests',
        method: 'GET'
    }).then((response) => {
        console.log('response from GET:', response);
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
    console.log(list);

    for (let quest of quests) {
        //dynamtically append input value along with delete and check box on each submit
        $('.taskList').append(`
    <li> ${quest.list} </li> 
    <button class="delete-btn" data-id= ${quest.id}> Delete </button> 
    <button class="complete-btn" data-id=${quest.id} data-status=${quest.complete}> Complete </button> 

    `)
    };
    //console.log('list is loaded');

    //clear input value field
    $('input').val('');
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


//function to check off completed quests
function checkOff (){
    let id = $(this).data('id');
    let complete = $(this).data('status');
    console.log('in put show id:', id);

    $.ajax({
        method: 'PUT',
        url: `/quests/${id}`,
        data: {status: complete}
    }).then (()=>{
        //changeColor();
        //$(this).addClass('next');
        getList();
    }).catch((error)=>{
        console.log('error in put:', error);
    })
}

//function to change list background color
// function changeColor(){
//     $(this).addClass('next');
// }

//function to delete list
function deleteList(){
    let deleteId = $(this).data('id');

    $.ajax({
        method: 'DELETE',
        url: `/quests/${deleteId}`,
        data: {id: deleteId}
    }).then(function(){
        console.log('In Delete');
        //once delete, update DOM & DB
        getList();
    }).catch((error)=>{
        console.log('error in Delete:', error);
    })

}
