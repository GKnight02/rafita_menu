import { useMenu } from './hooks/useMenu';

function App() {
  const menu = useMenu();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-8">🍽️ Menú del Día</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {menu.map((plato, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform"
          >
            {plato.imagen && (
              <img
                src={plato.imagen}
                alt={plato.nombre}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{plato.nombre}</h2>
              <p className="text-gray-600 mt-1">{plato.descripcion}</p>
              <p className="text-right text-green-600 font-bold mt-2">{plato.precio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
