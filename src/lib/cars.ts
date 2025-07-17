import type { Car } from './types';

export const cars: Car[] = [
  {
    id: 1,
    name: 'Geely CK',
    description: 'Un sedán económico y confiable, ideal para recorrer la ciudad y sus alrededores.',
    pricePerDay: 50,
    imageUrl: 'https://images.unsplash.com/photo-1617469723732-d5462639e3a6?q=80&w=2070&auto=format&fit=crop',
    imageHint: 'sedan white',
    features: ['4 Puertas', 'Aire Acondicionado', 'Transmisión Manual', '5 Pasajeros'],
  },
  {
    id: 2,
    name: 'MG 3',
    description: 'Moderno y compacto, perfecto para parejas o viajeros solos que buscan eficiencia.',
    pricePerDay: 60,
    imageUrl: 'https://images.unsplash.com/photo-1595434112631-fb3876931754?q=80&w=1974&auto=format&fit=crop',
    imageHint: 'hatchback red',
    features: ['5 Puertas', 'Aire Acondicionado', 'Transmisión Automática', '5 Pasajeros'],
  },
  {
    id: 3,
    name: 'BYD F3',
    description: 'Un vehículo familiar espacioso con un rendimiento de combustible excelente.',
    pricePerDay: 55,
    imageUrl: 'https://images.unsplash.com/photo-1588227189157-1b0a70514169?q=80&w=2070&auto=format&fit=crop',
    imageHint: 'sedan silver',
    features: ['4 Puertas', 'Aire Acondicionado', 'Transmisión Manual', '5 Pasajeros'],
  },
  {
    id: 5,
    name: 'Hyundai Grand i10',
    description: 'Un hatchback versátil que combina comodidad y estilo para una experiencia de manejo superior.',
    pricePerDay: 65,
    imageUrl: 'https://images.unsplash.com/photo-1589529233629-65239a797a7a?q=80&w=2070&auto=format&fit=crop',
    imageHint: 'hatchback white',
    features: ['5 Puertas', 'Aire Acondicionado', 'Transmisión Automática', '5 Pasajeros'],
  },
  {
    id: 6,
    name: 'Geely Emgrand',
    description: 'Un sedán de lujo con amplio espacio interior y todas las comodidades modernas.',
    pricePerDay: 80,
    imageUrl: 'https://images.unsplash.com/photo-1627589201884-245350324888?q=80&w=1964&auto=format&fit=crop',
    imageHint: 'sedan black luxury',
    features: ['4 Puertas', 'Aire Acondicionado', 'Transmisión Automática', '5 Pasajeros'],
  },
  {
    id: 4,
    name: 'Kia Picanto',
    description: 'Pequeño, ágil y fácil de estacionar. La mejor opción para moverse por calles estrechas.',
    pricePerDay: 50,
    imageUrl: 'https://images.unsplash.com/photo-1606555541819-0b135c364125?q=80&w=2070&auto=format&fit=crop',
    imageHint: 'hatchback blue',
    features: ['4 Puertas', '4 Pasajeros', 'Automático', 'Gasolina', 'Clima', 'Maletero', 'Seguro incluido'],
    details: {
      additionalCharges: [
        'Los cargos adicionales son abonados directamente a la compañía rentadora mediante tarjeta en el momento a la apertura del contrato. No se admitirán pagos en efectivo.'
      ],
      notIncluded: [
        'Conductor adicional (Max. 2, precio por chofer por día: 2 USD).',
        'Depósito de garantía.'
      ],
      included: [
        'Seguro diario.',
        'Depósito de Combustible.',
        'Tasa de Aeropuerto.'
      ],
      pickupAndDropoff: [
        'Si su hora de DEVOLUCIÓN es más de 4 horas después de su hora de RECOGIDA, se cargará 1 día adicional automáticamente. Asegúrese de entregar el auto a la hora establecida.'
      ],
      notes: [
        'A conductores entre 21-24 años y 75-80 años de edad se le incrementará el costo del seguro en un 50%.',
        'RentCubaCar solo confirma categorías, no marcas y/o modelos específicos.',
        'El precio final podría variar en dependencia de la disponibilidad y oferta.',
        'Mínimo de renta: 7 días.'
      ]
    }
  },
];
