import { useDigitales } from "~/Contextos/ModuleContexts/DigitalesContext";

function Digitales() {
  const { digitales } = useDigitales();

  return digitales ? (
    <>
      <main className="container mx-auto mt-10">
        <h2 className="text-2xl font-medium max-sm:mx-2">
          Contenidos Digitales
        </h2>
        <hr className="border-stone-400 max-sm:mx-2" />
        <section className="container mx-auto mt-10 grid grid-cols-12 justify-items-center">
          {digitales.map(
            (item, index) =>
              item.publico && (
                <div
                  key={index}
                  className="max-sm:w-72 border-delgado rounded-md p-4 w-60 col-span-2 max-sm:col-span-12 max-md:col-span-6 max-lg:col-span-4 max-xl:col-span-3 max-2xl:col-span-3 mb-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex text-stone-500 text-xs">
                      <p className="font-light">Población:&nbsp;</p>
                      {item.poblacion.poblacion}
                    </div>
                    <div className="h-52 w-full overflow-hidden mb-4 bg-blue-50 p-4 rounded-lg">
                      <img
                        src={item.imagenReferencia}
                        alt={item.titulo}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-center">
                      <h2
                        className="text-xl font-normal line-clamp-2"
                        title={item.titulo}
                      >
                        {item.titulo}
                      </h2>
                      <p
                        className="text-xs mt-2 line-clamp-3"
                        title={item.descripcion}
                      >
                        {item.descripcion}
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://github.com/iKennMarcucci"
                    target="_blank"
                    className="text-center cursor-pointer hover:bg-blue-500 bg-blue-600 text-white font-medium mt-4 rounded-md py-1"
                    rel="noreferrer"
                  >
                    Ver
                  </a>
                </div>
              )
          )}
        </section>
      </main>
    </>
  ) : (
    <>
      <p>No se ha encontrado ningún Contenido Digital</p>
    </>
  );
}

export default Digitales;
