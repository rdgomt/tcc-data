# Metodologia de construção da base cartográfica

Este documento lista as etapas realizadas para adequação dos dados originais às necessidades do projeto.

## Municípios

1. Importação do arquivo original.

2. Eliminação das feições não pertencentes ao Rio Grande do Sul.

3. Eliminação dos campos da tabela de atributos que não serão úteis.

4. Aplicação da Projeção South America Albers Equal Area Conic (adaptada para o RS).

5. Adição de novo campo (area_km2) + cálculo de área.