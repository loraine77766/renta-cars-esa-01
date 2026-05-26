
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TerminosYCondicionesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-3xl md:text-4xl text-primary text-center">
                    TÉRMINOS Y CONDICIONES
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground prose prose-sm max-w-none">
                <p>
                    <strong>Blues Group USA LLC</strong> es una empresa legalmente constituida y registrada en el estado de Florida, Estados Unidos, bajo el número de documento L21000489130 y número FEI/EIN 36-5002737.
                </p>

                <div className="space-y-2">
                    <h3 className="font-headline text-xl text-primary">Información de Contacto</h3>
                    <p><strong>Dirección Postal:</strong> 1317 EDGEWATER DR UNIT 1858 ORLANDO, FL 32804</p>
                    <p><strong>Contacto para Servicio, Soporte, Compras y Devoluciones:</strong></p>
                    <ul>
                        <li>WhatsApp y Teléfono: <a href="https://wa.me/15879120936">+1 (587) 912-0936</a></li>
                    </ul>
                </div>

                <p>
                    Al realizar una reserva con Blues Group USA LLC, usted acepta expresamente los siguientes términos y condiciones de venta. Es fundamental que lea y comprenda estos términos antes de proceder con cualquier reserva, ya que entrarán en vigor inmediatamente después de la confirmación de su reservación.
                </p>
                
                <p>
                    Blues Group USA LLC actúa como agencia <strong>INTERMEDIARIA</strong> en el proceso de renta de vehículos. Es importante destacar que:
                </p>
                <ul>
                    <li>No poseemos flota propia de vehículos.</li>
                    <li>Facilitamos la reserva entre el cliente y la rentadora oficial.</li>
                    <li>No podemos garantizar la puntualidad en la entrega de los vehículos.</li>
                    <li>No garantizamos las condiciones específicas del vehículo asignado</li>
                </ul>
                <p>Sin embargo, Blues Group USA LLC garantiza que:</p>
                <ul>
                    <li>Su reserva estará presente en el sistema de las rentadoras.</li>
                    <li>Intervendremos en caso de cualquier inconveniente para aclarar la situación de su reserva.</li>
                </ul>

                <h3 className="font-headline text-xl text-primary">Políticas Clave de Reserva y Pago</h3>
                 <ul>
                    <li><strong>Depósito de Reserva y Garantía:</strong> Para confirmar cualquier reserva, se requiere un pago por adelantado de <strong>$250.00 USD</strong>. Este monto funciona como un depósito de garantía reembolsable.</li>
                    <li><strong>Reembolso del Depósito:</strong> El depósito de $250.00 USD será devuelto íntegramente al cliente después de que el vehículo haya sido entregado y se verifique que no presenta daños.</li>
                    <li><strong>Pago del Saldo:</strong> El saldo restante del costo total de la renta puede ser pagado por el cliente al momento de recibir el vehículo.</li>
                    <li><strong>Descuento por Pago Adelantado:</strong> Ofrecemos un <strong>20% de descuento</strong> sobre el costo total de la renta (sin incluir el depósito) si el cliente elige pagar la totalidad del monto por adelantado al momento de hacer la reserva.</li>
                    <li><strong>Política de Combustible:</strong> Se incluye una tarjeta de combustible prepagada para un máximo de 200 litros de gasolina (B90 o B93) a un costo de $0.50 USD por litro. Esta tarjeta debe ser gestionada y pagada antes de la llegada del cliente, ya que requiere la identificación personal para su emisión.</li>
                    <li><strong>Contrato y Seguro:</strong> Al momento de la entrega del vehículo, el cliente deberá firmar un contrato de arrendamiento. Este contrato estipula que, en caso de accidente o daños al vehículo, los costos de reparación se deducirán del depósito de garantía de $250.00 USD.</li>
                     <li><strong>Matrícula (Chapa):</strong> Todos nuestros vehículos se entregan con matrícula de tipo "ESA".</li>
                </ul>

                <h3 className="font-headline text-xl text-primary">EL CLIENTE DEBE DE SABER ANTES DE LA CONFIRMACIÓN DE SU RESERVA</h3>
                <ul>
                    <li>Las edades, mínima y máxima, establecidas para rentar un auto sin ninguna comisión extra de relevo de responsabilidad (SEGURO) son de 25 a 75 años.</li>
                    <li>Para personas de 21 a 24 años y de 75 a 80 años pagaran una tasa adicional consistente en el 50% (13,00 USD) del valor del relevo de responsabilidad (SEGURO).</li>
                    <li>Requisitos de licencia de conducción:
                        <ul>
                            <li>1 año mínimo de licencia para categorías generales.</li>
                            <li>1 año para vehículos Mercedes Benz.</li>
                            <li>1 año para vehículos deportivos.</li>
                            <li>No se admitirán bajo ninguna razón licencias con menos de 1 año aunque tengan chófer adicional.</li>
                        </ul>
                    </li>
                    <li>La edad máxima para rentar un auto es de 80 años.</li>
                    <li>La renta mínima es de 3 días en Temporada Alta y 5 días en Temporada Extrema Alta.</li>
                    <li>Por la apertura de contratos de Renta en las Oficinas de los Aeropuertos se facturará un impuesto de 20,00 USD.</li>
                    <li>En caso de accidente, robo total o parcial se deberá proceder a comunicarlo a la Agencia más cercana al lugar del suceso y realizar la denuncia a la policía, la cual servirá para conocer la culpabilidad o no del chofer titular o chofer adicional.</li>
                    <li>El vehículo deberá ser entregado a la hora pactada con una tolerancia de hasta 4 horas posteriores.</li>
                    <li>Si entrega el auto pasada las 4 horas de tolerancia le aplicarán en el punto de renta la PENALIDAD correspondiente: 1 día de renta más 100,00 USD.</li>
                    <li>Solo se podrá abastecer el vehículo con el combustible establecido por contrato.</li>
                    <li>El seguro no cubre la pérdida de la llave del auto, pérdida del contrato, y rotura de llantas y neumáticos</li>
                    <li>Respondemos por problemáticas respecto al primer tanque de combustible</li>
                </ul>

                 <h3 className="font-headline text-xl text-primary">EN DEPENDENCIA DEL CONTRATO QUE SEA CONFIRMADA SU RESERVA VARÍAN LAS CONDICIONES DE RENTA</h3>
                <p>Para retirar el auto el cliente debe presentar contrato, pasaporte vigente y licencia física de conducción con mínimo 1 año de antigüedad. *No se aceptan licencias electrónicas ni fotocopias, solo original.</p>
                <p>Al momento de solicitar la reserva del auto el cliente efectuará un depósito del 25%. En caso de cancelar su solicitud, este depósito será cobrado como penalidad.</p>
                <p>La reserva solicitada y la renta confirmada nunca se efectúa sobre la base del Modelo de auto. Solo se confirma Categoría de Auto y Tipo de Transmisión.</p>
                <p>*Todos estos costos están incluidos en el precio final del auto a excepción del chofer adicional y dropp off, en algunos contratos pueden ser incluidos desde el exterior si solicitado por el cliente.</p>
                <p>No es responsabilidad de Blues Group USA LLC problemáticas relacionadas con el combustible.</p>

                <h3 className="font-headline text-xl text-primary">PENALIDADES PARA LAS RESERVAS CONFIRMADAS CONTRATO DIRECTO O POR AGENCIAS MAYORISTAS PARA TRANSTUR, REX, VIACAR</h3>
                <p>Las reservas confirmadas por contrato directo de agencia o mayoristas No prevén modificación de fecha debajo los 10 días a la ejecución del servicio.</p>
                <p>De 10 días a 3 dias antes antes, el cliente tiene posibilidad a cambio de hora, nombre, Aeropuerto siempre que sea en la misma provincia de manera gratuita, la segunda modificación tiene un costo de 50.00 usd.</p>
                <p>En caso de cancelación se procederá a la aplicación de las siguientes penalidades:</p>
                <ul>
                    <li>25% de penalidad del valor de la reserva hasta 10 días antes de la ejecución.</li>
                    <li>100% de penalidad por debajo de los 10 días.</li>
                    <li>100% no show</li>
                </ul>
                <p>La Rentadora no reembolsará las reservas por problemas relacionados al pasaporte ya que es responsabilidad del cliente tener su pasaporte vigente con prórrogas y fechas de vencimiento.</p>
                <p>La Rentadora no reembolsará ningún costo por entregas anticipadas del auto ni servicios extras como chofer adicional o drop off en caso de utilizar.</p>
                <p>La Rentadora no reembolsará las reservas cuyos clientes hayan perdido su propio vuelo, cambio de vuelo y no lleguen dentro las 24 horas establecidas por el contrato.</p>
                <p>La Rentadora no reembolsará las reservas por cuestión de tormentas, desastres naturales, problemas políticos fuera del territorio Nacional.</p>
                <p>La Rentadora reembolsará las reservas solo si viene declarada la fuerza mayor en el Territorio Nacional.</p>
                <p>La Rentadora no reembolsará por condiciones del auto si este viene utilizado sin anotaciones evidenciadas en el contrato</p>
                <p>Las reclamaciones por los pagos realizados con tarjeta, para evitar las penalidades infringiendo el actual contrato conlleva a la inscripción en la lista de no gratos, el cliente no podrá reservar en futuro otro auto en el destino y corre el riesgo de ser bloqueado por la policía aduanal.</p>

                <h3 className="font-headline text-xl text-primary">PENALIDADES PARA RESERVAS CONFIRMADAS POR DISPONIBILIDAD TRANSTUR</h3>
                <p>Una vez confirmadas las reservas por DISPONIBILIDAD en el sistema NO se permitirá modificación de la misma en ninguno de sus conceptos, para cualquier cambio la misma debe ser cancelada y vuelta a montar, en caso de estar ya pagada la reserva, de acuerdo a los términos previamente definidos se aplicarán los cargos correspondientes.</p>
                <p>Para las reservas confirmadas cuando se interese su cancelación se procederá de acuerdo a los términos siguientes:</p>
                <ul>
                    <li>Para un término de entre 60 a 30 días de antelación al inicio de la reserva se aplicará una penalidad correspondiente al 25% del valor total de la reserva.</li>
                    <li>Para un término de entre 30 a 15 días de antelación al inicio de la reserva se aplicará una penalidad correspondiente al 50% del valor total de la reserva.</li>
                    <li>Para un término inferior a 15 días de antelación al inicio de la reserva se aplicará una penalidad correspondiente al 100% del valor total de la reserva.</li>
                </ul>

                <h3 className="font-headline text-xl text-primary">COSTOS ACCESORIOS TRANSTUR</h3>
                <ul>
                    <li>Suplemento combustible autos ECONOMICOS: 54,00 USD</li>
                    <li>Suplemento combustible autos MEDIOS: 60,00 USD.</li>
                    <li>Suplemento Oficina Aeropuerto: 20,00 USD.</li>
                    <li>Chofer adicional: 3,00 USD x día de Renta.</li>
                    <li>Dropp Off varía en dependencia de la provincia donde entregue el auto</li>
                </ul>

                <h3 className="font-headline text-xl text-primary">COSTOS ACCESORIOS VIA CAR</h3>
                <ul>
                    <li>Impuesto Aeropuerto 20 usd (se paga Cash en el punto de renta).</li>
                    <li>Combustible, auto lleno entrega lleno (no cobran).</li>
                    <li>Chofer adicional 30.00 por la durada de la reserva.</li>
                    <li>Dropp Off varía en dependencia de la provincia donde entregue el auto</li>
                </ul>
                
                <h3 className="font-headline text-xl text-primary">COSTOS ACCESORIOS DE REX</h3>
                <ul>
                    <li>Suplemento combustible autos Categoria Elantra: 72,00 USD.</li>
                    <li>Suplemento combustible autos Categoria Mercedes C200: 72,00 USD.</li>
                    <li>Suplemento combustible autos Categoria Jeep 98,00 USD.</li>
                    <li>Suplemento combustible autos Categoria Mini Van 98,00 USD.</li>
                    <li>Suplemento Oficina Aeropuerto: 20,00 USD.</li>
                    <li>Chofer adicional: 3,00 USD x día de Renta</li>
                </ul>

                <h3 className="font-headline text-xl text-primary">CONDICIONES DE CAMBIOS</h3>
                <p>A pesar de que no es nuestra intención realizar cambios en tu reserva, los acuerdos con nuestros proveedores en ocasiones se realizan con mucho tiempo de antelación y por lo tanto no podemos tener el control de posibles cambios hechos por terceras partes.</p>
                <p>El primer cambio requerido por los clientes será gratuito y posteriores cambios estarán sujeto a un costo de 50,00 usd más la diferencia de los días de renta.</p>
                <p>Los cambios de fecha se pueden efectuar antes de los 10 días de la reserva siempre que haya disponibilidad para la nueva fecha. La cancelación por falta de disponibilidad conlleva al pago de la penalidad correspondiente en dependencia del contrato pertinente a la reserva..</p>
                <p>Los cambios de nombre, hora o aeropuerto pueden realizarse hasta 72 horas antes de la reserva siempre que sea en la misma provincia.</p>
                <p>Las reservas confirmadas por contrato de disponibilidad no prevén cambios ni cancelación</p>
                <p>Las reclamaciones por los pagos realizados con tarjeta, para evitar las penalidades infringiendo el actual contrato conlleva a la inscripción en la lista de no gratos, el cliente no podrá reservar en futuro otro auto en el destino y corre el riesgo de ser bloqueado por la policía aduanal.</p>

                <h3 className="font-headline text-xl text-primary">CONDICIONES DE RESERVA DE AUTOS DAIQUIRI</h3>
                <p>Precio por día con fines turísticos. - Incluye el Seguro por día. - No incluye el Combustible. Sólo se hace responsable del primer tanque en el momento del pick up, no del suministro de combustible durante todo el período de la renta. - No incluye el Depósito de Garantía. - TODOS LOS PAGOS Y DEPÓSITOS EN LA OFICINA DE RENTA TIENEN QUE HACERSE EN EFECTIVO EN USD O EUROS. - Kilometraje Limitado a 250 KM/DIA acumulables.</p>
                <p>El Cliente/Conductor titular del contrato debe cumplir con el horario de devolución explícito en su Voucher (sólo tiene 1 hora de gracia adicional), entre 1 a 3 horas pagará en el centro de operaciones como extras el valor en plaza de medio día de renta y a partir de las 3 horas aplica precio de 1 día.</p>
                <p>Los cambios en los horarios de vuelo y cancelaciones son responsabilidad de las líneas aéreas. Cualquier cambio es considerado una modificación o cancelación de la reserva.</p>
                <p>El horario del punto de renta es de 08:30 am a 6:00 pm; en el caso de recogida y/o devolución fuera de ese horario deberá notificarlo previamente.</p>
                
                <h4>Condiciones específicas</h4>
                <ul>
                    <li>Depósito de Garantía: 250 USD en EFECTIVO (Reembolsable).</li>
                    <li>Precio de conductor adicional: 10 USD.</li>
                    <li>Precio del Kilometraje extra: 0.90 USD por kilometro.</li>
                    <li>Precio del primer tanque de combustible: 65 USD en EFECTIVO (variable según disponibilidad y fluctuaciones de los precios del mercado al momento del pick up). No reembolsable. Devolución vacío. Política (Lleno/Vacío).</li>
                </ul>

                <h4>Política de cancelación</h4>
                <p>Cancelaciones y/o modificaciones de una reserva por cualquier evento que afectan a un cliente o su capacidad para viajar, pero no afectan al destino donde se realizará el servicio no serán reembolsadas.</p>
                <p>Las modificaciones serán siempre sujetas a la disponibilidad.</p>
                <p>Cancelaciones de reservas con menos de 10 días de antelación y no show, se perderá el 100% del pago total. Entre 20 y 11 días antes del inicio de la reserva la penalidad es del 50%. Entre 30 y 21 días antes de la fecha del inicio de la reserva, se aplicará una penalidad del 25% del total.</p>
                <p>Si un cliente se retrasa en el horario pactado de pick up deberá notificarlo en un plazo de hasta 5 horas. Sin notificación será considerado No Show y podrá proveerse el vehículo según disponibilidad.</p>
                <p>Si el cliente se presenta posterior a las primeras 24 horas del día y hora pactados pierde el 100% de lo pagado y el vehículo sujeto a disponibilidad.</p>

                <h3 className="font-headline text-xl text-primary">MODALIDADES DE PAGO</h3>
                <p>Una vez realizado el pago, el precio del servicio indicado es firme y garantizado y ya no será modificará por Blues Group USA LLC aunque el tipo de cambio fluctúe. Del mismo modo, después de los acuerdos de pago de la factura, el cliente no podrá solicitar un cambio en el precio pagado en el caso de ofertas promocionales ofrecidas por Blues Group USA LLC.</p>
                <p>En caso de facilidades de pago, el cliente deberá abonar el 25% de la reserva, el saldo del servicio será efectuado máximo 20 días antes de la ejecución del contrato.</p>
                <p>Las reservas debajo de los 20 días preven pago inmediato.</p>
                <p>Medios de pago aceptados: Transferencia Bancaria, Depósito directo en Chase Bank, Zelle o tarjetas de crédito / débito (Visa, MasterCard), a este último se agrega un cargo del 4%.</p>
                <p>En caso de reserva online, el pago se realiza mediante tarjeta de crédito. El nombre del titular de la tarjeta debe coincidir con el nombre del Cliente que realizó la reserva, en caso contrario se le exigirá la documentación necesaria para comprobar la legitimidad del pago. En caso que no se pueda comprobar la legitimidad del pago, su reserva será cancelada, sin derecho a reclamo y el pago será devuelto al titular de la tarjeta de crédito y a este último se le aplicarán descuentos relacionados con el impuesto del sistema de pago online y por la gestión del trámite.</p>
                <p>En caso de pagos por terceras personas con tarjeta de crédito/débito, el titular de la tarjeta debe dejar una declaración de pago junto a su documento de identidad.</p>
                <p>Tan pronto como usted haya pagado su reserva, Blues Group USA LLC le enviará una factura y en un plazo de como máximo 24 horas recibirá el Voucher de su reserva.</p>
                <p>Las reclamaciones por los pagos realizados con tarjeta, para evitar las penalidades infringiendo el actual contrato conlleva a la inscripción en la lista de no gratos, el cliente no podrá reservar en futuro otro auto en el destino y corre el riesgo de ser bloqueado por la policía aduanal.</p>
                
                <h3 className="font-headline text-xl text-primary">RECLAMACIONES Y REEMBOLSOS</h3>
                <p>Las reclamaciones solo se aceptarán de forma escrita con copia del contrato emitido por la rentadora, con las evidencias pertinentes.</p>
                <p>El cliente debe comunicarse con Blues Group USA LLC en tiempo real para poder darle asistencia o ponerse en contacto con nuestro representante.</p>
                <p>Para hacer la reclamación el cliente debe exigir copia del contrato con anotación del inconveniente.</p>
                <p>Blues Group USA LLC reembolsará la diferencia del costo del auto en el caso que al cliente venga entregado un auto de categoría inferior a la reservada siempre y cuando haga la señalización en el momento que está retirando el auto directamente a Blues Group USA LLC o al representante correspondiente. Debe estar señalado en la copia del contrato que nos debe enviar.</p>
                <p>La rentadora tiene un periodo de hasta 3 meses para que se vuelva efectivo el reembolso. El cliente será reembolsado solo una vez que llegue el crédito a Blues Group USA LLC.</p>
                <p>Las reclamaciones por los pagos realizados con tarjeta, para evitar las penalidades infringiendo el actual contrato conlleva a la inscripción en la lista de no gratos, el cliente no podrá reservar en futuro otro auto en el destino y corre el riesgo de ser bloqueado por la policía aduanal.</p>
            </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
