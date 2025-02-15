import { useState } from 'react';
import mailIconWhite from '../assets/mail-icon-white.svg';
import mailIconBlack from '../assets/mail-icon-black.svg';



export default function Mail({MailTitulo}:{MailTitulo: string}) {
  const [modal, setModal] = useState<boolean>(false);

  function showModal() {
    setModal(true);
    setTimeout(() => setModal(false), 3300);
  }
  
  function copiarEmail(): void {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText("juanpasamargutierrez@gmail.com")
        .then(() => showModal());
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = "juanpasamargutierrez@gmail.com";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      showModal();
    }
  }

  return (
    <>
      <div className="w-80 flex justify-center items-center bg-[var(--subtitle-2)] rounded-lg text-[var(--black)] fixed top-10 p-2 z-10 transition-all duration-500 ease-in-out"
        style={{
          opacity: modal ? '0.95' : '0'
        }}
      >
        <p>{MailTitulo}</p>
      </div>
      
      <picture>
        <source srcSet={mailIconWhite.src} media="(prefers-color-scheme: dark)" />
        <img role="button" tabIndex={0} src={mailIconBlack.src} alt="Mail Icon" className="w-11 cursor-pointer"
          onClick={copiarEmail}
        />
      </picture>
    </>
  );
}