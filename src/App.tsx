import { useState } from "react";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import QrGenForm from "./components/qrgen-form/QrGenForm";

function App() {
  const [image, setImage] = useState("");

  const onGenerate = (imageUrl: string) => {
    setImage(imageUrl);
  };

  return (
    <>
      <Header />
      <main>
        {image === "" ? (
          <QrGenForm onGenerate={onGenerate} />
        ) : (
          <>
            <img src={image.replace("blob:", "")} alt="Qr Code" />
            <span>Download buttons</span>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
