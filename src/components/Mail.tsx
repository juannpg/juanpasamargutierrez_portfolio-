import { useState } from 'react';

export default function Mail() {
  const [modal, setModal] = useState<boolean>(false);
  
  function copiarEmail(): void {
    navigator.clipboard.writeText("juanpasamargutierrez@gmail.com")
      .then(() => {
        setModal(true)
        setTimeout(() => setModal(false), 3300)
      });
  }

  return (
    <>
      <div className="w-80 flex justify-center items-center bg-gray-300 rounded-lg text-black absolute top-10 p-2 z-10 transition-all duration-300 ease-in-out"
        style={{
          opacity: modal ? '1' : '0'
        }}
      >
        <p>Email copiado al portapapeles</p>
      </div>
      

      <img role="button" tabIndex={0} src="/src/assets/mail-icon.svg" alt="Mail Icon" className="w-11 cursor-pointer"
        onClick={() => copiarEmail()}
      />
    </>
  );
}