<!-- ************************************* Título ********************************************* -->
<h1> Meus Cursos </h1>
</br>

Um App de gerenciamento de cursos para professores, com as funcionalidades básicas de um CRUD (Create / Read / Update / Delete), utilizando o banco de dados SQLite

</br>

## Imagens do Projeto

</br>

<div align="center">
  <img width="300" alt="image" src="https://user-images.githubusercontent.com/100736263/227806868-a42381e6-fbb9-4d43-baa6-02591dd91065.png">
  <img width="300" alt="image" src="https://user-images.githubusercontent.com/100736263/227806734-36d39ded-e56d-4707-92db-d0242977f2ef.png">
  <img width="300" alt="image" src="https://user-images.githubusercontent.com/100736263/227806786-eee5d6cc-c3b9-4ca7-aae5-44c610b4d466.png">
  <img width="300" alt="image" src="https://user-images.githubusercontent.com/100736263/227806826-d25fbf7f-84e4-4bde-906c-c9c66709f040.png">
  <img width="300" alt="image" src="https://user-images.githubusercontent.com/100736263/227806802-ff0f62df-c3bf-413a-bc15-a2f4c7edc565.png">
</div>

</br>

## Construído com

* [NodeJS](https://nodejs.org/en/) - Ambiente de execução Javascript
* [Vs Code](https://code.visualstudio.com/) - IDE
* [React Native](https://reactnative.dev/) - O framework Mobile usado
* [Expo](https://expo.io/) - Facilitador de visualização
* [SQLite](https://www.sqlite.org/index.html) - Banco de Dados
* [Firebase](https://firebase.google.com/?hl=pt-br) - Autenticar e gerenciar usuários

* Dependências
  * @react-native-community/masked-view
  * @react-navigation/native
  * @react-navigation/native-stack
  * bcrypt
  * expo
  * expo-font
  * expo-image-picker
  * expo-sqlite
  * expo-status-bar
  * firebase
  * react-native-safe-area-context
  * react-native-screens 
  * react-native-sqlite-storage

</br>

## Rodando o Projeto

- É Necessário : 
    - Ter o Expo Instalado no PC

```bash
# Clone este repositório
$ git clone https://github.com/Lucasllfs/Meus-Cursos.git

# Acesse a pasta do Projeto
$ cd Meus-Cursos

# Baixar as dependências
$ yarn install
ou
$ npm install

# execute o comando
$ yarn start
ou
$ npm start

# O Expo é iniciado no pc e após esse processo acessar o aplicativo do expo no celular
# e fazer a leitura do QRCode que é mostrado no terminal pelo Expo.
```
---
<h4>Observações</h4>

* Não foi possível incluir algumas funcionalidades que foram solicitadas.
  * Verificação por E-mail.
  * Criptografar senhas utilizando BCrypt - Tive alguns problemas ao tentar implementar no código e devido ao prazo de entrega achei melhor não adicionar.
  * Ao invés de comprimir as imagens em um BLOB e armazenar no banco de dados, apenas armazenei a URI da imagem.
  
  
