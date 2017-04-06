//Get param from URL
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function replacePhoneNumbers(options) {
    var source = getParameterByName("source"),
        selector = "",
        oldNumbers = options.oldNumbers,
        newNumber = options.newNumbers[source],
        numberLinks,
        otherLinks;

    if(!source) {
        console.error("replacePhoneNumbers was called, but no source param was found.");
        return;
    }

    if(!jQuery) {
        console.error("replacePhoneNumbers was called, but jQuery was not found.");
        return;
    }

    // append source to all links besides those marked permitted
    selector = "a";
    options.permittedHrefs.forEach(function(href) {
        selector += "[href!='" + href + "']";
    });
    $(selector).each(function() {
        if($(this).length == 0 || $(this).attr('href').endsWith("?source=" + source)) {
            return;
        }
        $(this).attr('href', $(this).attr('href') + "?source=" + source);
    });

    // get the phone number 'a' elements
    selector = "";
    oldNumbers.forEach(function(oldNumber, index, array) {
        selector += "a[href='tel:" + oldNumber + "']" + (index < array.length - 1 ? ", " : "");
    });
    numberLinks = $(selector);

    // replace the destination numbers
    numberLinks.each(function() {
        $(this).attr('href', 'tel:' + newNumber.replace(/\s |(|)/g, "").replace(/-/g, ""));
    });

    // unless otherwise specified, replace the phone number text as well
    if(!options.hrefOnly) {
        numberLinks.each(function() {
            $(this).text(newNumber);
        });
    }
}