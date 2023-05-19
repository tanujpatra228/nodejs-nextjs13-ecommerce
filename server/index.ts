import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
const app = express();
const cors = require('cors');
import * as dotenv from 'dotenv'
dotenv.config();
const PORT = 3001;
const Sentry = require("@sentry/node");

Sentry.init({
    dsn: "https://77dbc7f241364458aa506c0f545fea67@o4505165454245888.ingest.sentry.io/4505187506257920",
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        // new Tracing.Integrations.Express({ app }),
        // Automatically instrument Node.js libraries and frameworks
        ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context, so that all
// transactions/spans/breadcrumbs are isolated across requests
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
// app.use(Sentry.Handlers.tracingHandler());

app.use(cors());
app.use(express.json());

const productRoutes = require('./routes/products.ts');
const categoriesRoutes = require('./routes/categories.ts');

app.use('/products', productRoutes);
app.use('/categories', categoriesRoutes);

// DB Connection
mongoose.connect(process.env.MONGODB_URI ?? "", { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions).then(() => {
    console.log('connected with database');
}).catch((err: Error) => {
    console.log('error', err.message);
});

app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`);
});