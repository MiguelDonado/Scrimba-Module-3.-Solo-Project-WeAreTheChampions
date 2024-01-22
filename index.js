import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const endorsementTextAreaEl = document.getElementById("endorsement-textarea")
const publishBtnEl = document.getElementById("publish-btn")
const endorsementListEl = document.getElementById("endorsement-list")

const appSettings = {databaseURL: "https://we-are-the-champions-70839-default-rtdb.europe-west1.firebasedatabase.app/"}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorseListInDb = ref(database,"endorseList")

publishBtnEl.addEventListener("click", function (){
    let endorseValue = endorsementTextAreaEl.value
    push(endorseListInDb,endorseValue)
    clearTextArea()
})


onValue(endorseListInDb, function(snapshot){
    if (snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        clearEndorsementListEl()
        for (let i = 0; i < itemsArray.length; i++){
            appendItemToEndorsementListEl(itemsArray[i])
        }
    }else{
        endorsementListEl.innerHTML= "No endorsements yet"
    }
})











function clearTextArea(){
    endorsementTextAreaEl.value=null
}

function clearEndorsementListEl(){
    endorsementListEl.innerHTML=null
}

function appendItemToEndorsementListEl(item){
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    endorsementListEl.append(newEl)
}


