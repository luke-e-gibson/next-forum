const name = "Lego Hello World";

console.log(name);


const name2 = name.replace(new RegExp(/\s+/g), "-");
const name3 = name2.toLowerCase()

console.log(name3);