'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useFirestore, useCollection } from '@/firebase/index';
import { collection, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Loader2, Lock, User, FileText, Smartphone, MapPin, Globe } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function AdminPedidosPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { toast } = useToast();
  
  const firestore = useFirestore();
  
  const pedidosQuery = useMemo(() => {
    if (!firestore || !isAuthenticated) return null;
    return query(collection(firestore, 'pedidos'), orderBy('createdAt', 'desc'));
  }, [firestore, isAuthenticated]);

  const { data: pedidos, loading, error } = useCollection(pedidosQuery);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Renta2026!') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Contraseña incorrecta.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!firestore) return;
    if (!confirm('¿Seguro que deseas eliminar este pedido?')) return;
    setIsDeleting(id);
    try {
      await deleteDoc(doc(firestore, 'pedidos', id));
      toast({ title: "Pedido eliminado correctamente" });
    } catch (e) {
      toast({ variant: "destructive", title: "Error al eliminar" });
    } finally {
      setIsDeleting(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-xl border-2">
            <CardHeader className="text-center">
              <Lock className="mx-auto h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-2xl font-headline">Panel de Control</CardTitle>
              <p className="text-sm text-muted-foreground">Acceso restringido para administración.</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <Input 
                    type="password" 
                    placeholder="Contraseña Maestra" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="text-center py-6 text-lg"
                />
                {loginError && <p className="text-destructive text-sm text-center font-bold">{loginError}</p>}
                <Button type="submit" className="w-full py-6 text-lg bg-primary">Entrar al Sistema</Button>
              </form>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-2 py-4 md:px-4 md:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <h1 className="font-headline text-2xl md:text-3xl font-bold text-primary flex items-center gap-2 text-center md:text-left">
            <FileText className="h-6 w-6 md:h-8 md:w-8 text-accent" />
            Registro de Pedidos 2026
          </h1>
          <Button variant="outline" size="sm" onClick={() => setIsAuthenticated(false)}>Cerrar Sesión</Button>
        </div>

        <Card className="shadow-lg border-none overflow-hidden">
          <CardContent className="p-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground font-semibold text-sm">Cargando datos...</p>
              </div>
            ) : error ? (
              <div className="p-10 text-center text-destructive font-bold">Error de conexión.</div>
            ) : !pedidos || pedidos.length === 0 ? (
              <div className="p-20 text-center text-muted-foreground">No hay pedidos registrados.</div>
            ) : (
              <div className="overflow-x-auto">
                <Table className="min-w-full">
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="px-2 py-3 text-[11px] font-bold uppercase md:text-xs">ID / Fecha</TableHead>
                      <TableHead className="px-2 py-3 text-[11px] font-bold uppercase md:text-xs">Cliente / Contacto</TableHead>
                      <TableHead className="px-2 py-3 text-[11px] font-bold uppercase md:text-xs">Auto / Ruta</TableHead>
                      <TableHead className="px-2 py-3 text-[11px] font-bold uppercase md:text-xs">Docs / País</TableHead>
                      <TableHead className="px-2 py-3 text-[11px] font-bold uppercase md:text-xs">Total</TableHead>
                      <TableHead className="px-2 py-3 text-right text-[11px] font-bold uppercase md:text-xs">Acción</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pedidos.map((pedido: any) => (
                      <TableRow key={pedido.id} className="hover:bg-primary/5 transition-colors border-b">
                        <TableCell className="px-2 py-4">
                          <div className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-1 rounded w-fit mb-1">{pedido.id}</div>
                          <div className="text-[10px] text-muted-foreground whitespace-nowrap">
                            {pedido.createdAt?.seconds ? format(new Date(pedido.createdAt.seconds * 1000), "dd/MM/yy HH:mm") : '...'}
                          </div>
                        </TableCell>
                        <TableCell className="px-2 py-4">
                          <div className="flex items-center gap-1 font-bold text-[11px] md:text-sm"><User className="h-3 w-3 shrink-0" /> {pedido.customerName}</div>
                          <div className="flex items-center gap-1 text-[10px] text-muted-foreground"><Smartphone className="h-3 w-3 shrink-0" /> {pedido.customerPhone}</div>
                        </TableCell>
                        <TableCell className="px-2 py-4">
                          <Badge variant="secondary" className="text-[9px] mb-1 px-1 h-auto py-0">{pedido.carName}</Badge>
                          <div className="flex items-start gap-1 text-[9px] leading-tight text-muted-foreground">
                            <MapPin className="h-2 w-2 shrink-0 mt-0.5" />
                            {pedido.pickupLocation.split(',')[0]} → {pedido.dropoffLocation.split(',')[0]}
                          </div>
                        </TableCell>
                        <TableCell className="px-2 py-4">
                            <div className="font-mono text-[9px]">P: {pedido.customerPassport || 'N/A'}</div>
                            <div className="font-mono text-[9px]">L: {pedido.customerLicense || 'N/A'}</div>
                            <div className="flex items-center gap-1 text-[9px] font-bold text-primary mt-1">
                                <Globe className="h-2 w-2 shrink-0" />
                                {pedido.customerCountry}
                            </div>
                        </TableCell>
                        <TableCell className="px-2 py-4">
                          <div className="font-bold text-primary text-[11px] md:text-sm font-mono">${pedido.totalAmount?.toFixed(2)}</div>
                        </TableCell>
                        <TableCell className="px-2 py-4 text-right">
                          <Button 
                            variant="destructive" 
                            size="icon" 
                            onClick={() => handleDelete(pedido.id)} 
                            disabled={isDeleting === pedido.id}
                            className="h-7 w-7 md:h-8 md:w-8"
                          >
                            {isDeleting === pedido.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
