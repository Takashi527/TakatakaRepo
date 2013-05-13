@echo off
rem 
rem 実行フォルダへログコピー
rem 

set targetdir=sample

set tmpFolder=%date:~-10,4%%date:~-5,2%%date:~-2,2%
echo %tmpFolder%

del /S /Q .\%tmpFolder%.zip
rmdir /s /q .\%tmpFolder%
mkdir %tmpFolder%

cd .\%tmpFolder%

set copyLogFolder=.\%targetdir%
set traceHisLog=%copyLogFolder%trace.log.%date:~-10,4%%date:~-5,2%*
set errorHisLog=%copyLogFolder%error.log.%date:~-10,4%%date:~-5,2%*

copy /A /Y "%copyLogFolder%trace.log" ".\"
copy /A /Y "%traceHisLog%" ".\"

copy /A /Y "%copyLogFolder%error.log" ".\"
copy /A /Y "%errorHisLog%" ".\"

cd ..

.\7-Zip\7z.exe a .\%tmpFolder%.zip .\%tmpFolder%

rmdir /s /q .\%tmpFolder%

@echo on

echo 処理完了

pause;