// spawn a child process and execute shell command
// borrowed from https://github.com/mout/mout/ build script
// author Miller Medeiros
// released under MIT License
// version: 0.1.0 (2013/02/01)


// execute a single shell command where "cmd" is a string
exports.exec = function(cmd, cb){
    // this would be way easier on a shell/bash script :P
    var spawn = require('cross-spawn');

    var parts = [].concat.apply([], cmd.split('"').map(function(v,i){
        return i%2 ? '"'+v+'"' : v.split(' ')
    })).filter(Boolean);

    var p = spawn(parts[0], parts.slice(1), {cwd:process.cwd(),stdio: 'inherit'});

    p.on('exit', function(code){
        var err = null;
        if (code) {
            err = new Error('command "'+ cmd +'" exited with wrong status code "'+ code +'"');
            err.code = code;
            err.cmd = cmd;
        }
        if (cb) cb(err);
    });
};


// execute multiple commands in series
// this could be replaced by any flow control lib
exports.series = function(cmds, cb){
    let execNext = function(){

        let cmd = cmds.shift();
        let doneMessage;
        if(Array.isArray(cmd))
        {
            cmd = cmd[0];
            doneMessage = cmd[1];
        }
        exports.exec(cmd, function(err){
            if (err) {
                cb(err);
            } else {
                if(doneMessage) console.log(doneMessage);
                if (cmds.length) {
                    execNext();
                }
                else{
                    cb(null);
                }
            }
        });
    };
    execNext();
};

exports.callTasksInSeries = function(tasks,cb)
{
    var callNext = function(){

        var task = tasks.shift();

        if(task.fn)
        {
            if(!task.args)
                task.args = [];

            task.args.unshift(taskDone);
            task.fn.apply(null,task.args);

            function taskDone(err){
                if(err)
                {
                    cb(err)
                }
                else
                {
                    if(tasks.length) callNext();
                    else cb(null);
                }
            }
        }
        else
        {
            if(tasks.length) callNext();
            else cb(null);

        }

    };

    callNext();
};



exports.finishTask = function finishTask(cb,error,doExitOnNoCallBack)
{
    if(cb)
    {
        cb(error)
    }
    else
    {
        if(error)
        {
            console.log(error);

        }

        if(doExitOnNoCallBack)
        {
            if(error)
                process.exit(1);
            else
                process.exit(0);
        }
    }
};