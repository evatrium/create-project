const rl = require('readline');
const exec = require('child_process').exec;
const prompts = rl.createInterface(process.stdin, process.stdout);

const q = (msg) => {
    return new Promise((resolve, reject) => {
        prompts.question(msg, (response) => {
            resolve(response)
        });
    });
};

const ex = (cmd) => {
    return new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            resolve({ok: !err, data: stdout, error: stderr});
        });
    });
};

const validVersion = {
    patch: 'patch',
    minor: 'minor',
    major: 'major'
};

export const quickie = () => {
    let commit_msg;
    let version;

    q('message for git commit: ')
        .then((msg) => {

            commit_msg = msg ? msg : "quick fix";

            if (!msg) {
                console.log('no message. will input "quick fix"');
            }

            return q('add npm version bump: ');
        })
        .then((msg) => {
            if (!validVersion[msg]) {
                console.log(`${msg} is not a valid version. will use "patch"`);
                version = 'patch';
            } else {
                version = validVersion[msg];
            }
            return ex('yarn build')
        })
        .then((log) => {
            if(!log.ok){
                console.log('error running build');
                console.error(log.error);
                process.exit();
            }
            console.log('build finished');
            console.log('git adding');
            return ex('git add .')
        })
        .then((log) => {
            return ex('git commit -m "' + commit_msg + '"');
        })
        .then((log) => {
            console.log('git committed');
            return ex('npm version ' + version);
        })
        .then((log) => {
            console.log(`${log.data}`);
            console.log('publishing to npm');
            return ex('npm publish');
        })
        .then((log) => {
            console.log('published');
            console.log('pushing to git');
            return ex('git push origin master');
        })
        .then((log) => {
            console.log('done');
            process.exit()
        })
        .catch((...args)=>{
            console.error(...args);
            process.exit();
        });
};
