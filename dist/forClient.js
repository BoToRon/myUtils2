let _;
_;
import { zValidVariants } from './constants.js';
_;
import { colorLog, errorLog, getUniqueId, mapObject, removeItem, stringify, successLog, zodCheck_curry } from './index.js';
_;
_;
/**Log every socket.io event with the data received for debugging purposes */
export function clientSocketLongOnAny(useStore) {
    useStore().socket.onAny((eventName, ...args) => {
        const eventInfo = { event: eventName, timestamp: Date.now(), data: args };
        colorLog('red', stringify(eventInfo));
        useStore().socketEvents.unshift(eventInfo);
    });
}
/**Copy to clipboard, objects arrays get stringify'd */
export function copyToClipboard_client(x) {
    const text = stringify(x);
    const a = document.createElement('textarea');
    a.innerHTML = text;
    document.body.appendChild(a);
    a.select();
    document.execCommand('copy');
    document.body.removeChild(a);
}
/**Stringifies and downloads the provided data*/
export function downloadFile_client(filename, fileFormat, data) {
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([data], { type: 'text/plain' }));
    a.download = `${filename}${fileFormat}`;
    a.click();
}
/**(generates a function that..) Creates a new 5-seconds toast in the lower right corner */
export function newToast_client_curry($bvToast) {
    return function body(title, message, variant) {
        if (!zodCheck_curry(alert, true)(zValidVariants, variant)) {
            return;
        }
        $bvToast.toast(message, {
            toaster: 'b-toaster-bottom-right',
            autoHideDelay: 5000,
            solid: true,
            variant,
            title
        });
    };
}
/**Add/remove a vue component to the window for easy access/debugging */
export function trackVueComponent(name, component, window) {
    component.name = name;
    component.id = getUniqueId(name);
    component.beforeDestroy = onDestroy;
    if (!window.vueComponents) {
        window.vueComponents = {};
    }
    if (!window.vueComponents[name]) {
        window.vueComponents[name] = [];
    }
    successLog(`Component '${name}' added to window.vueComponents [${window.vueComponents[name].length}]`);
    window.vueComponents[name].push(component);
    logAllComponents();
    function logAllComponents() {
        colorLog('blue', `window.vueComponents: ${stringify(mapObject(window.vueComponents, value => value.length))}`);
    }
    function onDestroy() {
        errorLog(`Component '${name}' (id: ${component.id}) removed from window.vueComponents`);
        removeItem(window.vueComponents[name], component);
        logAllComponents();
    }
}
