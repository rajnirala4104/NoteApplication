showNotes();
let containor = document.getElementById("containor");
let addbtn = document.getElementById("addBtn");
let saveChanges = document.getElementById('saveChanges')

addbtn.addEventListener("click", function() {
    let text = document.getElementById("addText");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesList = [];
    }
    else {
        notesList = JSON.parse(notes)
    }
    notesList.push(text.value);
    addnote(text.value, notesList.length);
    // showNotes()
    localStorage.setItem("notes", JSON.stringify(notesList));
    // text.value = "";
    // console.log(notesList);
});
saveChanges.addEventListener("click", function() {
    let text = document.getElementById("EditText");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesList = [];
    }
    else {
        notesList = JSON.parse(notes)
    }
    notesList.push(text.value);
    addnote(text.value, notesList.length);
    // showNotes()
    localStorage.setItem("notes", JSON.stringify(notesList));
    // text.value = "";
    // console.log(notesList);


    window.location.reload()
});


//-------------Edit Note-----------
const editYourNote = (indexOfYourNoteWhichYouWantToEdit) => {
    const notesArr = JSON.parse(localStorage.getItem('notes'))
    console.log(notesArr[indexOfYourNoteWhichYouWantToEdit])
    let editTextArea = document.getElementById('EditText')
    editTextArea.innerText = notesArr[indexOfYourNoteWhichYouWantToEdit]
}

//-------------show note------------------
function showNotes() {
    // console.log("hello guys i'm raj nirala");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesList = [];
    }
    else {
        notesList = JSON.parse(notes)
    }
    // console.log(notesList);
    let card = "";
    notesList.forEach((noteText, index) => {
        card += `<div class="card note">
        <div class="card-header"><h5 class="card-title">Note ${index + 1}</h5><span>Time</span></div>
        <div class="card-body">
          <p class="card-text">${noteText}</p>
          <div class="btns">
                <button type="button" id="${index}" onclick="delnote(this.id)"
                    class="btn  btn-danger">Delete</button>
                <button type="button" id="editNote" class="btn  btn-primary" onclick="editYourNote(${index})"
                    data-toggle="modal" data-target="#exampleModalCenter">Edit</button>
            </div>
        </div>
        </div>`;
    });
    let showhere = document.getElementById("shownoteshere");
    showhere.innerHTML = card;
}


//------------------add note----------------
function addnote(noteText, index) {
    let showhere = document.getElementById("shownoteshere");
    // let noteCard = document.getElementById("note");
    showhere.innerHTML += `<div class="card">
    <div class="card-header">Time</div>
    <div class="card-body">
      <h5 class="card-title">Note ${index + 1}</h5>
      <p class="card-text">${noteText}</p>
      <div class="btns">
            <button type="button" id="${index}" onclick="delnote(this.id)"
                class="btn  btn-danger">Delete</button>
            <button type="button" id="editNote" class="btn  btn-primary" onclick="editYourNote(${index})"
                data-toggle="modal" data-target="#exampleModalCenter">Edit</button>
        </div>
    </div>
    </div>`;

};


//----------------note delete -----------------
function delnote(index) {

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesList = [];
    }
    else {
        notesList = JSON.parse(notes);
    }
    notesList.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesList));
    showNotes();

}


//-----------search bar----------
let search = document.getElementById("searchtext");
search.addEventListener("input", function () {
    let searchValue = search.value;
    let searchValueCapi = searchValue.toUpperCase()
    // console.log(searchValueCapi);
    let notes = document.getElementsByClassName("note");
    Array.from(notes).forEach(function (element) {
        // console.log(element);
        let card = element.getElementsByTagName("p")[0].innerText;
        if (card.includes(searchValue)) {
            element.style.display = "block";
        } else if (card.includes(searchValueCapi)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
});


//during null div
let showhere = document.getElementById("shownoteshere");
if (showhere.innerHTML == []) {
    showhere.innerHTML = `<h4 style="color:red;">Nothing to show here! use "Add Note" to add notes.<h4>`;
} else {
    showNotes();
}

