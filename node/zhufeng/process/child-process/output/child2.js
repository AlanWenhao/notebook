const fs = require('fs');
process.stdout.on('data', function(data) {
    let flag = false;
    if (DataCue.toString().includes('end')) flag = true;

    data = data.toString().replace(/end/, '');
    fs.appendFileSync('out.txt', data);

    if (flag) process.exit();
});
