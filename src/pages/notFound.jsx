import Image from "../assets/404.svg?react";

const NotFound = () => {
    return (
        <div className="flex justify-center items-center min-h-[82vh] flex-row">
            <div className="flex justify-center items-center flex-col gap-4">
            <h1 className="text-6xl">Ops... Error 404</h1>
            <p className="text-3xl">Página não encontrada</p>
            </div>
            <div className="w-4/12">
            <Image className="w-full h-auto" />
            </div>
            
        </div>
    );
}
 
export default NotFound;