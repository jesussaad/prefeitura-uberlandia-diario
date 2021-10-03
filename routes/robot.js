var express = require('express');
var router = express.Router();

const puppeteer = require('puppeteer');

var browser;
var page;
var countClasses = 0;

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
    if (page != null && page.url().indexOf('/calendariolancamentodiarioman') >= 0) {
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
        console.info("Escolhendo a 1a opção = 'Escola Prof Olga Del Fávero'")
        await page.select('[name="corpo:formulario:escolaLog"]', '0')
        console.info("Escolhido com sucesso")
      } catch (error) {
        console.error(error)
      }

      try {
        console.info("Clicando no botão 'Login'")
        var btnSelector = '[id="corpo:formulario:botaoContinuarLogin"]'
        await page.waitForSelector(btnSelector).then(() => console.log('Botão encontrado'));
        await page.click(btnSelector);
        console.info("Botão clicado com sucesso. Aguardando a navegação...")
        await page.waitForNavigation();
        console.info("Navegação concluída, procurando o topo da tela '#topo_secao'")
        page.waitForSelector('#topo_secao')
        console.info("Topo encontrado!")
      } catch (error) {
        console.error(error)
      }

    }
    res.send('Logged!');
  })();

  router.get('/clickInOcurrencesMenu', function (req, res, next) {
    (async () => {
      console.info("Navegando no menu 'Atividades'")
      try {
        await page.waitFor(1000);
        await page.goto('https://webacademico.uberlandia.mg.gov.br/webacademico/f/t/turmadisciplinaprofsel?fwPlc=calendariolancamentodiarioman&evento=y');
      } catch (error) {
        console.error(error)
        await page.waitFor(2000);
        await page.goto('https://webacademico.uberlandia.mg.gov.br/webacademico/f/t/turmadisciplinaprofsel?fwPlc=calendariolancamentodiarioman&evento=y');
      }
      console.info("Navegado com sucesso!")

      res.send('Menu clicked!');
    })();
  });

  router.get('/countClasses', function (req, res, next) {
    (async () => {
      var result = 0;
      if (page != null && page.url().indexOf('turmadisciplinaprofsel') >= 0) {
        console.info("Contando a quantidade de turmas")
        var selector = ".tabelaSelecao tr[onclick]"
        console.info("Usando o selector", selector)
        result = (await page.$$(selector)).length
        console.info(`Contado com sucesso = ${result}`)
        countClasses = result;
      }

      res.send(result.toString());
    })();
  });

  router.get('/clickClass', function (req, res, next) {
    (async () => {
      if (page != null && page.url().indexOf('turmadisciplinaprofsel') >= 0) {
        let classId = parseInt(req.query.classId);
        console.info("Clicando na turma ", classId)
        const selector = `[id="corpo:formulario:plcLogicaItens:${classId}:linhaSel"]`;
        await page.click(selector);
        console.info("Clicado com sucesso", selector)
        try {
          // await page.waitForNavigation();
          await page.waitFor(2000);
        } catch (error) {
          console.error(error)
        }
      }

      res.send("Class Clicked");
    })();
  });

  router.get('/clickDate', function (req, res, next) {
    (async () => {
      if (page != null && page.url().indexOf('oidDisciplina') >= 0) {
        let day = parseInt(req.query.date.split('/')[0])
        let month = parseInt(req.query.date.split('/')[1]) - 1;

        const xpath = `//td[contains(@class, "borda") and @data-month="${month}"]/..//a[text()="${day}"]`;
        console.info(`Clicando no dia ${day} do mês ${month} através do xpath ${xpath}`);
        await (await page.$x(xpath))[0].click();
        console.info("Clicado com sucesso", xpath)
        try {
          // await page.waitForNavigation();
          await page.waitFor(2000);
        } catch (error) {
          console.error(error)
        }
      }

      res.send("Day Clicked");
    })();
  });

  router.get('/insertOcurrence', function (req, res, next) {
    (async () => {
      if (page != null && page.url().indexOf('conversationId') >= 0) {
        const textAreaSelector = `[id="corpo:formulario:ocorrencias:0:dsDetalhamento"]`;
        console.info(`Texto da ocorrência que será inserido de acordo com o selector ${textAreaSelector}: ${req.query.text}`);

        await page.evaluate(() => document.getElementById("corpo:formulario:ocorrencias:0:dsDetalhamento").value = "")

        await page.type(textAreaSelector, req.query.text, { "delay": 200 })
        const btnSelector = `[id="corpo:formulario:botaoAcaoGravar"]`;
        console.info(`Texto digitado com sucesso. Clicando em ${btnSelector}`)
        await page.click(btnSelector);
        try {
          // await page.waitForNavigation();
          await page.waitFor(2000);
        } catch (error) {
          console.error(error)
        }
      }

      res.send("Ocurrence inserted");
    })();
  });
});

module.exports = router;
