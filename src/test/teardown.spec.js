import cmd from 'node-cmd';

after('DROP [DATABASE]', (done) => {
    console.log('RUNNING MIGRATIONS [' + process.env.NODE_ENV + '] DOWN');
    cmd.get('npm run migrate:down', (err, data, stderr) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        console.log(data)
        console.log('MIGRATIONS COMPLETE: DOWN');
        done();
    });
});
