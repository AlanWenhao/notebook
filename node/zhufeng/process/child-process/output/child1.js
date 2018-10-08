process.argv.slice(2).forEach(item => {
    process.stdout.write(item);
});

process.stdout.write('end');
