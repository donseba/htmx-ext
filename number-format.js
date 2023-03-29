htmx.defineExtension('number-format', {
    onEvent: function (name, evt) {
        let target = evt.detail.elt;
        let number = target.getAttribute('hx-number') || undefined;
        let locale = target.getAttribute('hx-locale') || navigator.language;
        let style = target.getAttribute('hx-style') || undefined;
        let currency = target.getAttribute('hx-currency') || undefined;
        let unit = target.getAttribute('hx-unit') || undefined;

        let options = {};
        if (style) options.style = style;
        if (currency) {
            options.currency = currency;
            if (!style) options.style = 'currency';
        }
        if (unit) options.unit = unit;

        if (number && !isNaN(parseFloat(number))) {
            let formatter = new Intl.NumberFormat(locale, options);
            target.innerHTML = formatter.format(number);
        }
    },
});