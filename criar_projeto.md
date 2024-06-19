# Como criar um app mobile


## Parte A - Preparar o ambiente



### 1.Instalação do Chocolatey (gerenciador de pacotes)
Recomendo instalar com o poweshell

```bash 
  Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```


_Se for usuário de linux ou MacOS, ver a_ [Documentação de instalação do chocolatey](https://chocolatey.org/install)



### 2. Instalar o NVM-windows

O NVM (Node Version Manager) é uma ferramenta que gerencia várias versões do Node.js.


o NVM é só para MacOS e Linux, então usuários de windows precisam usar o programa NVM-Windows.

 _Acesse o executável em_ [Documentação nvm-windows](https://github.com/coreybutler/nvm-windows/releases)



### 3. Instalar o NodeJs pelo nvm

O Node.js é um ambiente para executar JavaScript no servidor. <br>
Ele será instalado usando o nvm, que permite instalar várias versões. 

```bash 
  nvm list available                      // lista versões disponíveis
  nvm install numero-versão               // instala uma versão do node
  nvm ls                                  // vista versões do node instaladas na máquina
  nvm use numero-versão                   //seleciona a versão do node
```
------------------------------
## Parte B - Criar o projeto

As ferramentas são o react native e o expo Go. 

Atualmente não precisa configurar o expo e nem instalar o expo-cli


```bash
  npx create-expo-app nome-projeto --template 
  cd nome-projeto
  npm install expo@50 //Opcional (instala o expo skd50)

  npx expo start
```


----------------------
#### Método alternativo com expo-stack pelo npm

Expo Stack é uma biblioteca que permite selecionar várias features do projeto, tais como navegação, integração com backend, estilização e uso de typescript. 

```bash
  npx create-expo-stack
```


## Referência

#### Expo-Stack
 - [Configuração Expo Stack](https://www.youtube.com/watch?v=JxAxBGN5QRo)
 - [Site Oficial create-expo-stack](https://createexpostack.com/)

