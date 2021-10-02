var express = require('express');
var router = express.Router();

const puppeteer = require('puppeteer');

var browser;
var page;

router.get('/start', function (req, res, next) {
  (async () => {
    if (browser == null) {
      console.info("Abrindo o Chromium")
      browser = await puppeteer.launch({ "headless": false, "devtools": false, "defaultViewport": { "width": 1200, "height": 900 } });
      page = await browser.newPage();
      await page.goto('https://webacademico.uberlandia.mg.gov.br/webacademico/f/t/calendariolancamentodiarioman');
      console.info("Página aberta!")
    }

    res.send('Started!');
  })();
});

router.get('/login', function (req, res, next) {
  (async () => {
    if (page != null && page.url().indexOf('calendariolancamentodiarioman') >= 0) {
      console.info("Estamos na página inicial, informando os dados do usuário e clicando no botão")
      await page.select('#login_empresa', '1')
      await page.type('#j_username1', '24430', { "delay": 200 })
      await page.type('input[name=j_password]', 'educacaic', { "delay": 200 })
      await page.click('input[name=btnLogin]')

      try {
        console.info("Botão clicado! Aguardando a navegação")
        await page.waitForNavigation();
        console.info("Aguardado com sucesso")
      } catch (error) {
        console.error(error)
      }

      try {
        console.info("Escolhendo a opção 'Escola Prof Olga Del Fávero'")
        await page.select('[name="corpo:formulario:escolaLog"]', '0')
        console.info("Escolhido com sucesso")
      } catch (error) {
        console.error(error)
      }

      try {
        var btnSelector = '[id="corpo:formulario:botaoContinuarLogin"]'
        page.waitForSelector(btnSelector).then(() => console.log('Botão encontrado'));
        await page.click(btnSelector);
      } catch (error) {
        console.error(error)
      }
    }
    res.send('Logged!');
  })();
});

module.exports = router;
