const scaleImage = (dataUri: string, ratio: number) => {
  const oc = document.createElement("canvas");
  const octx = oc.getContext("2d")!;
  const img = new Image();
  img.src = dataUri;
  oc.width = img.width * ratio;
  oc.height = img.height * ratio;
  octx.drawImage(img, 0, 0, img.width, img.height, 0, 0, oc.width, oc.height);
  return oc.toDataURL("image/jpeg");
};
export default scaleImage;
