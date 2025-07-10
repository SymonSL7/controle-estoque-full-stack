@echo off
setlocal

REM =================================================================
REM SCRIPT DE RESTAURACAO DE BANCO DE DADOS MYSQL (VERSAO FINAL v2)
REM =================================================================

REM --- CONFIGURACOES ---
set USUARIO=root
set SENHA=mysql
set PASTA_BACKUP=G:\Meu Drive\TesteBackup
set MYSQL_EXE="C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
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

echo Backups disponiveis em "%PASTA_BACKUP%":
echo.
dir /b /o-d "%PASTA_BACKUP%\backup-*.sql"

echo.
echo -----------------------------------------------------------------
set /p ARQUIVO_ESCOLHIDO="Copie e cole o nome completo do arquivo que deseja restaurar e pressione ENTER: "
echo -----------------------------------------------------------------

set "CAMINHO_COMPLETO_BACKUP=%PASTA_BACKUP%\%ARQUIVO_ESCOLHIDO%"

if not exist "%CAMINHO_COMPLETO_BACKUP%" (
    echo.
    echo [ERRO] O arquivo "%ARQUIVO_ESCOLHIDO%" nao foi encontrado.
    echo Verifique se voce digitou ou colou o nome corretamente.
    pause
    exit /b
)

REM <<< NOVO PASSO ADICIONADO AQUI >>>
echo.
set /p BANCO_DESTINO="Agora, digite o nome do BANCO DE DADOS para o qual deseja restaurar e pressione ENTER: "

if "%BANCO_DESTINO%"=="" (
    echo.
    echo [ERRO] Nenhum banco de dados foi informado. Operacao cancelada.
    pause
    exit /b
)
echo -----------------------------------------------------------------


REM --- Mensagem de confirmacao atualizada para usar a nova variavel ---
echo.
echo           *** ATENCAO! ACAO IRREVERSIVEL! ***
echo.
echo Voce esta prestes a substituir TODOS os dados do banco de dados:
echo '%%BANCO_DESTINO%%'
echo com o conteudo do arquivo:
echo '%ARQUIVO_ESCOLHIDO%'
echo.
set /p CONFIRMA="Tem certeza absoluta que deseja continuar? (S/N): "

if /i not "%CONFIRMA%"=="S" (
    echo.
    echo Operacao cancelada pelo usuario.
    pause
    exit /b
)

REM --- Comando de restauracao atualizado para usar a nova variavel ---
echo.
echo Iniciando restauracao para o banco '%BANCO_DESTINO%'... Por favor, aguarde.
%MYSQL_EXE% -u %USUARIO% -p%SENHA% %BANCO_DESTINO% < "%CAMINHO_COMPLETO_BACKUP%" 2>> %ARQUIVO_LOG%

echo.
echo Restauracao finalizada.
echo Se algum erro ocorreu, ele foi gravado no arquivo de log: %ARQUIVO_LOG%
echo.
pause