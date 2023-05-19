const Sentry = require('@sentry/node');

const initSentry = () => {
    Sentry.init({
        dsn: "https://7408ca6c8863436ebc2a166f9b088972@o4505165454245888.ingest.sentry.io/4505187483779072",

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });

    const transaction = Sentry.startTransaction({
        op: "test",
        name: "My First Test Transaction",
    });

    setTimeout(() => {
        try {
            foo();
        } catch (e) {
            Sentry.captureException(e);
        } finally {
            transaction.finish();
        }
    }, 99);
}

module.exports = { initSentry }