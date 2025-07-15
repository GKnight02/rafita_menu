import { useMenu } from "./hooks/useMenu";
import type { Plato, TipoPlato } from "./types";

const secciones: Record<TipoPlato, string> = {
  entrada: "Entradas",
  segundo: "Platos de Segundo",
  jugo: "Jugos",
};

export default function App() {
  const { menu, atencion, motivo } = useMenu(); // 👈 importante

  const grupos = menu.reduce<Record<TipoPlato, Plato[]>>(
    (acc, plato) => {
      acc[plato.tipo]?.push(plato);
      return acc;
    },
    { entrada: [], segundo: [], jugo: [] }
  );

  const hoy = new Intl.DateTimeFormat("es-PE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  // 👇 Mostrar mensaje si no hay atención
  if (!atencion) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#fff4f4] text-[#c0392b] text-center p-8">
        <h1 className="text-4xl font-bold mb-4">🚫 Hoy no hay atención</h1>
        <p className="text-lg font-bold">{motivo || "Vuelve mañana para disfrutar nuestro menú 😋"}</p>
        <footer className="mt-12 text-sm text-gray-500">
          Restaurante Rafita - {hoy}
        </footer>
      </div>
    );
  }

  // 👇 Vista normal si hay atención
  return (
    <div className="min-h-screen bg-[#fef9f4] text-[#4a2f27] font-sans">
      {/* Franja superior con degradado */}
      <header className="bg-gradient-to-r from-[#c0392b] to-[#e67e22] text-white py-6 shadow-md">
        <h1 className="text-4xl text-center font-extrabold tracking-wide drop-shadow">
          🍽️ Menú del Día
        </h1>
        <p className="text-center text-sm mt-1 italic">{hoy}</p>
      </header>

      {/* Contenido principal */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {(["entrada", "segundo", "jugo"] as TipoPlato[]).map((tipo) =>
          grupos[tipo].length ? (
            <section key={tipo} className="mb-12">
              <h2 className="text-2xl text-[#c0392b] font-bold border-b-2 border-[#e67e22] pb-1 mb-6">
                {secciones[tipo]}
              </h2>

              <ul className="space-y-6">
                {grupos[tipo].map((plato, index) => (
                  <li
                    key={index}
                    className="bg-white rounded-lg shadow border-l-8 border-[#c0392b] p-4"
                  >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start">
                      <div>
                        <h3 className="text-lg font-bold text-[#8e5d3e]">
                          {plato.nombre}
                        </h3>
                        <p className="text-sm text-gray-700">
                          {plato.descripcion}
                        </p>
                        {plato.indicaciones && (
                          <p className="text-xs mt-1 font-bold text-[#c0392b]">
                            📌 {plato.indicaciones}
                          </p>
                        )}
                      </div>
                      <span className="text-right font-bold text-[#27ae60] mt-2 sm:mt-0 sm:ml-4 whitespace-nowrap">
                        {plato.precio}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : null
        )}
      </main>

      {/* Franja inferior con degradado */}
      <footer className="bg-gradient-to-r from-[#c0392b] to-[#e67e22] text-white py-4 mt-8">
        <p className="text-center text-sm">
          Restaurante Rafita - El Porvenir • © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
