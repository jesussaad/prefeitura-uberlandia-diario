# prefeitura-uberlandia-diario

Robô para preenchimento do diário da prefeitura de Uberlândia

## Instalação

```shell
npm install -g yarn
git clone git@github.com:jesussaad/diario-prefeitura-uberlandia.git
cd prefeitura-uberlandia-diario
npm install
```

## Running

### Em prod

```shell
DEBUG=express-generator:* npm start
```

### Em dev

```shell
DEBUG=express-locallibrary-tutorial:* npm run devstart
```

## Passo a passo feito pelo dev

```shell
cd prefeitura-uberlandia-diario
npm install -g yarn
# Configurando a versão do yarn para esse projeto (instalando a última versão 3.0)
yarn set version berry
# Iniciando o projeto yarn
yarn init
# Adicionei o autor, licença e versão manualmente no package.json
# Criando a estrutura de pastas
npm install express-generator -g
express
# Instalando as dependências do projeto yarn
yarn
yarn install

# A licença
# yarn add gpl-3.0

# Integrando o yarn com o VSCode. Veja essa página para mais detalhes, principalmente quando o VS Code parar de seguir os links, ou seja, quando o go-to-definition não funcionar: https://yarnpkg.com/getting-started/editor-sdks
yarn dlx @yarnpkg/sdks vscode
## NO VS Code:
##

# Ignorando o cache do yarn
echo ".yarn" >> .gitignore

# Para reiniciar o ExpressJS a cada alteração de script
yarn add nodemon
# Troque "start": "node ./bin/www" por "start": "node ./bin/www", "devstart": "nodemon ./bin/www"
# Agora existe uma forma de iniciar em dev e outra em prod, em dev é essa: DEBUG=express-locallibrary-tutorial:* npm run devstart e em prod é essa: DEBUG=express-generator:* npm start
```
