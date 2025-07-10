@echo off
setlocal enabledelayedexpansion

REM ================================================
REM SCRIPT DE BACKUP MYSQL (FECHA AUTOMATICAMENTE)
REM ================================================

REM --- CONFIGURAÇÕES ---
set USUARIO=root
set SENHA=mysql
set BANCO=controle_estoque
set PASTA_BACKUP=G:\Meu Drive\TesteBackup
set MYSQLDUMP_EXE="C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump.exe"
set ARQUIVO_LOG="%PASTA_BACKUP%\_log_de_erros.txt"

REM --- VERIFICA/CRIA PASTA ---
if not exist "%PASTA_BACKUP%" mkdir "%PASTA_BACKUP%"

REM --- GERA NOME DO ARQUIVO ---
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /format:list') do set datetime=%%I
set "TIMESTAMP=%datetime:~0,4%-%datetime:~4,2%-%datetime:~6,2%_%datetime:~8,2%h%datetime:~10,2%m%datetime:~12,2%s"
set "NOME_ARQUIVO=backup-%TIMESTAMP%.sql"

REM --- EXECUTA O BACKUP ---
%MYSQLDUMP_EXE% -u %USUARIO% -p%SENHA% %BANCO% > "%PASTA_BACKUP%\%NOME_ARQUIVO%" 2>> %ARQUIVO_LOG%

REM --- VERIFICA SE FOI CRIADO ---
if exist "%PASTA_BACKUP%\%NOME_ARQUIVO%" (
    for %%A in ("%PASTA_BACKUP%\%NOME_ARQUIVO%") do if %%~zA GTR 0 (
        echo Backup criado com sucesso: %NOME_ARQUIVO%
    ) else (
        echo [ERRO] Backup criado mas está VAZIO >> %ARQUIVO_LOG%
    )
) else (
    echo [ERRO CRITICO] Falha ao criar backup >> %ARQUIVO_LOG%
)

REM --- FECHA AUTOMATICAMENTE ---
exit