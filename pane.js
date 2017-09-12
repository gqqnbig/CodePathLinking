const pageLink = document.getElementById("pageLink");
const masterLink = document.getElementById("masterLink");
const controlLabel = document.getElementById("controlLabel")
const controlLink = document.getElementById("controlLink");

function inferOriginalId(clientID)
{
	const ids = clientID.split("_");
	for (var i = ids.length-1; i >=0; i--)
	{
		if (/\d+/.test(ids[i]) === false)
			return ids[i];
	}
	return undefined;
}

function onSelectionChanged()
{
	chrome.devtools.inspectedWindow.eval("(" + getSourcePath + ")()", function (result, exceptionInfo)
	{
        pageLink.innerText = result.pagePath;
        pageLink.href = "vs:" + result.pagePath;

        masterLink.innerText = result.masterPath;
        masterLink.href = "vs:" + result.masterPath;

        controlLabel.innerText = result.control.element;
        if (result.control.path)
        {
            controlLink.innerText = result.control.path;
            controlLink.href = "vs:" + result.control.path + ":" + inferOriginalId(result.control.element);
        }
        else
        {
            controlLink.innerText = "Path not available";
            controlLink.removeAttribute("href");
        }
	});
}

onSelectionChanged();

chrome.devtools.panels.elements.onSelectionChanged.addListener(onSelectionChanged);
