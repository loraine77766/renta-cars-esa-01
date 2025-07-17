'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqs = [
    {
        question: "¿Existe algún tipo de restricción de edad?",
        answer: "Para rentar un auto en Cuba se necesita tener un mínimo de 21 y un máximo de 80 años de edad. Para personas entre 21 a 24 años y 75 a 80 años se le aplicará un suplemento de $13 por dia."
    },
    {
        question: "¿Qué documentos tengo que presentar al recoger el auto en Cuba?",
        answer: "Se debe presentar:\n- Licencia de conducir vigente con al menos 2 años de antigüedad\n- Pasaporte original o carnet de identidad en caso de residir en Cuba\n- Voucher de su reservación de forma impresa"
    },
    {
        question: "¿Cómo se hace el pago?",
        answer: "Todos estos pagos se realizarán con Zelle o transferencia bancaria desde varios países. NO se aceptan pagos en efectivo con ninguna moneda."
    },
    {
        question: "¿Cómo puedo añadir un chofer adicional a mi reserva?",
        answer: "Usted podrá añadir un chofer adicional a la hora de recoger su auto en Cuba (máximo 2 choferes adicionales). Si aplica, tendrá que abonar $3 USD por conductor por día."
    },
    {
        question: "¿Está el seguro del auto incluido en el precio?",
        answer: "Sí, el seguro del auto está incluido en el precio total. El suplemento del seguro para personas entre 21-24 y 75-80 años deberá pagarse en el punto de venta."
    },
    {
        question: "¿Existe algún otro costo a la hora de recoger el auto?",
        answer: "No, solo debe pagar un importe en el caso que desee un chofer adicional."
    },
    {
        question: "¿Qué sucede si retorno el auto después de la hora pactada en el contrato?",
        answer: "La devolución del auto debe ser antes o a la hora pactada en el contrato. De incumplir con el horario de devolución se aplicará una penalización."
    },
    {
        question: "¿Puede entregar el auto en un lugar distinto al de recogida?",
        answer: "Sí, pero incurrirá en un costo adicional mediante la tarifa de drop off. El costo varía según el lugar de entrega, por favor consultar con la agencia rentadora en Cuba para más información."
    },
    {
        question: "¿Cómo cambio mi reserva?",
        answer: "Contáctenos para realizar un cambio en su reserva de ser posible. Incurrirá en un costo de $20 más la diferencia en el costo total de la renta para las nuevas fechas en caso de ser mayor y haber disponibilidad. De no haber disponibilidad no se le devolverá el dinero."
    }
];

export default function FAQ() {
    return (
        <Card className="shadow-lg max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="font-headline text-3xl text-primary text-center">Preguntas Frecuentes</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                         <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="text-left font-semibold hover:no-underline">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground whitespace-pre-line">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    );
}
