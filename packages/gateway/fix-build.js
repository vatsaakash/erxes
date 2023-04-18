var deps = require("../package.json");
var fs = require("fs");
var path = require("path");

async function main() {
  console.log('done')
}

main()
  .then(() => {
    process.exit();
  })
  .catch((e) => {});
