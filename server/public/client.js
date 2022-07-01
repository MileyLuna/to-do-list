$(onReady);

function onReady(){
    $('.submit-btn').on('click', qList);
}

function qList(){
    console.log('in GET /gList');

    //clear task list
    $('.taskList').empty();
    //ajax call to server to get task list
    $.ajax ({
        url: '/quests',
        method: 'GET'
    }).then((response)=>{
        console.log('response frm GET:', response);
        renderList(response);
    }).catch ((error)=>{
        console.log('error in GET:', error);
    });
}; //end GET task list

function renderList(quests){
    let list = $('.inputBox').val();

    $('.taskList').append( `
    <input type"checkbox"> + <li> ${list} </li> + </input>
    <button class="delete-btn"> Delete </button>
    `);
    console.log('list is loaded');

    $('input').val('');
}