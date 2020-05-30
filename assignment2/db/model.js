'use strict';

const fs = require('fs');
const { CustomError } = require('../helpers')

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
                throw new CustomError(500, err)
            }
            console.log("JSON file has been updated.");
        });
    }

    countGroup() {
        var counter = {}

        // Empty group has 0 contact. So initiate every groups with 0 contact.
        var uniqueGroupNames = this.getUniqueGroupNames()
        uniqueGroupNames.forEach(function (name) { counter[name] = 0; })

        // Count the rest of group.
        var filteredData = this.dictionary.filter((row) => { return row.firstName })
        var groupNames = filteredData.map(function (row) { return row.groupName })
        groupNames.forEach(function (name) { counter[name]++ });

        return {
            "groups": counter
        }
    }

    deleteGroup(groupName) {
        var uniqueGroupNames = this.getUniqueGroupNames()
        if (!uniqueGroupNames.includes(groupName)) {
            throw new CustomError(404, "Group name not exists.")
        }

        this.dictionary = this.dictionary.filter((row) => { return row.groupName != groupName })
        this.write()
        return {
            "message": `Group(${groupName}) is deleted.`
        }
    }

    addGroup(groupName) {
        var uniqueGroupNames = this.getUniqueGroupNames()
        if (groupName == "") {
            throw new CustomError(400, "Group name must not be empty.")
        }

        if (uniqueGroupNames.includes(groupName)) {
            throw new CustomError(404, "Group name already exists.")
        }


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
        return {
            "message": `Group(${groupName}) is created.`
        }
    }

    getContactList(groupName) {

        if (!groupName) {
            throw new CustomError(400, "Group name must not be empty.")
        }

        var uniqueGroupNames = this.getUniqueGroupNames()
        if (!uniqueGroupNames.includes(groupName)) {
            throw new CustomError(404, "Group name not exists.")
        }

        var contactList = this.dictionary.filter((row) => { return row.groupName == groupName && row.firstName }).map((row) => { return row.firstName })
        return {
            "contacts": contactList
        }
    }

    addContact(info = {}) {
        var uniqueGroupNames = this.getUniqueGroupNames()
        if (!uniqueGroupNames.includes(info.groupName || "")) {
            throw new CustomError(400, "Group must be created first.")
        }

        if ((info.groupName || "") == "") {
            throw new CustomError(400, "Group name must not be empty.")
        }

        if ((info.firstName || "") == "") {
            throw new CustomError(400, "First name must not be empty.")
        }

        var filteredData = this.dictionary.filter((row) => { return row.groupName == info.groupName && row.firstName == info.firstName })
        if (filteredData.length != 0) {
            throw new CustomError(400, "First name already exists.")
        }


        this.dictionary.push({
            groupName: info.groupName,
            firstName: info.firstName,
            birthDate: info.birthDate || "",
            phoneNum: info.phoneNum || "",
            email: info.email || "",
            url: info.url || "",
            imagePath: info.imagePath || ""
        })
        this.write()
        return {
            "message": `Contact(${info.firstName}) is added.`
        }
    }

    deleteContact(groupName, name) {
        var uniqueGroupNames = this.getUniqueGroupNames()
        if (!uniqueGroupNames.includes(groupName)) {
            throw new CustomError(404, "Group name not exists.")
        }

        if ((name || "") == "") {
            throw new CustomError(400, "First name must not be empty.")
        }

        var filteredData = this.dictionary.filter((row) => { return row.groupName == groupName && row.firstName == name })
        if (filteredData.length == 0) {
            throw new CustomError(404, "First name not exists.")
        }

        this.dictionary = this.dictionary.filter((row) => { return row.groupName != groupName || row.firstName != name })
        this.write()
        return {
            "message": `Contact(${name}) is deleted.`
        }
    }

    editContact(info = {}) {
        var uniqueGroupNames = this.getUniqueGroupNames()
        if (!uniqueGroupNames.includes((info.groupName || ""))) {
            throw new CustomError(404, "Group name not exists.")
        }

        if ((info.firstName || "") == "") {
            throw new CustomError(400, "First name must not be empty.")
        }

        var filteredData = this.dictionary.filter((row) => { return row.groupName == info.groupName && row.firstName == info.firstName })
        if (filteredData.length == 0) {
            throw new CustomError(404, "First name not exists")
        }

        if ((info.newFirstName || "") == "") {
            throw new CustomError(400, "Edited first name must not be empty.")
        }

        var names = this.getContactList(info.groupName).contacts
        if (names.includes(info.newFirstName)) {
            throw new CustomError(400, "New first name already exists.")
        }

        this.dictionary.filter((row) => {
            if (row.groupName == info.groupName && row.firstName == info.firstName) {
                row.firstName = info.newFirstName
                row.birthDate = info.birthDate || ""
                row.phoneNum = info.phoneNum || ""
                row.email = info.email || ""
                row.url = info.url || ""
                row.imagePath = info.imagePath || ""
            }
        })

        this.write()
        return { "message": `Contact is edited.` }
    }

    getContactInfo(groupName, name) {
        var uniqueGroupNames = this.getUniqueGroupNames()
        if (!uniqueGroupNames.includes((groupName || ""))) {
            throw new CustomError(400, "Group name not exists.")
        }

        if ((name || "") == "") {
            throw new CustomError(400, "First name must not be empty.")
        }

        var filteredData = this.dictionary.filter((row) => { return row.groupName == groupName && row.firstName == name })
        if (filteredData.length == 0) {
            throw new CustomError(400, "First name not exists.")
        }
        if (filteredData.length >= 2) {
            throw new CustomError(500, "Data is duplicated.")
        }
        return filteredData[0]
    }

    getUniqueGroupNames() {
        return this.dictionary.filter((row) => { return !row.firstName }).map(function (row) { return row.groupName })
    }

}

var databaseManager = new DatabaseManager("assignment2/database.json")
module.exports = databaseManager