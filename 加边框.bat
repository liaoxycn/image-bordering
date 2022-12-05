@echo off
rem 获取bat本身文件名
echo %0
rem 获取外部第一个参数
echo %1
rem 获取外部第二个参数
echo %2
rem 路径改为当前项目的绝对路径
node "D:\Projects\2022-11\image-bordering\index.js" %1 %2 %3 %4 %5 %6 %7 %8 %9
rem Pause