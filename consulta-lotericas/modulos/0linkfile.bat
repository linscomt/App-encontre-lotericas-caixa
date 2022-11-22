@echo off

set DESTINO=D:\xampp\htdocs-hostnames\puppeteer_nodejs\ProjetosApp\linscomt\App-encontre-lotericas-caixa\consulta-lotericas\modulos
CD %DESTINO%

REM ....TS....

REM - appPU -- Add Jlink 
REM MD "%DESTINO%\appPU"
mklink /j "%DESTINO%\appPU\" "D:\xampp\htdocs-hostnames\puppeteer_nodejs\0ModuloPuppeteer\mdofc\"
pause

REM - appPU -- Add Hlink 
MD "%DESTINO%\appPU"
mklink /h "%DESTINO%\appPU\f.puppeteer.ts" "D:\xampp\htdocs-hostnames\puppeteer_nodejs\0ModuloPuppeteer\mdofc\f.puppeteer.ts"
pause

REM REM -- appApiProxy
REM mklink /j "%DESTINO%\appApiProxy" "C:\xampp\htdocs-hostnames\nodejs\MyModulos\ts\appApiProxy"

REM -- appReq
mklink /j "%DESTINO%\appReq" "C:\xampp\htdocs-hostnames\nodejs\MyModulos\ts\appReq"

REM -- appMod --
MD "%DESTINO%\appMod"
mklink /h "%DESTINO%\appMod\DateZoneFunc.ts"     "C:\xampp\htdocs-hostnames\nodejs\MyModulos\ts\appMod\DateZoneFunc.ts"
mklink /h "%DESTINO%\appMod\f.to.app.ts"         "C:\xampp\htdocs-hostnames\nodejs\MyModulos\ts\appMod\f.to.app.ts"
mklink /h "%DESTINO%\appMod\f.validate.ts"       "C:\xampp\htdocs-hostnames\nodejs\MyModulos\ts\appMod\f.validate.ts"
mklink /h "%DESTINO%\appMod\looger.out.ts"       "C:\xampp\htdocs-hostnames\nodejs\MyModulos\ts\appMod\looger.out.ts"
mklink /h "%DESTINO%\appMod\pega_data.ts"        "C:\xampp\htdocs-hostnames\nodejs\MyModulos\ts\appMod\pega_data.ts"
mklink /h "%DESTINO%\appMod\readfile.ts"         "C:\xampp\htdocs-hostnames\nodejs\MyModulos\ts\appMod\readfile.ts"
mklink /h "%DESTINO%\appMod\UserAgent.to.app.ts" "C:\xampp\htdocs-hostnames\nodejs\MyModulos\ts\appMod\UserAgent.to.app.ts"
mklink /h "%DESTINO%\appMod\writefile.ts"        "C:\xampp\htdocs-hostnames\nodejs\MyModulos\ts\appMod\writefile.ts"



pause