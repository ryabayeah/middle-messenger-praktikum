import {JSDOM} from 'jsdom';

const jsdom = new JSDOM('<body></body>', { url: 'https://localhost:3000/' });

globalThis.window = jsdom.window;
globalThis.document = jsdom.window.document;
globalThis.Node = jsdom.window.Node;
globalThis.MouseEvent = jsdom.window.MouseEvent;
