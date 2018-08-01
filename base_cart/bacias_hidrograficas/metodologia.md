# Metodologia de construção da base cartográfica

Este documento lista as etapas realizadas para adequação dos dados originais às necessidades do projeto.

## Bacias hidrográficas

1. Importação do arquivo original.

2. Desabilitado os valores de Z e M (Feature Class to Feature Class com Environment Variables).

3. Eliminação dos campos da tabela de atributos que não serão úteis.

4. Edição dos nomes que estavam sem hífen para separar os rios principais.

5. Deletado a feição referente à Lagoa dos Patos.

6. Aplicação da Projeção South America Albers Equal Area Conic (adaptada para o RS).

7. Adição de novo campo (area_km2) + cálculo de área.