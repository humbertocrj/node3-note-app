const fs = require('fs');
const { type } = require('os');
const chalk = require('chalk');

const loadNotes = () =>{

    const notes = fs.readFileSync("notes.json", "utf-8");

    if (notes.length == 0) {

        return []
    } else {

        return JSON.parse(notes)
    }

}
const getNotes = () =>{
    return "Your notes..."
}

const addNotes = (title, body) => {
    const notes = loadNotes()

    const duplicatesNotes = notes.filter((notes)=> notes.title === title)

    if (duplicatesNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)

        console.log("New note added!");

    } else {
        console.log("Note title already exists!")
    }

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json", dataJSON)
}

const removeNote = (title) =>{
    const notes = loadNotes()
    
    const newNotes = notes.filter((note) => note.title != title)
    
    if(notes.length > newNotes.length){
        saveNotes(newNotes)
        console.log(chalk.green(`Note "${title}" was removed successfully!`))
    }else{
        console.log(chalk.red('Note title not found!'))
    }
}

const readNote = (title) =>{
    const notes = loadNotes()
    
    const noteFound = notes.find((note) => note.title == title)
    
    debugger

    if(noteFound){
        console.log(chalk.gray.bold.underline(noteFound.title))
        console.log(noteFound.body)
    }else{
        console.log("Title not found: " + title)
    }
}

const listNotes = ()=>{
    const notes = loadNotes()

    if(!notes.length){
        console.log(chalk.red("There is on note!"))
    }else{
        notes.forEach((note, index) =>{
            
            console.log(chalk.gray.bold.underline((++index)+" - "+note.title))
            console.log(note.body+"\n")

        })
    }
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNote: removeNote,
    readNote: readNote,
    listNotes: listNotes,
}