import Products from "@/components/Products";

export default function ProductsPage() {
    return (
        // pt-20 ensures your design clears the fixed glassmorphic Navbar we built earlier
        <main className="min-h-screen bg-zinc-950 pt-20">
            <Products />
        </main>
    );
}