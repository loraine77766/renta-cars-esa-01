export default function Footer() {
  return (
    <footer className="bg-card mt-auto">
      <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} CubaRenta. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
