console.log("welcome to node series");
const fs = require("fs");
// fs.writeFileSync("order.txt", "your order is placed Successfully");


let fv = fs.readFileSync("order.txt");
fv = fv.toString();
console.log(fv);

//  os module
const os = require("os");

const os1 = os.userInfo();
console.log(os1);

//  path module

console.log("............start path module............\n");

const path = require("path");

const path1 = path.dirname(
  "E:/Developers/Source Tree Projects/Node Development/node1/index.js"
);
console.log("path1", path1);

// user defined module

console.log("............start user defined module............\n");
const add = require("./add");

console.log("add", add.name);
