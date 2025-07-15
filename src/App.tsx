import { useMenu } from "./hooks/useMenu";
import type { Plato, TipoPlato } from "./types";

const secciones: Record<TipoPlato, string> = {
  entrada: "Entradas",
  segundo: "Platos de Segundo",
  jugo: "Jugos",
};

export default function App() {
  const {
    menu,
    atencion,
    motivo,
    whatsapp,
    horaInicio,
    horaFin,
    nota,
    nombreContacto,
    direccionLocal,
  } = useMenu();

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

  if (!atencion) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#fff4f4] text-[#c0392b] text-center p-8">
        <p className="text-lg font-bold">
          {motivo || "Vuelve mañana para disfrutar nuestro menú 😋."}
        </p>
        <footer className="mt-12 text-sm text-gray-500">
          Restaurante Rafita - {hoy}
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fef9f4] text-[#4a2f27] font-sans">
      {/* Franja superior con degradado */}
      <header className="bg-gradient-to-r from-[#c0392b] to-[#e6d222] text-white py-6 shadow-md mb-6">
        <h1 className="text-4xl text-center font-extrabold tracking-wide drop-shadow">
          🍽️ Menú del Día
        </h1>
        <p className="text-center text-sm mt-1 italic">{hoy}</p>

        <div className="flex justify-center gap-4 mt-4">
          {/* Botón de copiar */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("📋 Enlace copiado al portapapeles");
            }}
            className="bg-[#c0392b] text-white px-4 py-2 rounded hover:bg-[#a93226] transition"
          >
            📋 Copiar enlace
          </button>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              "¡Mira el menú de hoy! 🍽️ " + window.location.href
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            🟢 Compartir por WhatsApp
          </a>
        </div>
      </header>

      {/* Información de contacto */}
      <div className="bg-white shadow-md rounded-lg pt-4 text-sm text-gray-800 mb-6 max-w-md mx-auto border-l-4 border-[#e67e22] space-y-2">
        {whatsapp && (
          <p className="flex items-center justify-center gap-2">
            <span className="text-[#25D366] text-lg">📱</span>
            <span>
              <strong>
                WhatsApp{nombreContacto ? ` (${nombreContacto})` : ""}:
              </strong>{" "}
              <a
                href={`https://wa.me/51${whatsapp.replace(/\s+/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {whatsapp}
              </a>
            </span>
          </p>
        )}
        {direccionLocal && (
          <p className="flex items-center justify-center gap-2">
            <span className="text-yellow-600 text-lg">🏠</span>
            <span>
              <strong>Dirección:</strong> {direccionLocal}
            </span>
          </p>
        )}
        {horaInicio && horaFin && (
          <p className="flex items-center justify-center gap-2">
            <span className="text-yellow-600 text-lg">⏰</span>
            <span>
              <strong>Hora de Atención:</strong> {horaInicio} - {horaFin}
            </span>
          </p>
        )}
        {nota && (
          <p className="flex items-center justify-center gap-2 text-[#c0392b] italic">
            <span>*{nota}*</span>
          </p>
        )}
      </div>

      <main className="max-w-5xl mx-auto px-4 py-4 space-y-12">
        {/* Entradas y Jugos en fila de 2 columnas */}
        <div className="grid sm:grid-cols-2 gap-10">
          {(["entrada", "jugo"] as TipoPlato[]).map((tipo) =>
            grupos[tipo].length ? (
              <section key={tipo}>
                <h2 className="text-2xl text-[#c0392b] font-bold border-b-2 border-[#e67e22] pb-1 mb-4 text-center">
                  {secciones[tipo]}
                </h2>
                <ul className="space-y-4">
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
                            <p className="text-sm mt-1 font-bold text-[#c0392b]">
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
        </div>

        {/* Platos de Segundo en una sola columna */}
        {grupos.segundo.length > 0 && (
          <section>
            <h2 className="text-2xl text-[#c0392b] font-bold border-b-2 border-[#e67e22] pb-1 mb-6 text-center">
              {secciones.segundo}
            </h2>
            <ul className="space-y-6">
              {grupos.segundo.map((plato, index) => (
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
                        <p className="text-sm mt-1 font-bold text-[#c0392b]">
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
        )}
      </main>

      {/* Franja inferior con degradado */}
      <footer className="bg-gradient-to-r from-[#c0392b] to-[#e6d222] text-white py-4 mt-8">
        <p className="text-center text-sm">
          Restaurante Rafita - El Porvenir • © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
