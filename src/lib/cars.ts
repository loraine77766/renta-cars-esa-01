
import type { Car } from './types';

export const cars: Car[] = [
  {
    id: 4,
    name: 'Kia Picanto',
    description: 'Pequeño, ágil y fácil de estacionar. La mejor opción para moverse por calles estrechas.',
    pricePerDay: 50,
    originalPricePerDay: 57,
    imageUrl: '/images/images/kia-picanto2.jpg',
    imageUrls: [
      '/images/images/kia-picanto2.jpg',
      '/images/images/kia-picanto1.jpg',
      '/images/images/kia-picanto3.jpg',
      '/images/images/kia-picanto4.jpg',
      '/images/images/kia-picanto5.jpg',
      '/images/images/kia-picanto6.jpg'
    ],
    imageHint: 'hatchback blue',
    features: ['4 Puertas', '4 Pasajeros', 'Automático', 'Gasolina', 'Clima', 'Maletero', 'Seguro incluido', 'Chapa ESA'],
    details: {
      additionalCharges: [
        'Los cargos adicionales son abonados directamente a la compañía rentadora mediante tarjeta en el momento a la apertura del contrato. No se admitirán pagos en efectivo.'
      ],
      notIncluded: [
        'Conductor adicional (Max. 2, precio por chofer por día: 3.50 USD).',
        'Depósito de garantía.'
      ],
      included: [
        'Seguro diario.',
        'Depósito de Combustible.',
        'Tasa de Aeropuerto (20.00 USD si aplica).'
      ],
      pickupAndDropoff: [
        'Si su hora de DEVOLUCIÓN al momento de reservar es más de 4 horas que su hora de RECOGIDA el sistema cargara 1 día adicional a su reserva automáticamente. Asegúrese de entregar el auto a la hora establecida.'
      ],
      notes: [
        'A conductores entre 21-24 años y 75-80 años de edad se le incrementará el costo del seguro en un 50%.',
        'RentCubaCar solo confirma categorías, no marcas y/o modelos específicos.',
        'Mínimo de renta: 5 días.',
        'Costo de seguro por día: $30.00 USD.',
        'Costo de combustible (única vez): $65.00 USD.'
      ]
    }
  },
  {
    id: 5,
    name: 'Dongfeng Aeolus Yixuan',
    description: 'Un sedán moderno y espacioso, ideal para viajes cómodos en carretera.',
    pricePerDay: 100,
    originalPricePerDay: 110,
    imageUrl: '/images/images/Dongfeng Aeolus Yixuan.png',
    imageHint: 'sedan white',
    features: ['4 Puertas', '5 Pasajeros', 'Automático', 'Gasolina', 'Clima', 'Maletero', 'Seguro incluido', 'Chapa ESA'],
    details: {
      additionalCharges: [
        'Los cargos adicionales son abonados directamente a la compañía rentadora mediante tarjeta en el momento a la apertura del contrato. No se admitirán pagos en efectivo.'
      ],
      notIncluded: [
        'Conductor adicional (Max. 2, precio por chofer por día: 3.50 USD).',
        'Depósito de garantía.'
      ],
      included: [
        'Seguro diario.',
        'Depósito de Combustible.',
        'Tasa de Aeropuerto (20.00 USD si aplica).'
      ],
      pickupAndDropoff: [
        'Si su hora de DEVOLUCIÓN al momento de reservar es más de 4 horas que su hora de RECOGIDA el sistema cargara 1 día adicional a su reserva automáticamente. Asegúrese de entregar el auto a la hora establecida.'
      ],
      notes: [
        'A conductores entre 21-24 años y 75-80 años de edad se le incrementará el costo del seguro en un 50%.',
        'RentCubaCar solo confirma categorías, no marcas y/o modelos específicos.',
        'Mínimo de renta: 5 días.',
        'Costo de seguro por día: $35.00 USD.',
        'Costo de combustible (única vez): $78.00 USD.'
      ]
    }
  },
  {
    id: 6,
    name: 'Hyundai Grand I10',
    description: 'Un auto compacto y confiable, perfecto para la ciudad y viajes cortos.',
    pricePerDay: 80,
    originalPricePerDay: 90,
    imageUrl: '/images/images/Hyundai Grand I10.jpg',
    imageHint: 'hatchback silver',
    features: ['4 Puertas', '4 Pasajeros', 'Mecánico', 'Gasolina', 'Clima', 'Maletero', 'Seguro incluido', 'Chapa ESA'],
    details: {
      additionalCharges: [
        'Los cargos adicionales son abonados directamente a la compañía rentadora mediante tarjeta en el momento a la apertura del contrato. No se admitirán pagos en efectivo.'
      ],
      notIncluded: [
        'Conductor adicional (Max. 2, precio por chofer por día: 3.50 USD).',
        'Depósito de garantía.'
      ],
      included: [
        'Seguro diario.',
        'Depósito de Combustible.',
        'Tasa de Aeropuerto (20.00 USD si aplica).'
      ],
      pickupAndDropoff: [
        'Si su hora de DEVOLUCIÓN al momento de reservar es más de 4 horas que su hora de RECOGIDA el sistema cargara 1 día adicional a su reserva automáticamente. Asegúrese de entregar el auto a la hora establecida.'
      ],
      notes: [
        'A conductores entre 21-24 años y 75-80 años de edad se le incrementará el costo del seguro en un 50%.',
        'RentCubaCar solo confirma categorías, no marcas y/o modelos específicos.',
        'Mínimo de renta: 5 días.',
        'Costo de seguro por día: $25.00 USD.',
        'Costo de combustible (única vez): $59.00 USD.'
      ]
    }
  },
  {
    id: 7,
    name: 'Hyundai Accent',
    description: 'Un sedán confiable y eficiente, ideal para familias y viajes largos.',
    pricePerDay: 90,
    imageUrl: '/images/images/Hyundai Accent.jpg',
    imageHint: 'sedan silver',
    features: ['4 Puertas', '5 Pasajeros', 'Mecánico', 'Gasolina', 'Clima', 'Maletero', 'Seguro incluido', 'Chapa ESA'],
    details: {
      additionalCharges: [
        'Los cargos adicionales son abonados directamente a la compañía rentadora mediante tarjeta en el momento a la apertura del contrato. No se admitirán pagos en efectivo.'
      ],
      notIncluded: [
        'Conductor adicional (Max. 2, precio por chofer por día: 3.50 USD).',
        'Depósito de garantía.'
      ],
      included: [
        'Seguro diario.',
        'Depósito de Combustible.',
        'Tasa de Aeropuerto (20.00 USD si aplica).'
      ],
      pickupAndDropoff: [
        'Si su hora de DEVOLUCIÓN al momento de reservar es más de 4 horas que su hora de RECOGIDA el sistema cargara 1 día adicional a su reserva automáticamente. Asegúrese de entregar el auto a la hora establecida.'
      ],
      notes: [
        'A conductores entre 21-24 años y 75-80 años de edad se le incrementará el costo del seguro en un 50%.',
        'RentCubaCar solo confirma categorías, no marcas y/o modelos específicos.',
        'Mínimo de renta: 5 días.',
        'Costo de seguro por día: $30.00 USD.',
        'Costo de combustible (única vez): $70.00 USD.'
      ]
    }
  },
  {
    id: 8,
    name: 'Hyundai Cantus',
    description: 'Un vehículo versátil y moderno, perfecto para cualquier aventura.',
    pricePerDay: 115,
    imageUrl: '/images/images/hyundai_cabtus.jpg',
    imageHint: 'suv modern',
    features: ['4 Puertas', '5 Pasajeros', 'Automático', 'Gasolina', 'Clima', 'Maletero', 'Seguro incluido', 'Chapa ESA'],
    details: {
      additionalCharges: [
        'Los cargos adicionales son abonados directamente a la compañía rentadora mediante tarjeta en el momento a la apertura del contrato. No se admitirán pagos en efectivo.'
      ],
      notIncluded: [
        'Conductor adicional (Max. 2, precio por chofer por día: 3.50 USD).',
        'Depósito de garantía.'
      ],
      included: [
        'Seguro diario.',
        'Depósito de Combustible.',
        'Tasa de Aeropuerto (20.00 USD si aplica).'
      ],
      pickupAndDropoff: [
        'Si su hora de DEVOLUCIÓN al momento de reservar es más de 4 horas que su hora de RECOGIDA el sistema cargara 1 día adicional a su reserva automáticamente. Asegúrese de entregar el auto a la hora establecida.'
      ],
      notes: [
        'A conductores entre 21-24 años y 75-80 años de edad se le incrementará el costo del seguro en un 50%.',
        'RentCubaCar solo confirma categorías, no marcas y/o modelos específicos.',
        'Mínimo de renta: 5 días.',
        'Costo de seguro por día: $35.00 USD.',
        'Costo de combustible (única vez): $78.00 USD.'
      ]
    }
  }
];
