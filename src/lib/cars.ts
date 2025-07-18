
import type { Car } from './types';

export const cars: Car[] = [
  {
    id: 1,
    name: 'Geely CK',
    description: 'Un sedán económico y confiable, ideal para recorrer la ciudad y sus alrededores.',
    pricePerDay: 50,
    imageUrl: '/images/geely-ck.jpg',
    imageHint: 'sedan white',
    features: ['4 Puertas', 'Aire Acondicionado', 'Transmisión Manual', '5 Pasajeros'],
  },
  {
    id: 2,
    name: 'MG 3',
    description: 'Moderno y compacto, perfecto para parejas o viajeros solos que buscan eficiencia.',
    pricePerDay: 60,
    imageUrl: '/images/mg-3.jpg',
    imageHint: 'hatchback red',
    features: ['5 Puertas', 'Aire Acondicionado', 'Transmisión Automática', '5 Pasajeros'],
  },
  {
    id: 3,
    name: 'BYD F3',
    description: 'Un vehículo familiar espacioso con un rendimiento de combustible excelente.',
    pricePerDay: 55,
    imageUrl: '/images/byd-f3.jpg',
    imageHint: 'sedan silver',
    features: ['4 Puertas', 'Aire Acondicionado', 'Transmisión Manual', '5 Pasajeros'],
  },
  {
    id: 5,
    name: 'Hyundai Grand i10',
    description: 'Un hatchback versátil que combina comodidad y estilo para una experiencia de manejo superior.',
    pricePerDay: 65,
    imageUrl: '/images/hyundai-grand-i10.jpg',
    imageHint: 'hatchback white',
    features: ['5 Puertas', 'Aire Acondicionado', 'Transmisión Automática', '5 Pasajeros'],
  },
  {
    id: 6,
    name: 'Geely Emgrand',
    description: 'Un sedán de lujo con amplio espacio interior y todas las comodidades modernas.',
    pricePerDay: 80,
    imageUrl: '/images/geely-emgrand.jpg',
    imageHint: 'sedan black luxury',
    features: ['4 Puertas', 'Aire Acondicionado', 'Transmisión Automática', '5 Pasajeros'],
  },
  {
    id: 4,
    name: 'Kia Picanto',
    description: 'Pequeño, ágil y fácil de estacionar. La mejor opción para moverse por calles estrechas.',
    pricePerDay: 50,
    originalPricePerDay: 57,
    imageUrl: '/images/images/kia-picanto1.jpg',
    imageUrls: [
      '/images/images/kia-picanto1.jpg',
      '/images/images/kia-picanto2.jpg',
      '/images/images/kia-picanto3.jpg',
      '/images/images/kia-picanto4.jpg',
      '/images/images/kia-picanto5.jpg',
      '/images/images/kia-picanto6.jpg'
    ],
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
        'Si su hora de DEVOLUCIÓN al momento de reservar es más de 4 horas que su hora de RECOGIDA el sistema cargara 1 día adicional a su reserva automáticamente. Asegúrese de entregar el auto a la hora establecida.'
      ],
      notes: [
        'A conductores entre 21-24 años y 75-80 años de edad se le incrementará el costo del seguro en un 50%.',
        'RentCubaCar solo confirma categorías, no marcas y/o modelos específicos.',
        'El precio final podría variar en dependencia de la disponibilidad y oferta.',
        'Mínimo de renta: 5 días.'
      ]
    }
  },
];
