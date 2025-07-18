
import type { Car } from './types';

export const cars: Car[] = [
  {
    id: 4,
    name: 'Kia Picanto',
    description: 'Pequeño, ágil y fácil de estacionar. La mejor opción para moverse por calles estrechas.',
    pricePerDay: 50,
    originalPricePerDay: 57,
    imageUrl: '/images/kia-picanto2.jpg',
    imageUrls: [
      '/images/kia-picanto2.jpg',
      '/images/kia-picanto1.jpg',
      '/images/kia-picanto3.jpg',
      '/images/kia-picanto4.jpg',
      '/images/kia-picanto5.jpg',
      '/images/kia-picanto6.jpg'
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
  {
    id: 5,
    name: 'Dongfeng Aeolus Yixuan',
    description: 'Un sedán moderno y espacioso, ideal para viajes cómodos en carretera.',
    pricePerDay: 100,
    originalPricePerDay: 110,
    imageUrl: '/images/Dongfeng Aeolus Yixuan.jpg',
    imageHint: 'sedan white',
    features: ['4 Puertas', '5 Pasajeros', 'Automático', 'Gasolina', 'Clima', 'Maletero', 'Seguro incluido'],
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
  }
];
