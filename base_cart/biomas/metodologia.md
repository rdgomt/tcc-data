# Metodologia de construção da base cartográfica

Este documento lista as etapas realizadas para adequação dos dados originais às necessidades do projeto.

## Biomas

1. Importação do arquivo original.

2. Eliminação dos campos da tabela de atributos que não serão úteis.

3. Aplicação da Projeção South America Albers Equal Area Conic (adaptada para o RS).

4. Realização da operação Interseção com a Divisa estadual como base.

5. Adição de novo campo (area_km2) + cálculo de área.