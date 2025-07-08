@echo off
set USUARIO=root
set SENHA=mysql
set BANCO=controle_estoque
set PASTA_BACKUP=G:\Meu Drive\TesteBackup

REM Cria a pasta de backup se não existir
if not exist "%PASTA_BACKUP%" mkdir "%PASTA_BACKUP%"

REM Faz o backup com data e hora no nome do arquivo
mysqldump -u %USUARIO% -p%SENHA% %BANCO% > "%PASTA_BACKUP%\backup-%date:~6,4%-%date:~3,2%-%date:~0,2%-%time:~0,2%%time:~3,2%%time:~6,2%.sql"

REM Mantém apenas os 10 backups mais recentes, apaga os mais antigos
for /f "skip=10 delims=" %%F in ('dir /b /o-d "%PASTA_BACKUP%\backup-*.sql"') do del "%PASTA_BACKUP%\%%F"