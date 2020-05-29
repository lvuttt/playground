'use strict';

const fs = require('fs');
// const { } = require('../helpers')

class DatabaseManager {
    constructor(json_path) {
        this.json_path = json_path
        this.dictionary = this.read()
    }

    read() {
        console.log("JSON file has been read.")
        return JSON.parse(fs.readFileSync(this.json_path))
    }

    write() {
        var jsonContent = JSON.stringify(this.dictionary);

        fs.writeFile(this.json_path, jsonContent, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                throw (err)
            }
            console.log("JSON file has been saved.");
        });
    }

    countGroup() {
        try {
            var counter = {}

            // Empty group has 0 contact. So fill this first
            var emptyNameRow = this.dictionary.filter((row) => { return !row.firstName })
            var emptyGroupName = emptyNameRow.map(function (row) { return row.groupName })
            emptyGroupName.forEach(function (name) { counter[name] = 0; })

            // Fill the rest of group
            var data = this.dictionary.filter((row) => { return row.firstName })
            var groupName = data.map(function (row) { return row.groupName })
            groupName.forEach(function (name) { if (name in counter) counter[name]++; else counter[name] = 1; });

            return {
                "groups": counter
            }
        } catch (err) {
            throw (err)
        }
    }

    deleteGroup(groupName) {
        try {
            this.dictionary = this.dictionary.filter((row) => { return row.groupName != groupName })
            this.write()
            return this.dictionary
        } catch (err) {
            throw (err)
        }
    }

    addGroup(groupName) {
        try {
            var data = {
                "groupName": groupName,
                "firstName": "",
                "birthDate": "",
                "phoneNum": "",
                "email": "",
                "url": "",
                "imagePath": ""
            }
            this.dictionary.push(data)
            this.write()
            return this.dictionary
        } catch (err) {
            throw (err)
        }
    }

    getContactList(groupName) {
        try {

            if (!groupName) {
                throw (Error("Group name must not be empty"))
            }

            var contactList = this.dictionary.filter((row) => { return row.groupName == groupName && row.firstName }).map((row) => { return row.firstName })
            return {
                "contacts": contactList
            }

        } catch (err) {
            throw (err)
        }
    }

    addContact(info = {}) {
        try {
            var groupNames = this.dictionary.filter((row) => { return !row.firstName }).map((row) => { return row.groupName })
            if (!groupNames.includes(info.groupName || "")) {
                throw (Error("Group must be created first"))
            }

            if ((info.firstName || "") == "") {
                throw (Error("First Name must not be empty"))
            }

            this.dictionary.push({
                groupName: groupName,
                firstName: info.firstName,
                birthDate: info.birthDate || "",
                phoneNum: info.phoneNum || "",
                email: info.email || "",
                url: info.url || "",
                imagePath: info.imagePath || ""
            })
            this.write()

        } catch (err) {
            throw (err)
        }
    }

    deletContact(groupName, name) {

    }

    editContact(info={}) {

    }

    getContactInfo(groupName, name) {
        
    }




}

var databaseManager = new DatabaseManager("assignment2/contact.json")
module.exports = databaseManager