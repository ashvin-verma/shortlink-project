const fs = require('fs')

fs.readFile('shortlinks.json', function(err, data) {
  if (err) {
    console.log(err)
  }
  var stringo = data.toString()
  var oba = JSON.parse(stringo)
  for (i in oba['shortlinks']) {
    console.log(i)
    console.log(oba['shortlinks'][i])
  }
})
