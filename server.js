import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';
import ip from 'ip';
import colors from 'colors';
//import routes from './src/routes/index.js'
const port = '3008'

const app = express();
const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
    contentBase: 'dist/',
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
    }
});
app.use(middleware);
app.use(webpackHotMiddleware(compiler));
//app.use('/', routes);
app.get('*', function response(req, res) {
    //if no favicon
    if (req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'images/x-icon'});
        res.end();
        return;
    }
    if (req.url.indexOf('service')>=0){
        return;
    }
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'build/index.html')));
    res.end();
});

app.listen(port, ip.address(), function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('==> 🌎 Listening on  ' + (ip.address() + ':3008').blue);
});
