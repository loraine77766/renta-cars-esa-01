'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useFirestore, useCollection } from '@/firebase/index';
import { collection, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Phone, Mail, Loader2, ClipboardList, Lock, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
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
    try {
      return query(collection(firestore, 'pedidos'), orderBy('createdAt', 'desc'));
    } catch (e) {
      return null;
    }
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
    if (!confirm('¿Eliminar este pedido?')) return;
    setIsDeleting(id);
    try {
      await deleteDoc(doc(firestore, 'pedidos', id));
      toast({ title: "Eliminado" });
    } catch (e) {
      toast({ variant: "destructive", title: "Error" });
    } finally {
      setIsDeleting(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <Lock className="mx-auto h-8 w-8 text-primary mb-2" />
              <CardTitle>Acceso Restringido</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <Input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                {loginError && <p className="text-destructive text-sm text-center">{loginError}</p>}
                <Button type="submit" className="w-full">Entrar</Button>
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
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-headline text-3xl font-bold text-primary">Registro de Pedidos</h1>
          <Button variant="outline" onClick={() => setIsAuthenticated(false)}>Salir</Button>
        </div>
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p>Cargando...</p>
              </div>
            ) : error ? (
              <div className="p-20 text-center text-destructive">Error al cargar datos.</div>
            ) : !pedidos || pedidos.length === 0 ? (
              <div className="p-20 text-center">No hay pedidos registrados.</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Vehículo</TableHead>
                      <TableHead>Fechas</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pedidos.map((pedido: any) => (
                      <TableRow key={pedido.id}>
                        <TableCell>
                          <div className="font-bold">{pedido.customerName}</div>
                          <div className="text-xs text-muted-foreground">{pedido.customerPhone}</div>
                        </TableCell>
                        <TableCell><Badge variant="outline">{pedido.carName}</Badge></TableCell>
                        <TableCell className="text-xs">
                          Desde: {pedido.startDate ? format(new Date(pedido.startDate), "dd/MM/yy") : 'N/A'}<br/>
                          Hasta: {pedido.endDate ? format(new Date(pedido.endDate), "dd/MM/yy") : 'N/A'}
                        </TableCell>
                        <TableCell className="font-mono">${pedido.totalAmount?.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="destructive" size="icon" onClick={() => handleDelete(pedido.id)} disabled={isDeleting === pedido.id}>
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