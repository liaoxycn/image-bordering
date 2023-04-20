@echo off
rem 获取bat本身文件名
echo %0
rem 获取外部第一个参数
echo %1
rem 路径改为当前项目的绝对路径
set script=%0
set script=%script:\Windows\add.bat=\index.js%
echo %script%
node %script% %1 %2 %3 %4 %5 %6 %7 %8 %9
rem Pause