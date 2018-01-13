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
        const originalId = inferOriginalId(result.control.element);

        pageLink.innerText = result.pagePath;
        pageLink.href = "vs:" + result.pagePath + (originalId ? ":" + originalId : "");

        masterLink.innerText = result.masterPath;
        masterLink.href = "vs:" + result.masterPath + (originalId ? ":" + originalId : "");

        controlLabel.innerText = result.control.element;
        if (result.control.path)
        {
            controlLink.innerText = result.control.path;
            controlLink.href = "vs:" + result.control.path + (originalId ? ":" + originalId : "");
        }
        else
        {
            controlLink.innerText = "Not in user control";
            controlLink.removeAttribute("href");
        }
    });
}

onSelectionChanged();

chrome.devtools.panels.elements.onSelectionChanged.addListener(onSelectionChanged);
