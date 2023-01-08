

const Normal: React.FC = (teste = 'só um teste') => {
    
    return (
        <div>
            <h1 className="bg-blue-500 text-white text-center">Página para usuários normais</h1>
            
            <button className="mt-3 p-3 bg-pink-400 text-white"> Sair </button>
        </div>
    )
}

export default Normal