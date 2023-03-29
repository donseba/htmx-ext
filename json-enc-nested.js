htmx.defineExtension('json-enc-nested', {
    onEvent: function (name, evt) {
        if (name === "htmx:configRequest") {
            evt.detail.headers['Content-Type'] = "application/json";
        }
    },
    encodeParameters: function(xhr, parameters, elt) {
        if (elt.tagName.toLowerCase() !== 'form') {
            return;
        }

        const formData = new FormData(elt);
        const serializedData = {};

        for (let [name, value] of formData) {
            const keys = name.split(/[.[\]]+/).filter(Boolean); // split by dot or bracket notation
            let obj = serializedData;

            for (let i = 0; i < keys.length - 1; i++) {
                if (!obj[keys[i]]) {
                    obj[keys[i]] = /^\d+$/.test(keys[i+1]) ? [] : {}; // create an array if the next key is an index
                }
                obj = obj[keys[i]];
            }

            const lastKey = keys[keys.length - 1];
            if (lastKey in obj && Array.isArray(obj[lastKey])) {
                obj[lastKey].push(value); // add to array if the key already exists
            } else {
                obj[lastKey] = value; // set value for key
            }
        }

        xhr.setRequestHeader('Content-Type', 'application/json');
        return JSON.stringify(serializedData);
    }
});