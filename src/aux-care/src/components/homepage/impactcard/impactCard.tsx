import Link from "next/link";

export default function ImpactCardComponent() {
  return (
    <div
      className="max-w-3xl md:max-w-4xl lg:max-w-5xl text-white p-8 rounded-2xl backdrop-blur-sm mx-auto"
      style={{
        background:
          "radial-gradient(circle, #2e1e12 0%, #8b5e3c 60%, #2e1e12 100%)",
      }}
    >
      <div className="flex justify-center mb-6 w-full">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4">
          <span className="block md:hidden">Impactos do Crack</span>
          <span className="hidden md:block">
            Entendendo os impactos do Crack e da Cocaína
          </span>
        </h1>
      </div>

      <p className="hidden sm:block text-center mx-auto mb-6 text-gray-200 leading-relaxed max-w-md md:max-w-lg lg:max-w-2xl text-sm md:text-lg lg:text-xl">
        Explore a realidade do uso do crack e da cocaína e conheça o caminho
        para recuperação, seus efeitos. A nossa plataforma oferece informações
        claras e compreensíveis e indica onde você pode encontrar suporte
        individual e familiar.
      </p>

      <div className="flex justify-center">
        <Link href="/risco">
          <button className="bg-[#4C8CEE] hover:bg-[#306EE8] text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl">
            Saiba mais
          </button>
        </Link>
      </div>
    </div>
  );
}
