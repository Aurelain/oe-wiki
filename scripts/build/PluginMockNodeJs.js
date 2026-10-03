// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================

const PluginMockNodeJs = {
    name: 'mock-node-builtins',
    setup(build) {
        // 1. Match any import path starting with "node:"
        build.onResolve({filter: /^node:/}, (args) => ({
            path: args.path,
            namespace: 'mock-node-ns',
        }));

        // 2. Supply a generic proxy/stub for the intercepted modules
        build.onLoad({filter: /.*/, namespace: 'mock-node-ns'}, (args) => {
            return {
                contents: `
const silentStub = new Proxy(() => {}, {
    get: () => silentStub,
    apply: () => silentStub,
});
export default silentStub;
        `,
                loader: 'js',
            };
        });
    },
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default PluginMockNodeJs;
