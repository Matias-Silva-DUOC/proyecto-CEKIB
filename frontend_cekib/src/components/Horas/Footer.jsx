import React from "react";
import LogoCekib from "../../assets/img/logot2.png";

export function Footer() {
  return (
    <footer className="w-full py-4 bg-teal-400 flex items-center justify-center bottom-0">
      <img src={LogoCekib} alt="Logo CEKIB" className="w-24" />
    </footer>
  );
}
