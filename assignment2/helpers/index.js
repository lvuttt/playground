// const contactNumByGroupName = (data) => {
//     console.log(typeof(data))
//     var groupName = data.map(function(row) {return row.groupName})
//     var counter = {}
//     groupName.forEach( function(name) { if (name in counter) counter[name] ++; else counter[name] = 1; } );
//     return counter
// }

// const deleteGroupName = (data, name) => {
//     console.log(data)
//     return data.filter(row => row.groupName != name)
// }

// module.exports = {
//     "contactNumByGroupName": contactNumByGroupName,
//     "deleteGroupName": deleteGroupName
// }