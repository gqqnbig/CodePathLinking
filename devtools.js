function getSourcePath() //The javascript is executed in the inspected page.
{
    function getClosestID(element)
    {
        var currentElement = element;
        while (currentElement && !currentElement.id)
        {
            currentElement = currentElement.parentNode;
        }

        if (!currentElement)
            return "";

        return currentElement.id;
    }

    var closestID = getClosestID($0);
    if (!closestID)
        closestID = "__Page";

    var longestMatchCount = 0;
    var sourcePath = "";
    for (var propertyName in codeMap)
    {
        if (closestID.startsWith(propertyName) && propertyName.length > longestMatchCount)
        {
            longestMatchCount = propertyName.length;
            sourcePath = codeMap[propertyName];
        }
    }

    if (!sourcePath)
        return closestID + ": Path not available";
    else
        return sourcePath;
}


chrome.devtools.panels.elements.createSidebarPane("Source Code Path",
    function (sidebar)
    {
        // sidebar initialization code here
        function updateElementProperties()
        {
            //setExpression displays DOM elements and JavaScript objects. Note: not everything is object, eg. the numbers.
            //sidebar.setExpression("(" + page_getProperties.toString() + ")()","Hello world");
            //sidebar.setExpression("(" + page_getProperties.toString() + ")()");
            chrome.devtools.inspectedWindow.eval("(" + getSourcePath + ")()", function (result, exceptionInfo)
            {
                sidebar.setPage("pane.html?t=" + encodeURI(result));
            });
        }

        updateElementProperties();
        chrome.devtools.panels.elements.onSelectionChanged.addListener(updateElementProperties);
    }
);