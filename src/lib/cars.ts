import type { Car } from './types';

export const cars: Car[] = [
  {
    id: 1,
    name: 'Mercedes E200',
    description: 'Lujo y rendimiento premium para viajes exclusivos.',
    pricePerDay: 180,
    originalPricePerDay: 230,
    imageUrl: '/images/images/mercedese200.jpg',
    imageHint: 'sedan luxury white',
    features: ['4 Puertas', '5 Pasajeros', 'Automático', 'Gasolina', 'Clima', 'Seguro incluido', 'Chapa ESA'],
    details: {
      additionalCharges: ['Pagos en oficina solo con tarjeta.'],
      notIncluded: ['Conductor adicional ($3.50/día).', 'Depósito de garantía ($250).'],
      included: ['Seguro diario.', 'Depósito de Combustible.', 'Tasa Aeropuerto.'],
      pickupAndDropoff: ['Tolerancia de 4 horas para la devolución.'],
      notes: ['Mínimo: 3 días.', 'Seguro: $45/día.', 'Combustible: $72.']
    }
  },
  {
    id: 12,
    name: 'Bestune T90',
    description: 'SUV de lujo espacioso, ideal para familias.',
    pricePerDay: 140,
    originalPricePerDay: 150,
    imageUrl: '/images/images/t90.jpg',
    imageHint: 'suv luxury white',
    features: ['4 Puertas', '5 Pasajeros', 'Automático', 'Gasolina', 'Clima', 'Seguro incluido', 'Chapa ESA'],
    details: {
      additionalCharges: ['Pagos en oficina solo con tarjeta.'],
      notIncluded: ['Conductor adicional ($3.50/día).', 'Depósito de garantía ($250).'],
      included: ['Seguro diario.', 'Depósito de Combustible.'],
      pickupAndDropoff: ['Tolerancia de 4 horas.'],
      notes: ['Mínimo: 3 días.', 'Seguro: $30/día.', 'Combustible: $65.']
    }
  },
  {
    id: 11,
    name: 'Hyundai Elantra',
    description: 'Sedán elegante y eficiente con alto confort.',
    pricePerDay: 95,
    originalPricePerDay: 134,
    imageUrl: '/images/images/HyundaiElantra.jpg',
    imageHint: 'sedan gray elegant',
    features: ['4 Puertas', '5 Pasajeros', 'Automático', 'Gasolina', 'Clima', 'Seguro incluido', 'Chapa ESA'],
    details: {
      additionalCharges: ['Pagos solo con tarjeta.'],
      notIncluded: ['Conductor adicional.', 'Garantía $250.'],
      included: ['Seguro diario.', 'Combustible.'],
      pickupAndDropoff: ['Tolerancia 4h.'],
      notes: ['Mínimo: 3 días.', 'Seguro: $40/día.', 'Combustible: $72.']
    }
  },
  {
    id: 10,
    name: 'Dongfeng Shine Max',
    description: 'Tecnología y espacio en un sedán premium.',
    pricePerDay: 120,
    originalPricePerDay: 165,
    imageUrl: '/images/images/DongfengShinemax.jpg',
    imageHint: 'sedan luxury black',
    features: ['5 Puertas', '5 Pasajeros', 'Automático', 'Gasolina', 'Clima', 'Chapa ESA'],
    details: {
      additionalCharges: ['Tarjetas crédito/débito solamente.'],
      notIncluded: ['Garantía $250.'],
      included: ['Seguro.', 'Combustible.'],
      pickupAndDropoff: ['Retorno antes de la hora pactada.'],
      notes: ['Mínimo: 3 días.', 'Seguro: $40/día.', 'Combustible: $40.']
    }
  },
  {
    id: 16,
    name: 'SWM G05',
    description: 'SUV versátil para 7 pasajeros, ideal para grupos.',
    pricePerDay: 120,
    imageUrl: '/images/images/swm-g05.jpeg',
    imageHint: 'suv family white',
    features: ['7 Pasajeros', 'Automático', '1.5L Turbo', 'Clima', 'Chapa ESA'],
    details: {
      additionalCharges: ['Sin efectivo en Cuba.'],
      notIncluded: ['Depósito $250.'],
      included: ['Seguro.', 'Tanque lleno.'],
      pickupAndDropoff: ['Cargo extra por devolución tardía.'],
      notes: ['Mínimo: 3 días.', 'Seguro: $35/día.', 'Combustible: $75.']
    }
  },
  {
    id: 4,
    name: 'Kia Picanto',
    description: 'Económico y ágil para la ciudad.',
    pricePerDay: 50,
    imageUrl: '/images/images/kia-picanto2.jpg',
    imageHint: 'hatchback blue',
    features: ['4 Puertas', '4 Pasajeros', 'Automático', 'Gasolina', 'Clima', 'Chapa ESA'],
    details: {
      additionalCharges: ['Pagos electrónicos.'],
      notIncluded: ['Garantía $250.'],
      included: ['Seguro.', 'Combustible.'],
      pickupAndDropoff: ['4h de tolerancia.'],
      notes: ['Mínimo: 3 días.', 'Seguro: $30/día.', 'Combustible: $65.']
    }
  },
  {
    id: 15,
    name: 'Toyota Corolla',
    description: 'Confiable, moderno y muy confortable.',
    pricePerDay: 75,
    imageUrl: '/images/images/ToyotaCorola.jpg',
    imageHint: 'sedan modern white',
    features: ['5 Pasajeros', 'Automático', 'Cámara trasera', 'Tanque lleno', 'Chapa ESA'],
    details: {
      additionalCharges: ['Sin pagos en efectivo.'],
      notIncluded: ['Depósito $250.'],
      included: ['Seguro.', 'Tarjeta combustible 100L.'],
      pickupAndDropoff: ['Respetar horario contrato.'],
      notes: ['Mínimo: 3 días.', 'Seguro: $30/día.', 'Combustible: $65.']
    }
  },
  {
    id: 9,
    name: 'Bestune T55',
    description: 'SUV elegante con equipamiento superior.',
    pricePerDay: 120,
    originalPricePerDay: 140,
    imageUrl: '/images/images/bestuneT55.jpg',
    imageHint: 'suv gray',
    features: ['4 Puertas', '5 Pasajeros', 'Automático', 'Chapa ESA'],
    details: {
      additionalCharges: ['Pagos solo con tarjeta.'],
      notIncluded: ['Depósito $250.'],
      included: ['Seguro.', 'Combustible.'],
      pickupAndDropoff: ['Tolerancia 4h.'],
      notes: ['Mínimo: 3 días.', 'Seguro: $30/día.', 'Combustible: $75.']
    }
  },
  {
    id: 17,
    name: 'Hyundai Accent',
    description: 'Sedán moderno y económico para un viaje suave.',
    pricePerDay: 85,
    imageUrl: '/images/images/Hyundai Accent.jpg',
    imageHint: 'sedan white',
    features: ['4 Puertas', '5 Pasajeros', 'Automático', 'Gasolina', 'Chapa ESA'],
    details: {
      additionalCharges: ['Sin efectivo.'],
      notIncluded: ['Garantía $250.'],
      included: ['Seguro diario.'],
      pickupAndDropoff: ['4h de gracia.'],
      notes: ['Mínimo: 3 días.', 'Seguro: $35/día.']
    }
  },
  {
    id: 18,
    name: 'Hyundai Grand i10',
    description: 'Compacto eficiente y cómodo para la ciudad.',
    pricePerDay: 70,
    imageUrl: '/images/images/Hyundai Grand I10.jpg',
    imageHint: 'compact blue',
    features: ['4 Pasajeros', 'Automático', 'Económico', 'Chapa ESA'],
    details: {
      additionalCharges: ['Tarjeta necesaria.'],
      notIncluded: ['Depósito $250.'],
      included: ['Seguro diario.'],
      pickupAndDropoff: ['Devolver a la hora pactada.'],
      notes: ['Mínimo: 3 días.', 'Seguro: $30/día.']
    }
  },
  {
    id: 19,
    name: 'Hyundai Cantus',
    description: 'SUV compacta y robusta para recorrer Cuba.',
    pricePerDay: 110,
    imageUrl: '/images/images/hyundaicantus.jpg',
    imageHint: 'suv gray',
    features: ['5 Pasajeros', 'Automático', 'Motor 1.6L', 'Chapa ESA'],
    details: {
      additionalCharges: ['Solo tarjeta bancaria.'],
      notIncluded: ['Garantía $250.'],
      included: ['Seguro diario.', 'Combustible.'],
      pickupAndDropoff: ['4h de tolerancia.'],
      notes: ['Mínimo: 3 días.', 'Seguro: $40/día.']
    }
  },
  {
    id: 20,
    name: 'Kia Rio',
    description: 'Estilo y eficiencia en un sedán compacto.',
    pricePerDay: 65,
    imageUrl: '/images/images/kia-rio.jpg',
    imageHint: 'sedan silver',
    features: ['5 Pasajeros', 'Automático', 'Gasolina', 'Chapa ESA'],
    details: {
      additionalCharges: ['Pagos en Cuba solo tarjeta.'],
      notIncluded: ['Garantía $250.'],
      included: ['Seguro incluido.'],
      pickupAndDropoff: ['Sin cargos extras si cumple horario.'],
      notes: ['Mínimo: 3 días.', 'Seguro: $35/día.']
    }
  },
  {
    id: 21,
    name: 'Dongfeng Aeolus Yixuan',
    description: 'Diseño deportivo y alta tecnología para tu viaje.',
    pricePerDay: 100,
    imageUrl: '/images/images/Dongfeng Aeolus Yixuan.png',
    imageHint: 'sedan sport white',
    features: ['5 Pasajeros', 'Automático', 'Turbo', 'Chapa ESA'],
    details: {
      additionalCharges: ['Sin efectivo.'],
      notIncluded: ['Depósito $250.'],
      included: ['Seguro diario.'],
      pickupAndDropoff: ['Tolerancia 4h.'],
      notes: ['Mínimo: 3 días.', 'Seguro: $40/día.']
    }
  },
  {
    id: 22,
    name: 'Kia Stonic',
    description: 'SUV subcompacto versátil y eficiente, ideal para el entorno urbano y viajes cómodos.',
    pricePerDay: 80,
    imageUrl: '/images/images/KiaStonic.jpg',
    imageHint: 'suv crossover white',
    features: ['5 Pasajeros', 'Automático', 'Motor 1.0L/1.4L', 'Bajo Consumo', 'Chapa ESA'],
    details: {
      additionalCharges: ['Pagos en oficina solo con tarjeta.'],
      notIncluded: ['Depósito de garantía ($250).'],
      included: ['Seguro diario.', 'Bajo consumo de combustible.'],
      pickupAndDropoff: ['Tolerancia de 4 horas para la devolución.'],
      notes: ['Mínimo: 3 días.', 'Seguro: $30/día.', 'Consumo: 14-16 km/litro.']
    }
  },
  {
    id: 23,
    name: 'Hyundai Santa Fe',
    description: 'SUV de lujo potente y espacioso, perfecto para largos recorridos con el máximo confort.',
    pricePerDay: 105,
    imageUrl: '/images/images/hyundai-santa-fe.jpg',
    imageHint: 'suv luxury silver',
    features: ['7 Pasajeros', 'Transmisión Automática', 'Motor Potente', 'Espacio Amplio', 'Chapa ESA'],
    details: {
      additionalCharges: ['Pagos electrónicos obligatorios.'],
      notIncluded: ['Depósito de garantía ($250).'],
      included: ['Seguro a todo riesgo.', 'Kilometraje libre.'],
      pickupAndDropoff: ['Tolerancia horaria estándar de 4h.'],
      notes: ['Mínimo: 3 días.', 'Seguro premium incluido.', 'Confort superior.']
    }
  },
  {
    id: 24,
    name: 'Hyundai H1',
    description: 'Minibús para grupos grandes, ideal para hasta 12 pasajeros con aire acondicionado potente y motor diésel de gran rendimiento.',
    pricePerDay: 220,
    imageUrl: '/images/images/Hyundai-H1.jpg',
    imageHint: 'minibus white',
    features: ['12 Pasajeros', 'Manual', 'Diésel', 'A/C Potente', '5 Puertas', 'Chapa ESA'],
    details: {
      additionalCharges: ['Pagos en oficina solo con tarjeta.'],
      notIncluded: ['Depósito de garantía ($250).'],
      included: ['Seguro diario.', 'Kilometraje libre.'],
      pickupAndDropoff: ['Tolerancia de 4 horas.'],
      notes: ['Mínimo: 3 días.', 'Seguro: $45/día.', 'Combustible: diésel.', 'Motor 2.5L CRDi.', 'Consumo: 8.5-9.8 L/100km.', 'Autonomía: ~800 km.']
    }
  }
];
