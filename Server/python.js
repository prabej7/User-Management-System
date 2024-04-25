const { spawn } = require('node:child_process');

function sendDataToPython(fileName,data){
    const pythonProcess = spawn('python',[fileName,...data]);

    pythonProcess.stdout.on('data',(data)=>{
        console.log(data.toString());
    });

    pythonProcess.stderr.on('data',(data)=>{
        console.error(data.toString());
    });

    pythonProcess.on('close',(code)=>{
        console.log(`child process exited with code ${code}`);
    });

}

module.exports = sendDataToPython;
