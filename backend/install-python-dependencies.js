const { exec } = require('child_process');

exec('python3 -m pip install sys random uuid', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error installing Python dependencies: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Error: ${stderr}`);
        return;
    }
    console.log(`Output: ${stdout}`);
});
