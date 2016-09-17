
var elementLabel = document.getElementById("elementLabel")
var pathLink = document.getElementById("pathLink");

function onSelectionChanged()
{
	chrome.devtools.inspectedWindow.eval("(" + getSourcePath + ")()", function (result, exceptionInfo)
	{
		pathLink.innerText = result.path;
		pathLink.href = "vs:" + result.path;
		elementLabel.innerText = result.element;
	});
}

onSelectionChanged();

chrome.devtools.panels.elements.onSelectionChanged.addListener(onSelectionChanged);
