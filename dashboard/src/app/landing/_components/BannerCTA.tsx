export const Banner = () => {
    return (
        <div className="w-full bg-blue-600 text-white py-4 flex items-center justify-center rounded-lg">
            <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">Tem dúvidas de como a Propius pode te ajudar?</h3>
                <p className="text-lg">Nossos especialistas mostram tudo para você.</p>
                <button className="mt-4 px-6 py-2 bg-white text-blue-600 rounded-full hover:bg-gray-200 transition-all duration-300">
                    Quero saber mais
                </button>
            </div>
        </div>
    );
};
