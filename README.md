# Proyecto Angular - Aplicación de Consulta y Conversión de Divisas

## Tabla de Contenidos
1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Características](#características)
3. [Requisitos del Sistema](#requisitos-del-sistema)
4. [Instalación](#instalación)
5. [Configuración](#configuración)
6. [Estructura del Proyecto](#estructura-del-proyecto)
7. [Uso](#uso)
8. [Rutas del Proyecto](#rutas-del-proyecto)
9. [Componentes Principales](#componentes-principales)
10. [Servicios](#servicios)
11. [Internacionalización](#internacionalización)
12. [Recargar Página](#recargar-página)
13. [Contribución](#contribución)
14. [Licencia](#licencia)

## Descripción del Proyecto
Esta es una aplicación Angular diseñada para realizar consultas de clima y conversión de divisas basadas en la selección del país y la ciudad. La aplicación se conecta a varias APIs para obtener datos actualizados sobre el clima y las tasas de cambio de divisas.

## Características
- Selección de país y ciudad.
- Consulta de clima basada en la ciudad seleccionada.
- Conversión de divisas.
- Historial de las últimas 5 consultas.
- Internacionalización (soporte para múltiples idiomas).

## Requisitos del Sistema
- Node.js (v12 o superior)
- Angular CLI (v10 o superior)
- Servidor API (por ejemplo, una instancia de servidor Laravel)

## Instalación
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/tu_usuario/tu_repositorio.git

2. Navegar al directorio del proyecto:
  ```sh
   cd tu_repositorio

3. Instalar las dependencias:
  ```sh
  npm install

## Configuración
1. Configura las variables de entorno en el archivo environment.ts:
  ```javascript
  export const environment = {
    production: false,
    baseUrl: 'http://127.0.0.1:8000/api', // URL de tu servidor API
    weatherApiKey: 'TU_API_KEY_WEATHER',
    convertApiKey: 'TU_API_KEY_CONVERT'
  };
  ```
## Estructura del Proyecto

src/app/components: Contiene los componentes del proyecto.
src/app/services: Contiene los servicios para las llamadas a las APIs.
src/assets/i18n: Contiene los archivos de internacionalización.

## Uso
  
  ```sh
  ng serve

Navega a http://localhost:4200/ en tu navegador.

## Rutas del Proyecto

  ```javascript
    const routes: Routes = [
      { path: '', component: HomeComponent },
      { path: 'record', component: RecordComponent },
      // otras rutas...
    ];

  ```

## Componentes Principales

# HomeComponent
Maneja la selección de país y ciudad, y la consulta del clima.

# RecordComponent
Muestra el historial de las últimas 5 consultas

## Servicios

# LocationService
Maneja las llamadas a las APIs para obtener países, ciudades, clima y conversiones de divisas.

```javascript
    @Injectable({
    providedIn: 'root'
    })
    export class LocationService {
      constructor(private http: HttpClient) {}

      getCountries(): Observable<any> {
        return this.http.get(`${environment.baseUrl}/country`);
      }

      getCities(): Observable<any> {
        return this.http.get(`${environment.baseUrl}/city`);
      }

      getWeather(cityName: string): Observable<any> {
        const params = new HttpParams().set('key', environment.weatherApiKey).set('q', cityName);
        return this.http.get(`${environment.weatherUrl}`, { params });
      }

      convertDivisas(from: string, to: string, amount: number): Observable<any> {
        return this.http.get(`${environment.convertApiUrl}/pair/${from}/${to}/${amount}`);
      }

      getAllQueries(): Observable<any> {
        return this.http.get(`${environment.baseUrl}/all-data`);
      }
    }
  ```

## Internacionalización

La aplicación soporta múltiples idiomas. Los archivos de traducción se encuentran en src/assets/i18n.
## Ejemplo de archivo de traducción (es.json)

  ```javascript
    {
      "SELECCIONA_LENGUAJE": "Selecciona un idioma",
      "PLAN_YOUR_ADVENTURE": "Planifica tu aventura",
      "DISCOVER_WEATHER_BUDGET": "Descubre el clima y el presupuesto para tu próximo destino emocionante."
    }
  ```

## Ejemplo de archivo de traducción (de.json)
  ```javascript
    {
      "SELECCIONA_LENGUAJE": "Wählen Sie eine Sprache",
      "PLAN_YOUR_ADVENTURE": "Plane deine Abenteuer",
      "DISCOVER_WEATHER_BUDGET": "Entdecke das Wetter und das nötige Budget für dein nächstes aufregendes Reiseziel."
    }
  ```

## Contribución
Las contribuciones son bienvenidas. Por favor, sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (git checkout -b feature/nueva-caracteristica).
3. Haz tus cambios (git commit -am 'Añadir nueva característica').
4. Sube los cambios (git push origin feature/nueva-caracteristica).
5. Abre un Pull Request.
