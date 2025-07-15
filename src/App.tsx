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
    <div className="min-h-screen bg-[#fef9f4] text-[#4a2f27] font-sans text-sm sm:text-base overflow-x-hidden px-2 sm:px-0">
      {/* Franja superior con degradado */}
      <header className="bg-gradient-to-r from-[#c0392b] to-[#e6d222] text-white py-6 shadow-md mb-6 px-4">
        <h1 className="text-3xl sm:text-4xl text-center font-extrabold tracking-wide drop-shadow">
          🍽️ Menú del Día
        </h1>
        <p className="text-center text-sm sm:text-base mt-1 italic">{hoy}</p>

        {/* Botones de compartir */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-4 flex-wrap text-sm sm:text-base">
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("📋 Enlace copiado al portapapeles");
            }}
            className="bg-[#c0392b] text-white px-4 py-2 rounded hover:bg-[#a93226] transition w-full sm:w-auto text-center"
          >
            📋 Copiar enlace
          </button>

          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              "¡Mira el menú de hoy! 🍽️ " + window.location.href
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            {/* Ícono de WhatsApp SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12.04 2C6.53 2 2 6.52 2 12.03c0 1.91.5 3.77 1.45 5.41L2 22l4.7-1.43a10.02 10.02 0 0 0 5.34 1.52h.01C17.57 22 22 17.53 22 12.04 22 6.53 17.55 2 12.04 2zm.01 18.4c-1.63 0-3.23-.45-4.62-1.3l-.33-.2-2.78.85.87-2.71-.21-.34a8.375 8.375 0 0 1-1.32-4.57c0-4.63 3.76-8.4 8.39-8.4 2.25 0 4.37.88 5.96 2.47 1.59 1.58 2.47 3.7 2.47 5.95 0 4.63-3.77 8.39-8.43 8.39zm4.61-6.33c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.13-.16.25-.63.8-.78.96-.14.16-.29.18-.54.06a6.88 6.88 0 0 1-2.02-1.24 7.63 7.63 0 0 1-1.41-1.74c-.15-.26-.02-.4.12-.52.13-.13.3-.34.45-.51.15-.17.2-.28.3-.47.1-.2.05-.36-.02-.5-.08-.12-.55-1.3-.75-1.77-.2-.48-.4-.42-.55-.43l-.47-.01c-.16 0-.42.06-.64.28-.22.23-.85.83-.85 2.02 0 1.2.87 2.36 1 2.52.12.16 1.7 2.64 4.13 3.7.58.25 1.03.39 1.38.5.58.19 1.1.16 1.52.1.47-.07 1.46-.6 1.67-1.17.21-.56.21-1.04.15-1.14-.06-.1-.23-.15-.48-.27z" />
            </svg>
            Compartir por WhatsApp
          </a>
        </div>
      </header>

      {/* Información de contacto */}
      <div className="bg-white shadow-md rounded-lg pt-4 pb-4 px-4 text-base sm:text-lg text-gray-800 mb-6 max-w-3xl mx-auto border-l-4 border-[#e67e22] space-y-3">
        {whatsapp && (
          <div className="flex flex-col sm:flex-row items-center gap-2 flex-wrap justify-center text-center sm:text-left">
            <span className="text-[#25D366] text-xl">📱</span>
            <span>
              <strong>
                WhatsApp{nombreContacto ? ` (${nombreContacto})` : ""}:
              </strong>{" "}
              <a
                href={`https://wa.me/51${whatsapp.replace(/\s+/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {whatsapp}
              </a>
            </span>
          </div>
        )}

        {direccionLocal && (
          <div className="flex flex-col sm:flex-row items-center gap-2 flex-wrap justify-center text-center sm:text-left">
            <span className="text-yellow-600 text-xl">🏠</span>
            <span>
              <strong>Dirección:</strong> {direccionLocal}
            </span>
          </div>
        )}

        {horaInicio && horaFin && (
          <div className="flex flex-col sm:flex-row items-center gap-2 flex-wrap justify-center text-center sm:text-left">
            <span className="text-yellow-600 text-xl">⏰</span>
            <span>
              <strong>Hora de Atención:</strong> {horaInicio} - {horaFin}
            </span>
          </div>
        )}

        {nota && (
          <div className="flex items-center justify-center gap-2 text-[#c0392b] italic text-sm sm:text-base text-center px-2">
            <span className="break-words">*{nota}*</span>
          </div>
        )}
      </div>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-12 text-base sm:text-lg">
        {/* Entradas y Jugos en fila de 2 columnas (responsive) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {(["entrada", "jugo"] as TipoPlato[]).map((tipo) =>
            grupos[tipo].length ? (
              <section key={tipo}>
                <h2 className="text-xl sm:text-2xl text-[#c0392b] font-bold border-b-2 border-[#e67e22] pb-1 mb-4 text-center">
                  {secciones[tipo]}
                </h2>
                <ul className="space-y-4">
                  {grupos[tipo].map((plato, index) => (
                    <li
                      key={index}
                      className="bg-white rounded-lg shadow border-l-8 border-[#c0392b] p-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 flex-wrap">
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

        {/* Platos de Segundo en una sola columna (responsive) */}
        {grupos.segundo.length > 0 && (
          <section>
            <h2 className="text-xl sm:text-2xl text-[#c0392b] font-bold border-b-2 border-[#e67e22] pb-1 mb-6 text-center">
              {secciones.segundo}
            </h2>
            <ul className="space-y-6">
              {grupos.segundo.map((plato, index) => (
                <li
                  key={index}
                  className="bg-white rounded-lg shadow border-l-8 border-[#c0392b] p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 flex-wrap">
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
      <footer className="bg-gradient-to-r from-[#c0392b] to-[#e6d222] text-white py-4 mt-8 px-2 sm:px-4">
        <p className="text-center text-xs sm:text-sm">
          Restaurante Rafita - El Porvenir • © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
