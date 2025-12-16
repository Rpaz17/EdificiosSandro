# Edificios Sandro – Sistema de Gestión de Alquileres

## Descripción
El proyecto **Edificios Sandro** consiste en el desarrollo de un sistema web orientado a la **gestión administrativa de apartamentos en alquiler**.  
La plataforma permite controlar clientes, contratos, pagos, comprobantes y mantenimientos, integrando un sistema de autenticación por roles y notificaciones automáticas para mejorar la comunicación entre usuarios y administradores.

El sistema fue desarrollado aplicando buenas prácticas de experiencia de usuarios, separación de responsabilidades y arquitectura cliente–servidor. 

Proyecto implementado para la clase de **Experiencia de Usuarios** con código de clase **575** en la **Universidad Tecnológica Centroamericana**

---

## Equipo de Trabajo

| Nombre | Número de Cuenta |
|------|-------------------|
| Sandro Fernandez | 22141204 |
| Rebeca Paz | 22241028 |
| Daniel David | 22241015 |

---

## Objetivos

### Objetivo General
Desarrollar un sistema web que permita administrar de manera eficiente los procesos relacionados con el alquiler de apartamentos, facilitando el control, la trazabilidad y la comunicación entre clientes y administradores.

### Objetivos Específicos
- Implementar un sistema de autenticación seguro basado en roles.
- Gestionar clientes, contratos, pagos y comprobantes de forma centralizada.
- Automatizar notificaciones para eventos clave del sistema.
- Registrar y dar seguimiento a mantenimientos de apartamentos.
- Diseñar una interfaz web clara, intuitiva y adaptable a diferentes dispositivos.

---

## Arquitectura del Sistema

El sistema sigue una arquitectura **cliente–servidor**, organizada de la siguiente manera:

- **Frontend:** React 18, Vite, Tailwind CSS  
- **Backend:** Node.js con Express  
- **ORM:** Sequelize  
- **Base de Datos:** PostgreSQL  
- **Autenticación:** JWT (JSON Web Tokens)  
- **Notificaciones:** Sistema interno basado en base de datos  
- **Documentación de API:** Swagger  
- **Infraestructura:** Docker y Docker Compose  

Esta arquitectura permite escalabilidad, mantenibilidad y una clara separación de responsabilidades.

---

## Instalación Local

### Requisitos
- Node.js (v18 o superior)
- Docker y Docker Compose
- PostgreSQL
- Git

### Pasos de Instalación

1. Clonar el repositorio:
```bash
git clone (https://github.com/Rpaz17/EdificiosSandro.git)
cd edificios-sandro
```
2. Configurar las variables de entorno:
- Crear los archivos .env en el frontend y backend según el ejemplo proporcionado.

3. Ejecutar el backend:
```bash
cd backend
npm install
npm install bcryptjs
Npm install multer
npm install swagger-jsdoc swagger-ui-express
docker compose up -d backend db
```
4. Ejecutar el frontend:
```bash
cd frontend
npm install
npm install react-router-dom
npm install -D tailwindcss@3 postcss autoprefixer
npm install axios
npm run dev
```
5. Acceso al sistema:
Frontend: http://localhost:5173
Backend: http://localhost:3000
Documentación API (Swagger): http://localhost:3000/api-docs

## Enlace de Gestión del Proyecto (Trello)
https://trello.com/b/2uon1RFQ/edificios-sandro

## Conclusiones
El desarrollo del sistema Edificios Sandro permitió aplicar conocimientos teóricos y prácticos relacionados con desarrollo web, bases de datos, seguridad y arquitectura de software.
La implementación de autenticación por roles y notificaciones automáticas mejora la experiencia del usuario y la eficiencia operativa del sistema.
El proyecto cumple con los objetivos planteados y sienta las bases para futuras mejoras y ampliaciones funcionales.
 
