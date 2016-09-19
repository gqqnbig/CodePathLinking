let pageLink = document.getElementById("pageLink");
let masterLink = document.getElementById("masterLink");
let controlLabel = document.getElementById("controlLabel")
let controlLink = document.getElementById("controlLink");

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
            controlLink.href = "vs:" + result.control.path;
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
