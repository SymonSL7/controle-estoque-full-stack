@echo off
ECHO Iniciando o servidor da Interface de Usuario (Angular)...
REM Abre uma nova janela do CMD, navega ate a pasta da UI e executa o ng serve
start "Angular UI" cmd /k "cd C:\Users\SSL\_GitHub\controle-estoque-full-stack\controle-estoque-ui && ng serve --host 0.0.0.0 --port 4200"

ECHO Iniciando o servidor da API (Symfony)...
REM Abre uma nova janela do CMD, navega ate a pasta da API e executa o symfony
start "Symfony API" cmd /k "cd C:\Users\SSL\_GitHub\controle-estoque-full-stack\controle-estoque-api && symfony.exe local:server:start --allow-http --allow-all-ip"

ECHO Servidores iniciados em novas janelas.