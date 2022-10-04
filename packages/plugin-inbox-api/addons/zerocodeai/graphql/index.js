const queries = require('./queries');
const mutations = require('./mutations');

module.exports = {
    typeDefs: {
        custom: `
            type ZeroCodeAIConfig {
                apiKey: String
            }
        `,
        queries: `
            inboxZerocodeConfig: ZeroCodeAIConfig
        `,
        mutations: `
            inboxZerocodeAISaveConfig(apiKey: String): ZeroCodeAIConfig
        `,
    },
    resolvers: {
        Query: {
            ...queries.default
        },
        Mutation: {
            ...mutations.default
        }
    }
}