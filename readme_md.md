# StructCalc - Calculadora de Estructuras Metálicas

Una calculadora profesional para el peso y costo de estructuras metálicas con perfiles estándar mexicanos.

## 🚀 Características

- ✅ Base de datos completa de perfiles estándar mexicanos (IPR, IPS, Ángulos, Canales, Tubos)
- ✅ Cálculo automático de peso por elemento y total
- ✅ Estimación de costos en tiempo real
- ✅ Generación de reportes descargables
- ✅ Interfaz moderna y responsive
- ✅ Optimizado para dispositivos móviles

## 🛠️ Tecnologías

- **Next.js 14** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **Lucide React** - Iconos modernos

## 📋 Perfiles Soportados

### IPR (Vigas I)
- 100x50, 120x64, 150x75, 200x100, 250x125, 300x150, 350x175, 400x200

### IPS (Vigas H)
- 76x76, 102x102, 127x127, 152x152, 203x203, 254x254, 305x305

### Ángulos
- 25x25x3, 38x38x5, 51x51x6, 64x64x6, 76x76x8, 102x102x10, 127x127x13

### Canales
- 76x38, 102x51, 127x64, 152x76, 203x89, 254x102, 305x102

### Tubos Rectangulares
- 40x20x2, 50x25x2, 60x40x3, 80x40x3, 100x50x4, 120x60x4, 150x100x5

### Tubos Circulares
- 25x2, 32x2, 51x3, 76x3, 102x4, 152x5, 203x6

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 18.0 o superior
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/tuusuario/structcalc.git
cd structcalc

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

### Scripts disponibles
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Compilar para producción
npm run start    # Ejecutar build de producción
npm run lint     # Verificar código con ESLint
```

## 🌐 Despliegue en Vercel

### Opción 1: Desde GitHub (Recomendado)
1. Subir el código a tu repositorio de GitHub
2. Conectar tu cuenta de GitHub con Vercel
3. Importar el proyecto desde Vercel Dashboard
4. Vercel detectará automáticamente que es un proyecto Next.js
5. ¡Listo! Tu aplicación estará disponible en una URL de Vercel

### Opción 2: CLI de Vercel
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Para producción
vercel --prod
```

## 📱 Uso

1. **Agregar elementos**: Haz clic en "Agregar elemento" para añadir perfiles metálicos
2. **Configurar perfiles**: Selecciona tipo de perfil, dimensiones, longitud y cantidad
3. **Ajustar precio**: Modifica el precio por kg del acero según el mercado actual
4. **Ver resultados**: Observa el peso total y costo estimado en tiempo real
5. **Generar reporte**: Descarga un archivo de texto con el resumen completo

## 🔧 Personalización

### Agregar nuevos perfiles
Edita el objeto `profiles` en `components/SteelWeightCalculator.tsx`:

```typescript
const profiles = {
  'Nuevo Tipo': {
    'dimensión': peso_por_metro,
    // ...más dimensiones
  }
};
```

### Modificar precio por defecto
Cambia el valor inicial en el estado:

```typescript
const [steelPrice, setSteelPrice] = useState(28); // Nuevo precio
```

## 📄 Licencia

MIT License - ver el archivo [LICENSE](LICENSE) para detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes problemas o sugerencias, por favor abre un issue en GitHub.

---

**StructCalc** - Optimizando cálculos estructurales para profesionales mexicanos 🇲🇽