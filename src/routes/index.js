import express  from 'express';
import {jsdom,serializeDocument } from 'jsdom';
import Root from '../container/root';
import Layout from '../components/layout';
import Test from '../components/test';
import Root from '../container/root';
delete process.env.BROWSER;
import {createElement,initVnode} from '../utils/react';
let router = express.Router();

router.get('/service', function (req, res, next) {
    var testVnode = createElement(Root);
    var testNode = initVnode(testVnode);
    let document = jsdom("<html><body><div id='root'></div></body></html>");
    document.getElementById('root').appendChild(testNode);
    res.send(serializeDocument(document));
});

export default router;