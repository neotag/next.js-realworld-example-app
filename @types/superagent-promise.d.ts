declare module 'superagent-promise' {
    function superagentPromise(superagent: superagent, promise: promise): SuperAgent;
    export = superagentPromise;
}

interface SuperAgent {
    del(url: string): Promise<{ use(): await }>;
    get(url: string): Promise<{}>;
    put(url: string, body: {}): Promise<{}>;
    post(url: string, body: {}): Promise<{}>;
}
