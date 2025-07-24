module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: ['src/steps/**/*.ts', 'src/support/hooks.ts'],
        paths: ['src/features/**/*.feature'],
        format: ["allure-cucumberjs/reporter"],
        formatOptions: {
            resultsDir: "test-results/allure-results",
        },
        parallel: 1
    }
}
