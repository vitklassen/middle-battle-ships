"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const vite_1 = require("vite");
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const isDev = process.env.NODE_ENV === 'development';
async function startServer() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    const port = Number(process.env.SERVER_PORT) || 3001;
    const distPath = path_1.default.dirname(require.resolve('client/dist/index.html'));
    const srcPath = path_1.default.dirname(require.resolve('client'));
    const ssrClientPath = require.resolve('client/ssr-dist/client.js');
    const vite = await (0, vite_1.createServer)({
        server: { middlewareMode: true },
        appType: 'custom',
    });
    app.use(vite.middlewares);
    app.get('/api', (_, res) => {
        res.json('👋 Howdy from the server :)');
    });
    if (!isDev) {
        app.use('/assets', express_1.default.static(path_1.default.resolve(distPath)));
    }
    app.use('*', async (req, res, next) => {
        const url = req.originalUrl;
        try {
            let template;
            if (!isDev) {
                template = fs_1.default.readFileSync(path_1.default.resolve(distPath, 'index.html'), 'utf-8');
            }
            else {
                template = fs_1.default.readFileSync(path_1.default.resolve(srcPath, 'index.html'), 'utf-8');
                template = await vite.transformIndexHtml(url, template);
            }
            const { render } = await Promise.resolve(`${ssrClientPath}`).then(s => __importStar(require(s)));
            const appHtml = await render();
            const html = template.replace('<!--ssr-outlet-->', () => appHtml);
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        }
        catch (e) {
            next(e);
        }
    });
    app.listen(port, () => {
        console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
    });
}
startServer();
//# sourceMappingURL=index.js.map