import { FormEvent, useState } from "react";
import axios, { GET_QR_CODE } from "../../api/Api";

interface Props {
  onGenerate: (imageUrl: string) => void;
}

function QrGenForm({ onGenerate }: Props) {
  const [text, setText] = useState("");
  const [checkboxPNG, setCheckboxPNG] = useState(true);
  const [checkboxSVG, setCheckboxSVG] = useState(false);

  const handleCheckboxChange = (checkbox: "png" | "svg") => {
    if (checkbox === "png") {
      setCheckboxPNG(true);
      setCheckboxSVG(false);
    } else if (checkbox === "svg") {
      setCheckboxPNG(false);
      setCheckboxSVG(true);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const format = checkboxPNG ? "png" : "svg";

    try {
      const response = await axios.get(
        `${GET_QR_CODE}?text=${text}&format=${format}`,
        {
          responseType: "arraybuffer",
        }
      );

      const base64String = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );

      const dataUri = `data:image/svg+xml;base64,${base64String}`;

      onGenerate(dataUri);
    } catch {
      // Failed
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Text:
          <input
            required
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>

        <div>
          <label>
            PNG:
            <input
              type="checkbox"
              checked={checkboxPNG}
              onChange={() => handleCheckboxChange("png")}
            />
          </label>

          <label>
            SVG:
            <input
              type="checkbox"
              checked={checkboxSVG}
              onChange={() => handleCheckboxChange("svg")}
            />
          </label>
        </div>

        <button type="submit">Generate QR Code</button>
      </form>
    </>
  );
}

export default QrGenForm;
