@echo off
setlocal

REM =================================================================
REM SCRIPT DE BACKUP DE BANCO DE DADOS MYSQL (VERSAO FINAL)
REM =================================================================

REM --- CONFIGURACOES ---
set USUARIO=root
set SENHA=mysql
set BANCO=controle_estoque
set PASTA_BACKUP=G:\Meu Drive\TesteBackup
set MYSQLDUMP_EXE="C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump.exe"
set ARQUIVO_LOG="%PASTA_BACKUP%\_log_de_erros.txt"


REM --- INICIO DO SCRIPT ---

if not exist "%PASTA_BACKUP%" (
    echo Criando pasta de backup: %PASTA_BACKUP%
    mkdir "%PASTA_BACKUP%"
)

REM Gera um nome de arquivo confiavel com data e hora (Ex: backup-20250710_102751.sql)
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /format:list') do set datetime=%%I
set "TIMESTAMP=%datetime:~0,4%-%datetime:~4,2%-%datetime:~6,2%_%datetime:~8,2%h%datetime:~10,2%m%datetime:~12,2%s"
set "NOME_ARQUIVO=backup-%TIMESTAMP%.sql"
set "CAMINHO_COMPLETO_BACKUP=%PASTA_BACKUP%\%NOME_ARQUIVO%"

echo.
echo Iniciando o backup do banco de dados '%BANCO%'...

REM Executa o backup. Note que NAO usamos 2>&1 aqui. Erros (2>) vao para o log.
%MYSQLDUMP_EXE% -u %USUARIO% -p%SENHA% %BANCO% > "%CAMINHO_COMPLETO_BACKUP%" 2>> %ARQUIVO_LOG%

REM Verifica se o backup foi bem-sucedido
if exist "%CAMINHO_COMPLETO_BACKUP%" (
    for %%A in ("%CAMINHO_COMPLETO_BACKUP%") do if %%~zA GTR 0 (
        echo ...Backup criado com SUCESSO!
    ) else (
        echo [ERRO!] O arquivo de backup foi criado, mas esta VAZIO (0 KB).
        echo          Verifique o arquivo de log para detalhes: %ARQUIVO_LOG%
    )
) else (
    echo [ERRO!] Falha critica ao criar o arquivo de backup.
    echo          Verifique o arquivo de log para detalhes: %ARQUIVO_LOG%
)

REM Mantem apenas os 10 backups mais recentes
echo.
echo Verificando backups antigos para limpeza...
for /f "skip=10 delims=" %%F in ('dir /b /o-d "%PASTA_BACKUP%\backup-*.sql"') do (
    echo Deletando backup antigo: "%%F"
    del "%PASTA_BACKUP%\%%F"
)

echo.
echo Processo de backup finalizado.
echo.
pause