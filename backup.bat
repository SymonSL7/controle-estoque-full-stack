@echo off
setlocal enabledelayedexpansion

REM ================================================
REM SCRIPT DE BACKUP MYSQL 8.4 - VERSÃO CORRIGIDA
REM ================================================

title Backup MySQL - %COMPUTERNAME%

REM --- CONFIGURAÇÕES ---
set USUARIO=root
set SENHA=Mysql
set BANCO=controle_estoque
set PASTA_BACKUP=G:\Meu Drive\TesteBackup
set MYSQLDUMP_EXE="C:\Program Files\MySQL\MySQL Server 8.4\bin\mysqldump.exe"

REM --- PREPARAÇÃO DO AMBIENTE ---
REM Remove aspas extras e espaços em branco
set PASTA_BACKUP=%PASTA_BACKUP:"=%
set "PASTA_BACKUP=%PASTA_BACKUP%"

REM Cria pasta se não existir
if not exist "%PASTA_BACKUP%" mkdir "%PASTA_BACKUP%"

REM --- GERA NOME DO ARQUIVO ---
for /f "tokens=1-3 delims=/ " %%a in ("%DATE%") do (
    set DD=%%a
    set MM=%%b
    set YYYY=%%c
)
for /f "tokens=1-3 delims=:." %%a in ("%TIME%") do (
    set HH=%%a
    set MIN=%%b
    set SS=%%c
)

REM Formata com zeros à esquerda
set HH=!HH: =0!
set DD=!DD: =0!

set "TIMESTAMP=!YYYY!-!MM!-!DD!_!HH!-!MIN!-!SS!"
set "NOME_ARQUIVO=backup_%BANCO%_!TIMESTAMP!.sql"
set "CAMINHO_COMPLETO=%PASTA_BACKUP%\!NOME_ARQUIVO!"

REM --- EXECUÇÃO DO BACKUP ---
echo Executando backup de %BANCO%...
echo Destino: !CAMINHO_COMPLETO!

REM Método 1: Com senha na linha de comando (com aviso)
%MYSQLDUMP_EXE% -u%USUARIO% -p%SENHA% %BANCO% --result-file="!CAMINHO_COMPLETO!" 2>&1

REM Método 2: Alternativa sem senha visível (recomendado)
REM echo [client] > mysql_temp.cnf
REM echo user=%USUARIO% >> mysql_temp.cnf
REM echo password=%SENHA% >> mysql_temp.cnf
REM %MYSQLDUMP_EXE% --defaults-extra-file=mysql_temp.cnf %BANCO% --result-file="!CAMINHO_COMPLETO!"
REM del mysql_temp.cnf

REM --- VERIFICAÇÃO ---
if exist "!CAMINHO_COMPLETO!" (
    for %%A in ("!CAMINHO_COMPLETO!") do (
        if %%~zA GTR 0 (
            echo Backup criado com sucesso!
            echo Arquivo: !NOME_ARQUIVO!
            echo Tamanho: %%~zA bytes
        ) else (
            echo ERRO: Arquivo de backup está vazio
        )
    )
) else (
    echo ERRO: Falha ao criar arquivo de backup
    echo Verifique:
    echo 1. Permissões na pasta %PASTA_BACKUP%
    echo 2. Credenciais do MySQL
    echo 3. Espaço em disco
)