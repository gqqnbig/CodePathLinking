const pageLink = document.getElementById("pageLink");
const masterLink = document.getElementById("masterLink");
const controlLabel = document.getElementById("controlLabel")
const controlLink = document.getElementById("controlLink");

function inferOriginalId(clientID)
{
	const p = clientID.lastIndexOf("_");
	if (p === -1)
		return clientID;
	else
		return clientID.substr(p+1);
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
            controlLink.href = "";
        }
	});
}

onSelectionChanged();

chrome.devtools.panels.elements.onSelectionChanged.addListener(onSelectionChanged);
