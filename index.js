//set default values
if (localStorage.getItem("todo") === null){
    //preset values
    const list = [
        'Buy new sweatshirt',
        'Begin promotional phase',
        'Read an article',
        'Try not to fall asleep',
        'Watch Sherlock',
        'Begin QA for the product',
        'Go for a walk',
    ];
    //stringify and save preset values to local storage
    localStorage.setItem("todo", JSON.stringify(list));
}

//retrieve from storage and store in variable
var retrievedData = localStorage.getItem("todo");
//parse values from local storage
var convertedList = JSON.parse(retrievedData);


function showTask(){
    if(convertedList === undefined || convertedList.length == 0 ){
        document.getElementById("items").innerHTML = "Empty List";
    } else {
        const tasks = convertedList.map((thelist, i) => {
            return `<div class="flex-container row">
                        <div style="flex-basis:auto">
                            <p><input type="checkbox" onclick="completed(${i}, this.checked)"/></p>
                        </div>
                        <div style="flex-basis:70%">
                            <p id="${i}">${thelist}</p>
                        </div>
                        <div style="flex-basis:auto">
                            <button class="uBtn" onclick="callModal('Update',${i})"><img src="icons/refresh-button.svg"></button>
                            <button class="dBtn" onclick="deleteTask(${i})"><img src="icons/rubbish-bin.svg"></button>
                        </div>
                    </div>`
        }).join('');

        document.getElementById("items").innerHTML = tasks;
    }
}

function callModal (Header, id) {//call modal
    document.querySelector(".modal-content > h2").textContent = Header;
    let span = document.getElementsByClassName("close")[0];
    let modal = document.getElementById("myModal");
    span.onclick = function() {
        modal.style.display = "none";
      }
    modal.style.display = "block";

    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }

      let modalBox = document.getElementById("modalBox");
      
    if(id !== " "){
        modalBox.value = convertedList[id];
        document.getElementById("idBox").value = id;
        document.querySelector('#mubutton').onclick = () =>{
            update();
        }
    }else{
        modalBox.value = " ";
    }
}


document.querySelector('#add').onclick = () => {
    callModal("Add list", " ");
    document.querySelector('#mubutton').onclick = () =>{
        addTask();
    }
};

const addTask = () =>{
    let newTask = document.getElementById('modalBox').value;
    if(newTask === " "){
        alert("please enter a string");
    }else{
        convertedList.push(newTask);
        localStorage.setItem("todo", JSON.stringify(convertedList));
        document.querySelector("#myModal").style.display = "none";
        showTask();
    }
};

function deleteTask(id){
    convertedList.splice(id, 1)
    localStorage.setItem("todo", JSON.stringify(convertedList));
    showTask();
}


const update = () => {
    let idBox = document.getElementById('idBox').value;
    let modalBox =  document.getElementById('modalBox').value;
    if(modalBox === " "){
        alert("please enter a string");
    }else{
        //add task to object
        convertedList[idBox] = modalBox;
        //update Storage
        localStorage.setItem("todo", JSON.stringify(convertedList));
        //close modal
        document.getElementById("myModal").style.display = "none";
        modalBox;
        showTask();
    }
}


//blur completed task
function completed(id, status){
    if(status === true){
        document.getElementById(id).style.color = "#C9CCD4";
    }else{
        document.getElementById(id).style.color = "inherit";
    }
}


//date
let monthNames = [
    'JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'
];

let dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];


(function(){
    let date = new Date()
    let month = date.getMonth();
    let year = date.getFullYear();
    let tdate = date.getDate();
    let day = date.getDay();
    document.querySelector("#date").textContent = tdate;
    document.querySelector("#month").textContent = monthNames[month];
    document.querySelector("#year").textContent = year;
    document.querySelector("#day").textContent = dayNames[day];
})();