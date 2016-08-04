
var textBox=document.getElementById("path");
textBox.onmouseover = function () { this.select() };
var elementLabel = document.getElementById("elementLabel")

function onSelectionChanged()
{
    chrome.devtools.inspectedWindow.eval("(" + getSourcePath + ")()", function (result, exceptionInfo)
    {
        elementLabel.innerText = result.element;
        textBox.value = result.path;
    });
}

chrome.devtools.panels.elements.onSelectionChanged.addListener(onSelectionChanged);