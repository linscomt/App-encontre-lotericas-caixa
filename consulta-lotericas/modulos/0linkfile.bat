@echo off

set DESTINO=D:\xampp\htdocs-hostnames\puppeteer_nodejs\ProjetosApp\linscomt\App-encontre-lotericas-caixa\consulta-lotericas\modulos
CD %DESTINO%

REM ....TS....

REM - appPU -- Add Jlink 
REM mklink /j "%DESTINO%\appPU\" "D:\xampp\htdocs-hostnames\puppeteer_nodejs\0ModuloPuppeteer\mdofc\"
REM pause

REM - appPU -- Add Hlink 
MD "%DESTINO%\appPU"
mklink /h "%DESTINO%\appPU\f.puppeteer.ts" "D:\xampp\htdocs-hostnames\puppeteer_nodejs\0ModuloPuppeteer\mdofc\f.puppeteer.ts"
pause


REM -- appMod --
MD "%DESTINO%\appMod"
mklink /h "%DESTINO%\appMod\DateZoneFunc.ts"     "D:\xampp\htdocs-hostnames\nodejs\MyModulos\ts\appMod\DateZoneFunc.ts"
mklink /h "%DESTINO%\appMod\f.to.app.ts"         "D:\xampp\htdocs-hostnames\nodejs\MyModulos\ts\appMod\f.to.app.ts"
mklink /h "%DESTINO%\appMod\f.validate.ts"       "D:\xampp\htdocs-hostnames\nodejs\MyModulos\ts\appMod\f.validate.ts"
mklink /h "%DESTINO%\appMod\looger.out.ts"       "D:\xampp\htdocs-hostnames\nodejs\MyModulos\ts\appMod\looger.out.ts"
mklink /h "%DESTINO%\appMod\pega_data.ts"        "D:\xampp\htdocs-hostnames\nodejs\MyModulos\ts\appMod\pega_data.ts"
mklink /h "%DESTINO%\appMod\readfile.ts"         "D:\xampp\htdocs-hostnames\nodejs\MyModulos\ts\appMod\readfile.ts"
mklink /h "%DESTINO%\appMod\UserAgent.to.app.ts" "D:\xampp\htdocs-hostnames\nodejs\MyModulos\ts\appMod\UserAgent.to.app.ts"
mklink /h "%DESTINO%\appMod\writefile.ts"        "D:\xampp\htdocs-hostnames\nodejs\MyModulos\ts\appMod\writefile.ts"
pause


REM -- appReq
mklink /j "%DESTINO%\appReq" "D:\xampp\htdocs-hostnames\nodejs\MyModulos\ts\appReq"
pause


REM REM -- appApiProxy
REM mklink /j "%DESTINO%\appApiProxy" "D:\xampp\htdocs-hostnames\nodejs\MyModulos\ts\appApiProxy"
pause