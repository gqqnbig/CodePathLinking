

chrome.devtools.panels.elements.createSidebarPane("Source Code Path",
    function (sidebar)
    {
        // sidebar initialization code here
        function updateElementProperties()
        {
            sidebar.setPage("pane.html");
        }

        updateElementProperties();
        chrome.devtools.panels.elements.onSelectionChanged.addListener(updateElementProperties);
    }
);