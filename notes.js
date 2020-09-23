const fs = require('fs')
const chalk = require('chalk')

const getNotes = (result) => {
    return 'Your notes...'
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = note.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Title already exists!')
    }
}

const removeNote = (title) => {
    try {
        const notes = loadNotes()
        const notesToKeep = notes.filter((note) => note.title !== title)
        saveNotes(notesToKeep)
        if (notes.length !== notesToKeep.length)
            console.log(chalk.bgGreen('Note removed!'))
        else 
            console.log(chalk.bgRed('No note found!'))
    } catch (e) {
        return 
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.yellow('Your notes...'))
    notes.forEach(note => {
        console.log(chalk.green(note.title))
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    
    if (note) {
        console.log('Note title: ' + chalk.yellow(note.title) + '\n' + 'Note body: ' + note.body)
    } else {
        console.log(chalk.red('Note not found!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString();

        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
