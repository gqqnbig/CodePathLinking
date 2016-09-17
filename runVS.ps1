$file=$Args[0];
$file=$file.SubString(3,$file.Length-3);
& "C:\Program Files (x86)\Microsoft Visual Studio 14.0\Common7\IDE\devenv.exe" /edit $file
