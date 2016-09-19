//The javascript is executed in the inspected page.
function getSourcePath()
{
    function getClosestID(element)
    {
        let currentElement = element;
        while (currentElement && !currentElement.id)
        {
            currentElement = currentElement.parentNode;
        }

        if (!currentElement)
            return "";

        return currentElement.id;
    }

    let closestID = getClosestID($0);
    if (!closestID)
        closestID = "__Page";

    let longestMatchCount = 0;
    let sourcePath = "";
    for (let propertyName in codeMap)
    {
        if (closestID.startsWith(propertyName) && propertyName.length > longestMatchCount)
        {
            longestMatchCount = propertyName.length;
            sourcePath = codeMap[propertyName];
        }
    }

    const pagePath = codeMap["__Page"];
    const masterPath = codeMap["__Master"];

    let controlObj;

    if (!sourcePath)
        controlObj = { element: closestID };
    else
        controlObj = { element: closestID, path: sourcePath };

    return {
        pagePath,
        masterPath,
        control: controlObj
    };
}