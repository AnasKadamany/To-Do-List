const inputBox=document.getElementById("input-box");
const ListContainer=document.getElementById("List-Container");

function AddValues(){
    if(inputBox.value === '') {
        return alert("Write Something Please.");
    } else {
        let newLi = document.createElement('li');
        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = "X";
        deleteButton.onclick = function() {
            ListContainer.removeChild(newLi);
        };
        newLi.innerHTML = inputBox.value;
        newLi.appendChild(deleteButton); 
        ListContainer.appendChild(newLi);
    }
    inputBox.value='';
    SaveData();
}
inputBox.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        AddValues();
    }
});
ListContainer.addEventListener("click",function(event){
    if (event.target.tagName === 'LI') { 
        event.target.classList.toggle('checked'); 
        SaveData();
    }
})
function SaveData(){
    localStorage.setItem("data",ListContainer.innerHTML)
}
function showTasks() {
    ListContainer.innerHTML = localStorage.getItem("data");

    ListContainer.querySelectorAll('li button').forEach(function(button) {
        button.onclick = function() {
            ListContainer.removeChild(button.parentElement);
            SaveData(); 
        };
    });
}

function updateTime() {
    let currentDate = new Date();

    let formattedDate = currentDate.toLocaleDateString();
    let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let dateTimeString = `${formattedDate} ${formattedTime}`;

    let dateTimeElement = document.querySelector('.current-time'); 
    if (!dateTimeElement) { 
        dateTimeElement = document.createElement('div');
        dateTimeElement.classList.add('current-time'); 
        let headers = document.querySelector('.headers'); 
        headers.appendChild(dateTimeElement);
    }
    dateTimeElement.textContent = dateTimeString; 
}
updateTime();
setInterval(updateTime, 60000);
showTasks();