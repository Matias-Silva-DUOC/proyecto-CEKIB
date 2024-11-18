import React from "react";
import LogoCekib from "../../assets/img/logot2.png";

export function Footer() {
  return (
    <footer className="w-full py-8 flex bg-teal-400 items-center justify-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] sticky bottom-0">
      <img src={LogoCekib} alt="Logo CEKIB" className="w-24" />
    </footer>
  );
}
