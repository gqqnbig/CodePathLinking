SetWorkingDir %A_ScriptDir%

filePath=%1%
filePath:=SubStr(filePath,4)
p:=InStr(filePath,":",false,3)
if(p>0)
{
	keyword:=SubStr(filePath,p+1)
	filePath:=SubStr(filePath,1,p-1)
	run WScript.exe open-in-msvs.vbs %filePath% %keyword%
}
else
	run WScript.exe open-in-msvs.vbs %filePath%

exit
