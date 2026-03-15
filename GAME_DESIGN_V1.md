# Juego de Plantas — Diseño v1

## 1) Visión general
Juego 2D single player (app) de cuidado de plantas en interior, con estética cartoon/anime hand-drawn moderna, colores vivos, animaciones suaves y audio chill.

- Escena principal: casa/lobby arrastrable (pared + suelo).
- Objetivo: desbloquear plantas en el álbum botánico y decorar la casa.
- Guardado: se puede jugar local sin internet; al volver con conexión se sincroniza con la cuenta Google.

## 2) Tiempo y escalado
Regla base de conversión:

- **1 día de juego = 12 horas reales**.

Las duraciones siempre se expresan como:

- días de juego
- y entre paréntesis su equivalente en horas reales.

## 3) Core loop
1. Comprar sobre de semillas en tienda.
2. Arrastrar sobre de semilla a una maceta válida para plantar.
3. Cuidar planta: riego y abono.
4. Esperar fases de crecimiento.
5. Reclamar flores/frutos/recompensas al hacer click.
6. Reinvertir monedas/abono para progresar y decorar.

## 4) Reglas de cuidado (globales)
### Riego
- Se riega arrastrando la regadera.
- Riego recomendado: máximo 2 riegos por día de juego.
- Si se riega más de 2 veces en el mismo día de juego, la planta se considera “ahogada” y queda en estado de marchitez (mismo castigo que no regar).
- Si pasan 3 días de juego sin riego (36h reales), la planta muere.

### Abono
- Todas las plantas consumen **10 de compost por día de juego**.
- Si pasan 2 días de juego sin abonar (24h reales), la planta muere.
- Si el jugador entra ese día al juego, recibe +50 de compost diario.

### Estado marchito
Cuando una planta se marchita:
- Penalización visual: amarillea y se ve decaída.
- Penalización de crecimiento: tarda un 50% más.
- Penalización de producción: reduce un 50% (redondeo hacia abajo).
  - Ejemplo: si daba 2 flores, da 1.
  - Si daba 1, da 0.

### Bonos de buen cuidado
- Si se riega cada día: +20% a crecimiento y producción.
- Si además está en maceta de sol: +30% extra a crecimiento y producción (solo flores/frutos y velocidad de crecimiento).
- Los bonos se **suman**: +20% + +30% = +50%.
- Si la planta estuvo bien regada durante todo su ciclo, hay 30% de probabilidad de multiplicar la recompensa de flor/fruto x2.

## 5) Muerte, restos y limpieza
- Una planta muerta deja restos en la maceta.
- Los restos bloquean esa maceta hasta retirarlos.
- Los restos no caducan.
- Al click en restos, se limpian y dan compost.

## 6) Progresión de plantas y álbum
- El álbum botánico registra una planta cuando llega por primera vez a su última fase.
- No hay sistema de rarezas por ahora.
- Primera vez que descubres una especie: +20 monedas (solo una vez por especie).

## 7) Fases de crecimiento
### Plantas estándar (4 fases)
1. Brote
2. Brote crecido
3. Planta
4. Flor o fruto

### Plantas con flor y luego fruto (5 fases)
1. Brote
2. Brote crecido
3. Planta
4. Planta con flor
5. Planta con fruto

### Tiempos por fase
- Plantas con flor: 1 día de juego por fase (12h reales).
- Plantas con fruto: 2 días de juego por fase (24h reales).
- Plantas decorativas sin producción: 0.5 día de juego por fase (6h reales).
- Enredaderas: 2 días de juego por fase (24h reales).

## 8) Plantas definidas (v1)
- **Tomatera**: en estaca vertical; 1–4 frutos según riego.
- **Fresa**: 2 frutos (1 si riego malo); produce cada 4 días de juego (48h reales).
- **Menta**: decorativa.
- **Girasol**: 1 flor cada 2 días de juego (24h reales).
- **Rosal**: 2–3 flores cada 5 días (60h reales); color aleatorio por planta (rojo/blanco/violeta).
- **Cactus**: 1 flor rosa cada 3 días (36h reales).
- **Aloe vera**: cada 6h de juego permite reclamar +10 compost.
- **Hiedra (enredadera)**: crece por pared, sin flores.
- **Guisante**: en estaca; flor intermedia sin recompensa; 5 frutos totales, 1 cada 2 días (24h reales).
- **Helecho**: decorativa; solo en zona de sombra.
- **Calabaza**: 1 fruto cada 5 días (60h reales).
- **Calabacín**: 1 fruto cada 5 días (60h reales).
- **Lavanda**: 6 flores totales, 1 cada 2 días (24h reales).
- **Tulipán**: 1 flor cada 4 días (48h reales); color aleatorio por planta (rosa/azul/rojo/blanco).
- **Lechuga**: al madurar, reclamas +20 compost y la planta muere.
- **Jazmín (enredadera)**: en pared; hasta 10 flores totales, 2–3 por fase.

## 9) Enredaderas en pared
- Solo puede haber 1 enredadera activa en la pared.
- Crece en fondo de pared, de izquierda a derecha.
- No interactúa con muebles/objetos (no “se sube” a ellos).

Fases visuales (5):
1. Brote
2. Esquina
3. Media pared
4. Más de media pared
5. Pared completa

Tijeras:
- Cada corte reduce 1 fase.
- Cada corte da +5 compost.

## 10) Herramientas
- **Pala**: elimina planta y da +5 compost.
- **Tijeras**: recortan enredadera (−1 fase) y dan +5 compost.
- **Bolsa de abono**: se arrastra sobre planta para abonar.

## 11) Macetas
- Inicio: 6 macetas vacías con tierra.
- Máximo total: 25 macetas.
- Comprar maceta extra: 100 monedas (de una en una).
- Cambio de color de maceta manteniendo pulsado 5 segundos.

Colores:
- marrón
- gris grafito
- azul pastel
- verde oscuro

## 12) Recompensas y economía
- Cada flor: +5 monedas.
- Cada fruto: +5 monedas y +5 compost.
- Al alcanzar fase final de planta: +5 monedas al reclamar.
- Plantas decorativas: al reclamar fase final, reinician a fase 1.
- Login diario: +50 compost (solo si conectas ese día).

## 13) Tienda y pack inicial
### Pack inicial
- 1 semilla de tomatera
- 1 semilla de menta
- 6 macetas vacías con tierra
- 10 monedas
- 50 compost

### Semillas
- 30 monedas: tomatera, fresa, calabaza, calabacín
- 50 monedas: menta, girasol, rosal, cactus, aloe vera
- 70 monedas: guisante, hiedra, helecho
- 100 monedas: lavanda, tulipán, lechuga, jazmín

### Packs de abono
- 100 compost: 50 monedas
- 300 compost: 130 monedas
- 500 compost: 220 monedas

## 14) Casa/lobby y zonas especiales
- La cámara/escena de la casa es arrastrable.
- Hay paredes con ventanas.
- Existe una maceta especial en ventana (zona sol): +30% crecimiento/producción para flores/frutos.
- Existe una zona de sombra con maceta reservada para plantas de sombra/nocturnas (actualmente helecho).
- Hay zona de sofá sin macetas, usada como espacio de tránsito/idle para mascotas.

## 15) Mascotas
Mascotas pasean por la casa con animaciones.

- **Gato gris atigrado** (200 monedas): camina, ronronea, juega con ovillo.
- **Gorrión común** (200 monedas): vuela, se posa, pía.
- **Canario** (200 monedas): vuela, se posa, canta.

Al comprar mascota se muestra advertencia:
- “¿Estás seguro que puedes mantenerlo? Si no lo haces, el animal podría fallecer.”

### Alimentación
- El día de compra no tiene hambre.
- Desde el día siguiente: 1 toma de comida por día de juego.
- Si pasan 2 días de juego sin comer (24h reales), la mascota muere.
- Comida gato: 20 monedas.
- Comida pájaro: 10 monedas.
- Si muere, queda cuerpo en el suelo y se retira con click.

## 16) Pendientes para v1.1
- Balance final de inflación de monedas/compost.
- UX exacta de mensajes (ahogo, marchitez, hambre, muerte).
- Definición de tutorial inicial (primeros 10 minutos).
- Lista de misiones diarias/semanales.
- Fichas visuales por especie (silueta, paleta, animaciones).
