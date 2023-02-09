import { useEffect } from "react";
import { useState } from "react";

const images = [
  "https://onemg.gumlet.io/3b281a19-790a-440d-a94f-ec2c8c4433dd_1672911261.jpg?w=1269&h=250&format=auto",
  "https://onemg.gumlet.io/322cab94-7475-46ed-9032-51a5d44b55d0_1663311778.png?w=1269&h=250&format=auto",
  "https://onemg.gumlet.io/a_ignore,w_1269,h_250,c_fit,q_auto,f_auto/c697f3c8-0c49-417c-9765-b89aba6e746e.png",
];

function HomeCarousal() {
  const [state, setState] = useState(images[0]);
  useEffect(() => {
    setInterval(() => {
      setState(images[Math.round(Math.random() * 2)]);
    }, 3000);
  }, []);

  return <img src={state} />;
}

export default HomeCarousal;
