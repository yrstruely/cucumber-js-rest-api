import { Given, Then } from '@cucumber/cucumber';
import { assertThat, is } from 'hamjest';
import { deepEqual } from 'node:assert';
import { Person } from '../../../../src/shouty.js';

import {
    changeRange,
    addPerson,
    addPersonInNetwork,
    getPersonHeardMessages,
    checkInRange,
    getMessage
} from '../support/utils/requests.js'

const default_distance = 0

Given('the range is {int} meters', async function (range) {
    this.network.range = range
    await changeRange(range)
});

Given('a person named {word}', function (name) {
    this.people[name] = new Person({ name: name, location: default_distance })
    this.network.addPerson(this.people[name])
});

Given('people are located at:', async function (dataTable) {
    dataTable.transpose().hashes().map((person) => {
        addPerson(person.name, person.location)
        addPersonInNetwork(person.name)

        // this.people[person.name] = new Person({ name: person.name, location:person.location })
        // this.network.addPerson(this.people[person.name])
    })
});

Then('{Person} hears {Person}\'s message', function (hearer, shouter) {
    assertThat(this.people[hearer.name].messagesHeard(), is([this.message]))
});

Then('{Person} doesn\'t hear {Person}\'s message', function (hearer, shouter) {
    assertThat(this.people[hearer.name].messagesHeard(), is([]))
});

Then('{Person} hears the following messages:', function (hearer, expectedMessages) {
    let actualMessages = this.people[hearer.name].messagesHeard().map(message => [message])
    deepEqual(actualMessages, expectedMessages.raw())
});

Then('{Person} only hears {Person}\'s message when she is in range', async function (hearer, shouter) {
    const inRange = checkInRange(hearer.name)
    // if (this.people[hearer.name].inRange()) {
    if (inRange) {
        const heardMessages = await getPersonHeardMessages(hearer.name)
        const message = await getMessage()

        console.log('heard messages:', heardMessages, message)
        assertThat(heardMessages, is([message]))

        // assertThat(this.people[hearer.name].messagesHeard(), is([this.message]))
    }
    else {
        assertThat(this.people[hearer.name].messagesHeard(), is([]))
    }
});