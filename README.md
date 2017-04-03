# h5-replace-phone-numbers
A simple JavaScript function for replacing phone numbers on web pages according to a parameter specified in the page URL.

The purpose of this tool is to provide a way for pages linking to a site to determine which phone numbers will appear on the site once it loads. This is motivated by High Five's need to provide clients with a way to observe AdWords performance by using different call-tracking numbers for different campaigns. This tool will also modify all non-phone-number links in the page to include the source parameter at the end so that the behavior persists as a user navigates the site.

## Usage
Make sure jQuery is included in the page. This tool also depends on the `getParameterByName` function at the top of script.js. Execute by invoking `replacePhoneNumbers` and passing in the appropriate options.

### The URL 'source' parameter.
Example: thisisafakeurl.com/page1?source=mysource
The source parameter determines which phone number will be used to replace the old.

### options
`oldNumbers` : An array of phone numbers to be replaced.
`newNumbers` : An object whose properties are the new phone numbers, indexed by the URL parameter they correspond to.
`hrefOnly` : Boolean. If true, only the link destinations will be changed. Else, the text will be replaced as well.

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
    }
});
```

In the example, if the page loads with "?source=aw" at the end of the URL, then all 'a' elements with the 'href=tel:18002735546' attribute will have that attribute replaced with 'href=tel:1234567890'.