module.exports = {
    hostname: "localhost",
    port1: 1337,
    port2: 1338,
    
    browsers: "chrome",
    src: "./testcafe",

    compilerOptions: {
        typescript: {
            configPath: "tsconfig.testcafe.json"
        }
    }
}