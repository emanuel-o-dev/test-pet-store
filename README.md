# Testes Automatizados em React Native/Expo

## 1. Diferença entre Testes Unitários e Testes E2E (End-to-End)

### Testes Unitários
Os testes unitários verificam partes individuais da aplicação, como componentes ou funções, garantindo que cada uma funcione corretamente de maneira isolada.

**Exemplo de cenário para testes unitários:**
- Testar se um botão renderiza corretamente e chama a função apropriada ao ser pressionado.
- Verificar se um hook retorna os valores esperados.

### Testes E2E (End-to-End)
Os testes E2E validam fluxos completos da aplicação, simulando a interação do usuário do início ao fim. 
Eles garantem que diferentes componentes e telas funcionam corretamente em conjunto.

**Exemplo de cenário para testes E2E:**
- Inserir credenciais inválidas na tela de login e verificar se uma mensagem de erro é exibida.
- Realizar um pedido em um aplicativo de compras e verificar se a confirmação da compra é exibida corretamente.

## 2. Configuração do Ambiente

### Requisitos:
- Node.js instalado
- Expo CLI
- Emulador Android ou dispositivo físico
- Biblioteca `jest-expo` para testes unitários
- Biblioteca `@testing-library/react-native` para auxiliar nos testes unitários
- Biblioteca `maestro` para testes E2E

### Instalação das Dependências:

# Instalar Jest e configuração para Expo

    npx expo install jest-expo jest @types/jest "--" --dev  
    npx expo install @testing-library/react-native "--" --dev

## Instalar Maestro para testes E2E
# Instalação :

https://docs.maestro.dev/getting-started/installing-maestro/windows

## 3. Como Rodar os Testes

### Testes Unitários
Para rodar os testes unitários, utilize o comando:

    npm test

Ou, caso queira rodar um teste específico:

    npm test -- <nome_do_teste>

### Testes E2E com Maestro
Certifique-se de que o emulador Android ou um dispositivo físico está ativo e execute:

     maestro test maestro-tests/ <nome_do_teste> .yaml
     
# Se estiver dando erro no pacote do teste rode 
     npx expo prebuild
     
## 4. Ambiente de Execução
- **Testes unitários**: podem ser rodados em qualquer ambiente (Windows, Mac, Linux).
- **Testes E2E**: recomendados em Android (emulador ou dispositivo físico).



