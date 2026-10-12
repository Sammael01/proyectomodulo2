# Marketplace de Alojamientos

Aplicación web para explorar alojamientos temporales de Inversiones LR antes de reservarlos. El huésped puede buscar y filtrar alojamientos, ver el detalle de cada uno, cotizar una estancia y registrar una reserva simulada.

Esta primera versión corresponde solo al frontend: no hay backend. El catálogo se lee desde un archivo JSON y las reservas se guardan en el navegador.

Proyecto de curso desarrollado en la Universidad El Bosque.

## Integrantes

- Samuel Parada
- Samuel Contreras
- Sebastian Hernandez
- Santiago

## Tecnologías

- Angular 22
- TypeScript
- Bootstrap 5.3
- Font Awesome 7
- animate.css
- ExchangeRate-API, para mostrar el total de la cotización en otras monedas

## Requisitos

- Node.js 24.15 o superior, con npm.
- Git, para clonar el repositorio.

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

Luego se abre `http://localhost:4200` en el navegador.

`npm start` ejecuta `ng serve` sin necesidad de tener el Angular CLI instalado de forma global.

Para correr las pruebas unitarias:

```bash
npm test
```

## Funcionalidades

- **Página inicial:** presentación de la plataforma, alojamientos destacados y acceso a la búsqueda.
- **Listado de alojamientos:** muestra los alojamientos activos con su imagen, ciudad, tipo, capacidad, precio por noche, calificación y servicios.
- **Búsqueda y filtros:** por ciudad, número de huéspedes, tipo de alojamiento y precio máximo, con opción para limpiar los filtros.
- **Detalle del alojamiento:** descripción, ubicación, habitaciones, camas, baños, servicios, reglas, imágenes y reseñas.
- **Cotización:** a partir de las fechas y el número de huéspedes calcula las noches, el subtotal, la tarifa de limpieza, la tarifa de servicio (10 % del subtotal) y el total. También muestra el total aproximado en dólares o euros, solo como referencia.
- **Reserva:** después de una cotización válida, el huésped ingresa su nombre y correo y la reserva queda registrada como confirmada.
- **Mis reservas:** lista las reservas realizadas desde el navegador, o un mensaje si todavía no hay ninguna.

## Datos y persistencia

- **Catálogo:** los alojamientos y las reseñas están en `public/assets/data/marketplace-data.json`. Es de solo lectura y se consulta siempre a través de un servicio, nunca directamente desde los componentes.
- **Reservas:** se guardan en el `localStorage` del navegador. Se conservan al recargar la página, pero no se comparten entre navegadores ni equipos, y se pierden si se borran los datos del sitio.

## Estructura del proyecto

```
public/
└── assets/
    ├── data/        archivo JSON con alojamientos y reseñas
    └── images/      imágenes de los alojamientos
src/
└── app/
    ├── components/  vistas y partes de la interfaz
    ├── models/      interfaces que describen los datos
    └── services/    consulta del catálogo, cotización, manejo de reservas y divisas
```
