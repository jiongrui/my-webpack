import React, { useState, useEffect } from "react";

const YinYi: React.FC<any> = () => {
  const [imgList, setImgList] = useState([]);
  // const imgList: string[] = [];
  useEffect(() => {
    const defaultUrl = "../../assets/images/loading.gif";
    const imgList: any = [];
    for (let i = 1; i <= 22; i++) {
      imgList.push(defaultUrl);
      const url = `../../assets/images/zuopin${i}.jpg`;
      // const img = document.createElement("img");
      // img.src = url;
      // img.onload = () => {
      //   console.log(url);
      //   // imgList.splice(i, 1, url);
      // };
    }
    console.log(imgList);
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
