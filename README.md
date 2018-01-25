
# Install #
This repository is a Chrome extension. Open Chrome extensions page, click `Load unpacked extension`, and load this folder.

Edit `register protocol.reg`, and change the path of Visual Studio to yours.

# Use

Open http://loanspq.localhost/Consumer/v2/Login/Landing.aspx?LenderID=c3367241559b439380a68f6f87851525 on Chrome, open Developer Tool, on `Elements` tab you are expected to see `Source Code Path` panel on the right hand side.
Inspect an element, the `Source Code Path` will show the path where the element is defined in the ASP.NET source code.
Then click the path link, Visual Studio will open the file and locate the line where the element is defined.

# Troubleshoot

If Source Code Path cannot find paths at all, check the source code of the target web page, and see if 

```
<script id="codeMapElement">
    var codeMap={};
    ...
</script>
```
exists.

If Source Code Path can find user control path, but not page path or master page path, go to CGlobalPage.vb, paste the following code.

```
Private Sub CGlobalUserControl_Load(sender As Object, e As EventArgs) Handles Me.Load
	If ConfigurationManager.AppSettings("UseCodeMap") = "Y" AndAlso Request.QueryString("UseCodeMap") <> "N" OrElse
		ConfigurationManager.AppSettings("UseCodeMap") = "" AndAlso Request.QueryString("UseCodeMap") = "Y" Then
		Dim ip = WebsiteLibrary.CIPSecurityChecker.getBrowserIP(Request)
		If LoansPQBO.Security.CIPUtils.CreateInstance().IsInternalIp(ip) AndAlso ConfigurationManager.AppSettings("UseCodeMap") <> "N" Then
			If AppRelativeVirtualPath <> "" Then 'Some user controls are defined in a library. In this case AppRelativeVirtualPath is empty.
				AddHandler Page.LoadComplete, AddressOf CreateCodeMapElement

				'Don't have to save the data to view state, and don't output if the control is not visible.
				AddHandler Page.SaveStateComplete, AddressOf AddCodeMapItem
				AddHandler Page.SaveStateComplete, Sub()
													   If Form IsNot Nothing Then
														   Form.Attributes("data-environment") = RuntimeEnvironment.ToString()
													   End If
												   End Sub
			End If
		End If
	End If
End Sub

Sub CreateCodeMapElement(sender As Object, e As EventArgs)
	Try
		Dim codeMapElement = Page.Header.FindControl_(Of HtmlControls.HtmlGenericControl)("codeMapElement")
		If codeMapElement Is Nothing Then
			codeMapElement = New HtmlControls.HtmlGenericControl("script")
			codeMapElement.ID = "codeMapElement"
			codeMapElement.InnerHtml = "var codeMap={};"
			Page.Header.Controls.Add(codeMapElement)
		End If
	Catch ex As Exception
		StdLib.CAssert.FailGracefully("Error in inserting code map element.", ex)
	End Try
End Sub

Sub AddCodeMapItem(sender As Object, e As EventArgs)
	'The Page property becomes nothing if the control is removed by Controls.Clear().
	If Page Is Nothing OrElse Visible = False Then
		Return
	End If
	Dim codeMapElement = Page.Header.FindControl_(Of HtmlControls.HtmlGenericControl)("codeMapElement")
	If codeMapElement IsNot Nothing Then
		codeMapElement.InnerHtml += vbCrLf & "codeMap[""{0}""]=""{1}"";".Format_(Me.ClientID, Web.HttpUtility.JavaScriptStringEncode(Server.MapPath(AppRelativeVirtualPath)))

		If Page.MasterPageFile <> "" Then
			codeMapElement.InnerHtml += vbCrLf & "codeMap[""{0}""]=""{1}"";".Format_("__Master", Web.HttpUtility.JavaScriptStringEncode(Server.MapPath(Page.MasterPageFile)))
		End If
	End If
End Sub
```



