# Lâmpada para os Pés

App devocional de 28 dias sobre a volta de Jesus. Pode ser instalado no celular, funciona sem internet e cada pessoa entra com **usuário + PIN de 6 números** em qualquer aparelho.

## 1. Publicar no GitHub Pages

1. Entre em github.com e crie um repositório novo, por exemplo `lampada-para-os-pes`. Ele precisa ser **Public** no plano gratuito.
2. No repositório, toque em **Add file → Upload files** e envie **todo o conteúdo desta pasta**, incluindo a pasta `icons`. Depois toque em **Commit changes**.
3. Vá em **Settings → Pages**. Em *Source*, escolha **Deploy from a branch**, depois a branch **main** e a pasta **/ (root)**, e toque em **Save**.
4. Em 1 a 2 minutos, o endereço aparece no topo da página, por exemplo `https://seu-usuario.github.io/lampada-para-os-pes/`.

Antes de configurar o Firebase (passo 2), o app já funciona, mas os dados ficam só no aparelho, com perfis protegidos por PIN.

## 2. Ativar o login em qualquer aparelho (Firebase, grátis)

1. Acesse console.firebase.google.com e toque em **Criar projeto**. Pode desativar o Google Analytics.
2. **Authentication → Vamos começar → Método de login → E-mail/senha → Ativar → Salvar.**
3. **Firestore Database → Criar banco de dados**. Escolha a região `southamerica-east1` (São Paulo) e o **modo de produção**.
4. Em **Firestore → Regras**, apague o que estiver lá, cole o conteúdo do arquivo `firestore.rules` e toque em **Publicar**.
5. Toque na **engrenagem → Configurações do projeto → Seus apps → ícone `</>` (Web)**, dê um nome ao app e registre. Copie os valores de `firebaseConfig`.
6. No GitHub, abra o arquivo `firebase-config.js`, toque no lápis para editar e substitua os campos pelos seus valores. Depois toque em **Commit changes**.
7. Em **Authentication → Configurações → Domínios autorizados**, adicione `seu-usuario.github.io`.

Pronto: na primeira vez, cada pessoa toca em **Primeiro acesso**, escolhe um usuário e cria o PIN. Nos outros aparelhos, basta tocar em **Entrar** com o mesmo usuário e PIN.

## 3. Instalar no celular

- **Android (Chrome):** abra o endereço e toque em **⋮ → Instalar app** (ou *Adicionar à tela inicial*).
- **iPhone (Safari):** abra o endereço e toque em **Compartilhar → Adicionar à Tela de Início**.

## Como funciona sem internet

- Depois da primeira abertura, o app fica guardado no aparelho e abre sem internet.
- Com login, o progresso e o diário são gravados no aparelho na hora e enviados para a sua conta quando a internet voltar.
- O **primeiro login em um aparelho novo** precisa de internet.
- "Tire uma dúvida" só funciona quando o app é aberto pelo Claude.

## Atualizar o app

Ao trocar arquivos no GitHub, abra o `sw.js` e mude `lampada-v1` para `lampada-v2` (e assim por diante). Assim os celulares baixam a versão nova.
