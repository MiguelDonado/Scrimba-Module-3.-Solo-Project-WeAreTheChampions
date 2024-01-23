import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const endorsementTextAreaEl = document.getElementById("endorsement-textarea")
const publishBtnEl = document.getElementById("publish-btn")
const endorsementListEl = document.getElementById("endorsement-list")
const fromInputEl = document.getElementById("from-input")
const toInputEl = document.getElementById("to-input")

const appSettings = {databaseURL: "https://we-are-the-champions-70839-default-rtdb.europe-west1.firebasedatabase.app/"}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorseListInDb = ref(database,"endorseList")

publishBtnEl.addEventListener("click", function (){
    let endorseValue = endorsementTextAreaEl.value
    let fromValue = fromInputEl.value
    let toValue = toInputEl.value
    const messageObject = {from:fromValue,to:toValue,endorsement:endorseValue}
    push(endorseListInDb,messageObject)
    clearTextArea()
})


onValue(endorseListInDb, function(snapshot){
    if (snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        clearEndorsementListEl()
        for (let i = itemsArray.length - 1; i>=0; i--){
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
    fromInputEl.value=null
    toInputEl.value=null
}

function appendItemToEndorsementListEl(item){
    let itemID = item[0]
    let itemValueObject = item[1]

    let newEl = document.createElement("li")
    newEl.innerHTML = newEl.innerHTML = `<span style="display: block;margin-top: 10px;"><strong>To ${itemValueObject.to}</strong></span>
                                        <br>${itemValueObject.endorsement}
                                        <br><span style="display: block;margin-top: 10px;"><strong>From ${itemValueObject.from}</strong></span>`
    newEl.addEventListener("dblclick",function(){
        let exactLocationOfEndorseinDb = ref(database,`endorseList/${itemID}`)
        remove(exactLocationOfEndorseinDb)
    })
    endorsementListEl.append(newEl)
}


