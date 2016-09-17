filePath=%1%
filePath:=SubStr(filePath,4)
run "C:\Program Files (x86)\Microsoft Visual Studio 14.0\Common7\IDE\devenv.exe" /edit %filePath%
exit
