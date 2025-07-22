@echo off
setlocal enabledelayedexpansion

REM =================================================================
REM SCRIPT DE RESTAURACAO DE BANCO DE DADOS MYSQL (VERSAO FINAL v3)
REM =================================================================

REM --- CONFIGURACOES ---
set USUARIO=root
set SENHA=Mysql
set PASTA_BACKUP=G:\Meu Drive\TesteBackup
set MYSQL_EXE="C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe"
set ARQUIVO_LOG="%PASTA_BACKUP%\_log_de_erros.txt"

REM --- INICIO DO SCRIPT ---

echo.
echo =================================================
echo     ASSISTENTE DE RESTAURACAO DE BACKUP
echo =================================================
echo.

if not exist %MYSQL_EXE% (
    echo [ERRO] O executavel do MySQL nao foi encontrado em: %MYSQL_EXE%
    pause
    exit /b
)

REM Verifica se a pasta de backup existe
if not exist "%PASTA_BACKUP%" (
    echo [ERRO] Pasta de backup nao encontrada: %PASTA_BACKUP%
    pause
    exit /b
)

REM Lista os backups disponiveis com numeração
echo Backups disponiveis em "%PASTA_BACKUP%":
echo.
set count=0
for /f "delims=" %%a in ('dir /b /o-d "%PASTA_BACKUP%\backup_*.sql"') do (
    set /a count+=1
    set "arquivo[!count!]=%%a"
    echo [!count!] %%a
)

if %count% equ 0 (
    echo Nenhum arquivo de backup encontrado.
    echo Certifique-se que os arquivos seguem o padrao: backup_*.sql
    pause
    exit /b
)

echo.
echo -----------------------------------------------------------------
set /p opcao="Digite o NUMERO do backup que deseja restaurar (1-%count%) ou 0 para cancelar: "
echo -----------------------------------------------------------------

REM Valida a opção escolhida
if "%opcao%"=="0" (
    echo Operacao cancelada pelo usuario.
    pause
    exit /b
)

if not defined arquivo[%opcao%] (
    echo Opcao invalida. Por favor, execute novamente e selecione um numero entre 1 e %count%.
    pause
    exit /b
)

set "ARQUIVO_ESCOLHIDO=!arquivo[%opcao%]!"
set "CAMINHO_COMPLETO_BACKUP=%PASTA_BACKUP%\!ARQUIVO_ESCOLHIDO!"

echo.
set /p BANCO_DESTINO="Digite o nome do BANCO DE DADOS para o qual deseja restaurar e pressione ENTER: "

if "%BANCO_DESTINO%"=="" (
    echo.
    echo [ERRO] Nenhum banco de dados foi informado. Operacao cancelada.
    pause
    exit /b
)
echo -----------------------------------------------------------------

REM --- Confirmacao final ---
echo.
echo           *** ATENCAO! ACAO IRREVERSIVEL! ***
echo.
echo Voce esta prestes a substituir TODOS os dados do banco de dados:
echo '%BANCO_DESTINO%'
echo com o conteudo do arquivo:
echo '!ARQUIVO_ESCOLHIDO!'
echo.
set /p CONFIRMA="Tem certeza absoluta que deseja continuar? (S/N): "

if /i not "%CONFIRMA%"=="S" (
    echo.
    echo Operacao cancelada pelo usuario.
    pause
    exit /b
)

REM --- Executa a restauracao ---
echo.
echo Iniciando restauracao para o banco '%BANCO_DESTINO%'... Por favor, aguarde.
%MYSQL_EXE% -u%USUARIO% -p%SENHA% %BANCO_DESTINO% < "!CAMINHO_COMPLETO_BACKUP!" 2>> %ARQUIVO_LOG%

echo.
echo Restauracao finalizada.
echo Verifique o arquivo de log para detalhes: %ARQUIVO_LOG%
echo.
pause