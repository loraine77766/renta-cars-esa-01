import type { Car } from './types';

export const cars: Car[] = [
  {
    id: 1,
    name: 'Mercedes E200',
    description: 'Experimenta el lujo y el rendimiento con este sedán premium, ideal para negocios o placer.',
    pricePerDay: 180,
    originalPricePerDay: 230,
    imageUrl: '/images/images/mercedese200.jpg',
    imageHint: 'sedan luxury white',
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
        'A conductores entre 21-24 años y 74-80 años de edad se le incrementará el costo del seguro en un 50%.',
        'Renta Cars ESA solo confirma categorías, no marcas y/o modelos específicos.',
        'Mínimo de renta: 3 días.',
        'Costo de seguro por día: $45.00 USD.',
        'Costo de combustible (única vez): $72.00 USD.'
      ]
    }
  },
  {
    id: 12,
    name: 'Bestune T90',
    description: 'Un SUV espacioso y lujoso, perfecto para viajes largos con la familia.',
    pricePerDay: 140,
    originalPricePerDay: 150,
    imageUrl: '/images/images/t90.jpg',
    imageHint: 'suv luxury white',
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
        'Renta Cars ESA solo confirma categorías, no marcas y/o modelos específicos.',
        'Mínimo de renta: 3 días.',
        'Costo de seguro por día: $30.00 USD.',
        'Costo de combustible (única vez): $65.00 USD.'
      ]
    }
  },
  {
    id: 11,
    name: 'Hyundai Elantra',
    description: 'Un sedán elegante y eficiente, perfecto para una conducción cómoda y con estilo.',
    pricePerDay: 95,
    originalPricePerDay: 134,
    imageUrl: '/images/images/HyundaiElantra.jpg',
    imageHint: 'sedan gray elegant',
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
        'Renta Cars ESA solo confirma categorías, no marcas y/o modelos específicos.',
        'Mínimo de renta: 3 días.',
        'Costo de seguro por día: $40.00 USD.',
        'Costo de combustible (única vez): $72.00 USD.'
      ]
    }
  },
  {
    id: 10,
    name: 'Dongfeng Shine Max',
    description: 'Un sedán premium, espacioso y con tecnología de punta para un viaje de lujo.',
    pricePerDay: 120,
    originalPricePerDay: 165,
    imageUrl: '/images/images/DongfengShinemax.jpg',
    imageHint: 'sedan luxury black',
    features: ['5 Puertas', '5 Pasajeros', 'Automático', 'Gasolina', 'Clima', 'Maletero', 'Seguro incluido', 'Chapa ESA'],
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
        'Renta Cars ESA solo confirma categorías, no marcas y/o modelos específicos.',
        'Mínimo de renta: 3 días.',
        'Costo de seguro por día: $40.00 USD.',
        'Costo de combustible (única vez): $40.00 USD.'
      ]
    }
  },
  {
    id: 16,
    name: 'SWM G05',
    description: 'Un SUV espacioso y versátil con capacidad para 7 pasajeros, ideal para familias y grupos grandes.',
    pricePerDay: 120,
    imageUrl: '/images/images/swm-g05.jpeg',
    imageHint: 'suv family white',
    features: ['7 Pasajeros', 'Automático', 'Motor 1.5L Turbo', 'Gasolina', 'Clima', 'Techo Panorámico', 'Pantalla Táctil 12"', 'Chapa ESA'],
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
        'Renta Cars ESA solo confirma categorías, no marcas y/o modelos específicos.',
        'Mínimo de renta: 3 días.',
        'Costo de seguro por día: $35.00 USD.',
        'Costo de combustible (única vez): $75.00 USD.'
      ]
    }
  },
  {
    id: 4,
    name: 'Kia Picanto',
    description: 'Pequeño, ágil y fácil de estacionar. La mejor opción para moverse por calles estrechas.',
    pricePerDay: 50,
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
        'Renta Cars ESA solo confirma categorías, no marcas y/o modelos específicos.',
        'Mínimo de renta: 3 días.',
        'Costo de seguro por día: $30.00 USD.',
        'Costo de combustible (única vez): $65.00 USD.'
      ]
    }
  },
  {
    id: 15,
    name: 'Toyota Corolla',
    description: 'Un sedán confiable y popular, conocido por su comodidad, eficiencia y excelentes prestaciones.',
    pricePerDay: 75,
    imageUrl: '/images/images/ToyotaCorola.jpg',
    imageHint: 'sedan modern white',
    features: ['5 Pasajeros', 'Automático', 'Bueno aire', 'Bueno audio', 'Neumáticos en perfecto estado', 'Gato hidráulico', 'Cámara(delantera y trasera)', 'Tanque lleno', 'Tarjeta de combustible 100 lt'],
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
        'Renta Cars ESA solo confirma categorías, no marcas y/o modelos específicos.',
        'Mínimo de renta: 3 días.',
        'Costo de seguro por día: $30.00 USD.',
        'Costo de combustible (única vez): $65.00 USD.'
      ]
    }
  },
  {
    id: 9,
    name: 'Bestune T55',
    description: 'Un SUV elegante y bien equipado, que ofrece una experiencia de conducción superior.',
    pricePerDay: 120,
    originalPricePerDay: 140,
    imageUrl: '/images/images/bestuneT55.jpg',
    imageHint: 'suv gray',
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
        'Renta Cars ESA solo confirma categorías, no marcas y/o modelos específicos.',
        'Mínimo de renta: 3 días.',
        'Costo de seguro por día: $30.00 USD.',
        'Costo de combustible (única vez): $75.00 USD.'
      ]
    }
  }
];