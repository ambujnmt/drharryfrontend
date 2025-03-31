import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

export default function About() {
  const { translateText } = useContext(LanguageContext);

  return (
    <div>
      <h1>{translateText("welcome")}</h1>
      <p>{translateText("description")}</p>
    </div>
  );
}
