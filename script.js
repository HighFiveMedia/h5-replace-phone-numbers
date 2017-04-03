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

    if(!source)
        return;

    if(!jQuery) {
        throw "Error: jQuery missing";
    }

    // get the phone number 'a' elements
    oldNumbers.forEach(function(oldNumber, index, array) {
        selector += "a[href='tel:" + oldNumber + "']" + (index < array.length - 1 ? ", " : "");
    });
    numberLinks = $(selector);

    // get the non phone number 'a' elements
    selector = "a";
    oldNumbers.forEach(function() {
        selector += "[href!='tel:" + oldNumber + "']";
    });
    otherLinks = $(selector);

    // replace the destination numbers
    numberLinks.each(function() {
        $(this).attr('href', 'tel:' + newNumber.replace(/\s |(|)|-/g, ""));
    });

    // if specified, replace the phone number text as well
    if(!options.hrefOnly) {
        numberLinks.each(function() {
            $(this).text(newNumber);
        });
    }

    // append source to all other links
    otherLinks.each(function() {
        $(this).attr('href', $(this).attr('href') + "?source=" + source);
    });
}