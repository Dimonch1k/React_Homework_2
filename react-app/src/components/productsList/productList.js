import hpPavilion14 from "../../images/hp-pavilion-14.png";
import asusTufGaming15 from "../../images/asus-tuf-gaming-15.png";
import acerAspire7 from "../../images/acer-aspire-7.png";

export const taskList = [
  {
    id: Math.random(),
    image: hpPavilion14,
    info: "Ноутбук HP Laptop 14",
    price: "26099",
    expire: true,

    more: {
      processor: "Intel Core i5-1135G7",
      ram: "16GB",
      storage: "512GB SSD",
      display: "14.6",
    }
  },
  {
    id: Math.random(),
    image: asusTufGaming15,
    info: "Ноутбук ASUS TUF Gaming A15 (2023)",
    price: "36999",
    expire: false,

    more: {
      processor: "Ryzen 5 7535HS",
      ram: "16GB",
      storage: "1024GB SSD",
      display: "15.6",
    }
  },
  {
    id: Math.random(),
    image: acerAspire7,
    info: "Ноутбук Acer Aspire 7",
    price: "31999",
    expire: true,

    more: {
      processor: "Intel Core i5-12450H",
      ram: "16GB",
      storage: "1024GB SSD",
      display: "15.6",
    }
  },
];
