# Marketplace de Alojamientos

HotelVista es el frontend del marketplace de alojamientos temporales de Inversiones LR. Permite revisar los alojamientos disponibles en varios destinos de Colombia, compararlos, cotizar una estancia con todas sus tarifas y dejar registrada una reserva simulada.

En esta versión no hay backend. El catálogo sale de un archivo JSON incluido en el proyecto y las reservas quedan guardadas en el navegador de quien las hace.

## Integrantes

- Samuel Parada
- Samuel Contreras
- Sebastian Hernández
- Santiago Mendoza

## Tecnologías

- Angular 22 y TypeScript
- Bootstrap 5.3, Font Awesome 7 y animate.css
- ExchangeRate-API, para conversión de divisas

## Requisitos

- Node.js 24 (desde la 24.15), con npm.
- Git, para clonar el repositorio.
- Conexión a internet: Bootstrap, Font Awesome, animate.css y la fuente DM Sans se cargan por CDN desde `src/index.html`, y la conversión de divisas consulta una API externa.

## Instalación

```bash
git clone https://github.com/Sammael01/proyectomodulo2.git
cd proyectomodulo2
npm install
```

## Ejecución

```bash
npm start
```

La aplicación queda disponible en `http://localhost:4200`. `npm start` usa el Angular CLI del proyecto, así que no hace falta tenerlo instalado de forma global.

Para correr las pruebas unitarias:

```bash
npm test
```

## Catálogo

El archivo `public/assets/data/marketplace-data.json` contiene los alojamientos y sus reseñas. Trae seis alojamientos, en Bogotá, Cartagena, Guatapé, Villa de Leyva, Medellín y Armenia, entre apartamentos, casas y una cabaña.

La casa campestre de Armenia está marcada como inactiva, así que no aparece en ninguna parte de la aplicación: ni en el inicio, ni en el listado, ni en los filtros, ni por su ruta de detalle. Pasa lo mismo con cualquier alojamiento cuyo precio por noche no sea mayor que cero.

## Funcionalidades

1. **Inicio (`/`):** muestra los tres alojamientos con mejor calificación y un buscador por ciudad. Al buscar, se pasa al listado con esa ciudad ya filtrada.
2. **Listado (`/alojamientos`):** cada alojamiento aparece en una tarjeta con su imagen, tipo, calificación, ciudad, capacidad, servicios y precio por noche. Se puede filtrar por ciudad, número de huéspedes, tipo y precio máximo, y limpiar los filtros con un botón. Si ningún alojamiento cumple, se avisa en pantalla.
3. **Detalle (`/alojamientos/:id`):** galería de imágenes, descripción, ubicación, habitaciones, camas, baños, servicios, reglas de la casa y reseñas de otros huéspedes. El formulario de cotización está en esta misma página.
4. **Cotización:** se eligen las fechas y el número de huéspedes. Si algo no cumple las reglas, se muestran los errores y no se genera la cotización.
5. **Reserva:** cuando hay una cotización válida aparece el formulario de nombre y correo. Al confirmar, la reserva se guarda y la aplicación lleva a Mis reservas. Si se cambia una fecha o el número de huéspedes, la cotización se descarta y hay que volver a cotizar antes de reservar.
6. **Mis reservas (`/mis-reservas`):** tabla con las reservas hechas desde ese navegador. Si todavía no hay ninguna, se muestra un mensaje con un enlace al listado.

## Cotización

```
noches             = días entre la llegada y la salida
subtotal           = noches × precio por noche
tarifa de servicio = 10 % del subtotal
total              = subtotal + tarifa de limpieza + tarifa de servicio
```

Por ejemplo, tres noches en el Loft moderno en Chapinero, a $180.000 la noche y con $45.000 de limpieza, dan un subtotal de $540.000, una tarifa de servicio de $54.000 y un total de $639.000.

Antes de calcular se valida que:

- la fecha de llegada no sea anterior a hoy;
- la fecha de salida sea posterior a la de llegada;
- el número de huéspedes sea un entero mayor que cero y no supere la capacidad del alojamiento;
- el alojamiento tenga un precio por noche mayor que cero.

Debajo del total se puede ver el valor aproximado en dólares o euros. Las tasas se consultan en la API abierta de ExchangeRate-API (`https://open.er-api.com/v6/latest/COP`), que no pide clave. Ese valor es solo una referencia: la cotización y la reserva siempre quedan en pesos colombianos y, si la API no responde, la cotización funciona igual, solo que sin el equivalente.

## Reservas

Las reservas se guardan en el `localStorage` del navegador, bajo la clave `reservas`. Cada una lleva un número consecutivo, el alojamiento, la ciudad, las fechas, el número de huéspedes, las noches, el total, el nombre y el correo del huésped, y queda con estado confirmada.

Como se guardan en el navegador, se conservan al recargar la página, pero no se ven desde otro navegador o equipo y se pierden si se borran los datos del sitio. Tampoco se revisa si dos reservas se cruzan en las mismas fechas, porque no hay un servidor que lleve la disponibilidad.

## Estructura del proyecto

```
public/assets/
├── data/           marketplace-data.json
└── images/         fotos de los alojamientos
src/
├── index.html      carga de las librerías y la fuente
├── styles.css      tema oscuro y estilos compartidos
└── app/
    ├── components/
    ├── models/
    └── services/
```

| Componente | Qué hace |
|---|---|
| `navbarcomponent` | Barra de navegación |
| `footercomponent` | Pie de página, con las ciudades del catálogo |
| `iniciocomponent` | Página inicial |
| `listacomponent` | Listado y filtros |
| `tarjetacomponent` | Tarjeta de un alojamiento, usada en el inicio y en el listado |
| `detallecomponent` | Detalle del alojamiento |
| `cotizacioncomponent` | Formulario y resultado de la cotización, con la conversión de divisas |
| `simulacionreservacomponent` | Formulario para confirmar la reserva |
| `consultareservacomponent` | Mis reservas |

| Servicio | Qué hace |
|---|---|
| `AlojamientoService` | Lee el JSON y entrega los alojamientos activos, los destacados, los resultados de los filtros, las ciudades, los tipos y las reseñas |
| `CotizacionService` | Valida los datos de la cotización y calcula sus valores |
| `ReservaService` | Guarda y consulta las reservas en el `localStorage` |
| `DivisaService` | Consulta las tasas de cambio |

Los componentes no hacen peticiones HTTP ni leen el JSON o el `localStorage` por su cuenta; todo pasa por los servicios.
