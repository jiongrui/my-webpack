import React, { useState, useEffect } from "react";

const YinYi: React.FC<any> = () => {
  const [imgList, setImgList] = useState([]);
  useEffect(() => {
    const imgList: any = [];
    for (let i = 1; i <= 22; i++) {
      imgList.push("./static/images/loading.gif");
      const url = `./static/images/zuopin${i}.jpg`;
      const img = document.createElement("img");
      img.src = url;
      console.time(`what${i}`);
      img.onload = () => {
        imgList.splice(i - 1, 1, url);
        setImgList(imgList);
        console.timeEnd(`what${i}`);
      };
    }
    setImgList(imgList);
  }, ["imgList"]);

  return (
    <div>
      {imgList.map((url, index) => (
        <img src={url} key={index} />
      ))}
    </div>
  );
};

export default YinYi;
