module.exports = {
    hostname: "localhost",
    port1: 1337,
    port2: 1338,
    
    browsers: "chrome:headless",
    src: ["./testcafe", "!./testcafe/test.ts"],
    speed: 1,

    compilerOptions: {
        typescript: {
            configPath: "tsconfig.testcafe.json"
        }
    }
}