
import { Network } from "./shouty.js"

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
    }
}

const shoutyWord = new ShoutyWorld()

export function setRange(range) {
    shoutyWord.network.range = range
    console.log("Set Range:", range)
}

