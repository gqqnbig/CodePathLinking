//The javascript is executed in the inspected page.
function getSourcePath()
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
        return { element: closestID, path: "Path not available" };
    else
        return { element: closestID, path: sourcePath };
}