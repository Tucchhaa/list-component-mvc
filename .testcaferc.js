module.exports = {
    hostname: "localhost",
    port1: 1337,
    port2: 1338,
    
    browsers: "chrome",
    src: ["./testcafe", "!./testcafe/test.ts"],
    speed: 0.5,

    compilerOptions: {
        typescript: {
            configPath: "tsconfig.testcafe.json"
        }
    }
}