
import {
    Person,
    Network
} from "./shouty.js"

const default_range = 100

class ShoutyWorld {
    get people() {
        return (this._people = this._people || {})
    }

    get network() {
        return (this._network = this._network || new Network(default_range))
    }

    shout({ from: shouter, message }) {
        this.people[shouter.name].shout(message)
        this.message = message

        printStatus()
    }
}

const shoutyWord = new ShoutyWorld()

export function setRange(range) {
    shoutyWord.network.range = range
    
    printStatus()
}

export function newPerson(person) {
    if (person && person.name && person.location) {
        shoutyWord.people[person.name] = new Person({ name: person.name, location: person.location })
    }

    printStatus()
}

export function addPersonInNetwork({ name }) {
    if (name) {
        const person = shoutyWord.people[name]
        if (person) {
            shoutyWord.network.addPerson(person)
        }
    }

    printStatus()
}

export function shout({ from, message }) {

    console.log('shoutyWord.network', shoutyWord.network)

    if (from && message) {
        shoutyWord.shout({ from, message })
    }

    console.log('after shoutyWord.network', shoutyWord.network)
}

export function isPersonInRange(name) {
    const person = shoutyWord.people[name]

    console.log(name, person)
    printStatus()

    return person && person.inRange()
}

export function getMessage() {
    return shoutyWord.message
}

export function getPersonHeardmMessages(name) {
    const person  =  shoutyWord.people[name]
    if (person) {
        return person.messagesHeard()
    }

    return []

    printStatus()
}

function printStatus() {

    console.log('message:', shoutyWord.message)
    console.log('people:', shoutyWord.people)
    console.log('network:', shoutyWord.network)
}