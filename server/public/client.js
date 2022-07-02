$((onReady)=>{
    setupClickListeners();
    getList();

});

function setupClickListeners() {

    $('.submit-btn').on('click', collectQuest);
}


function getList(){
    //clear task list
    $('.taskList').empty();
    //ajax call to server to get task list
    $.ajax ({
        url: '/quests',
        method: 'GET'
    }).then((response)=>{
        console.log('response from GET:', response);
        renderList(response);
    }).catch ((error)=>{
        console.log('error in GET:', error);
    });
}; //end GET task list

//function to render list onto DOM
function renderList(quests){
    console.log('in renderList');
    //declare variable for input value
    let list = $('.inputBox').val();
    console.log(list);

    for (let quest of quests){
    //dynamtically append input value along with delete and check box on each submit
    $('.taskList').append( `
    <div> <li> ${quest.list} </li> </div>
    <div> <button class="delete-btn"> Delete </button> </div>
    <div> <button class="complete-btn" data-id="${quest.complete}"> Complete </button> </div>

    `)};
    console.log('list is loaded');

    //clear input value field
    $('input').val('');
}

//function to send client input to database
function collectQuest(){
    let list = $('.inputBox').val()

    //declare new variable for client inputs
    const newQuest = {
        list: list,
        complete: false,
    };
    $.ajax ({
        method: 'POST',
        url: '/quests',
        data: newQuest,
    }).then((response)=> {
        console.log(response);
        getList();
    }).catch ((error) =>{
        console.log('error in collectQuest post:', error);
    });
    console.log('current collectQuest is:', newQuest);
}

