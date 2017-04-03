# h5-replace-phone-numbers
A simple JavaScript function for replacing phone numbers on web pages according to a parameter specified in the page URL.

The purpose of this tool is to provide a way for pages linking to a site to determine which phone numbers will appear on the site once it loads. This is motivated by High Five's need to provide clients with a way to observe AdWords performance by using different call-tracking numbers for different campaigns. This tool can also modify all non-phone-number links in the page by appending the source parameter so that the behavior can persist as a user navigates the site (the tool will then have to be included on those pages as well).

## Usage
Make sure jQuery is included in the page. This tool also depends on the `getParameterByName` function at the top of script.js. Execute by invoking `replacePhoneNumbers` and passing in the appropriate options.

### The URL 'source' parameter
Example: thisisafakeurl.com/page1?source=mysource

The function looks at the URL 'source' parameter to determine which phone number to use to replace the old ones. This means that the links on the source page must have the "?source=x" appended to them in order to cause the loaded page to display the phone numbers associated with "x". An AdWords text ad is an example of a source.

### options
`oldNumbers` : An array of phone numbers to be replaced.

`newNumbers` : An object whose properties are the new phone numbers, indexed by the URL parameter they correspond to.

`hrefOnly` : Boolean. If true, only the link destinations will be changed. Else, the text will be replaced as well. Defaults to true.

`cascadeSourceParam`: Boolean. If true, non-phone-number links on the page will have "?source=" appended to them, followed by the name of the current source. Defaults to false.

### Example
```
// here's an example of usage
replacePhoneNumbers({
    hrefOnly: true,
    oldNumbers: ["18002735546"],
    newNumbers: {
        aw: "1234567890", // AdWords OKC
        awt: "000000000", // AdWords Tulsa
        tf: "111111111" // Toll Free
    },
    cascadeSourceParam: true
});
```

In the example, if the page loads with "?source=aw" at the end of the URL, then all `<a>` elements with the `href='tel:18002735546'` attribute will have that attribute replaced with `href='tel:1234567890'`. The displayed nummbers will not change. Other links on the page will have "?source=aw" appended to them.

## TODO
- With `cascadeSourceParam` set to true, prevent situations where the parameters might stack. ie fakeurl.com/?source=aw?source=aw
- Provide a way for certain elements to be exempt from modification. Maybe a class attribute?: 'h5-phone-exempt'