// ===================== //
// ==== Upload Files === //
// ===================== //
import path from "path";
import sharp from "sharp"; // === For Comprise Images
import fs from "fs";
// import { json } from "sequelize";
// === Static INFO === //
const LinkServer = "./public/gallery";
// const LinkDB = "/gallery";
// === Static INFO === //
// === Stor Upload File in Server Storage File === //
const storage = async (NewFile: string, FullFile: File) => {
  //  if the path does not exist
  if (!fs.existsSync(LinkServer)) {
    fs.mkdirSync(LinkServer, { recursive: true });
  }
  // convert file to Buffer in that way we can insert data in Folder 🏆 🚀
  const bytes = await FullFile.arrayBuffer();
  const buffer = Buffer.from(bytes);
  // change the name of the file.
  const fileName = Date.now() + path.extname(NewFile);
  // Add Full Path
  const FullPath = `${LinkServer}/${fileName}`;
  // Write File in The path
  try {
    const AddFile = fs.writeFileSync(FullPath, buffer);
    // file written successfully
  } catch (err) {
    ("We apologize, but we cannot upload your file at the moment. Please try again later.");
  }
  return fileName;
};
// === Stor Upload File in Server Storage File === //

// ==== Delete IMG ==== //
function DeleteIMG(imgDelete: string) {
  const path = `${LinkServer}/${imgDelete}`;
  // const path = `./public${imgDelete}`;
  try {
    fs.unlinkSync(path); //file removed
  } catch (err) {
    // console.error(err);
    return err;
  }
}
// // ==== Delete IMG ==== //
// // =================== //
// = ADD IMAGES / FILES TO DB = //
// ========================================================= //
// = to Get IMAGES File PATH and SPLIT to SAVE in DataBase = //
// == http://localhost:662/public/images//************.png = //
// ======= Folder: public/images/*************.png ========= //
// ========================================================= //
// .split(path.sep); // Get PATH & Split To ARRAY
// function fileDB(fileReQ: any, bodyREQ: any, imgType: string) {
const fileDB = async (fileReQ: any, bodyREQ: any, imgType: any) => {
  // // === Console LOG === //
  // console.log("IMG DB:", fileReQ);
  // console.log("imgType", imgType);
  // console.log("bodyREQ", bodyREQ);
  // // === Console LOG === //
  let NewFile;
  var type = imgType;
  await storage(fileReQ, bodyREQ).then((value) => {
    if (value !== undefined) {
      const webp: any = value.split(".").shift(); // Get Name & Split To ARRAY // [1645211075347 ,png] // then remove the type of image
      const IMGwebp = `1${webp}.webp`; // make image type WEBP
      // === Resize IMAGES === //
      if (type === "image") {
        NewFile = `${IMGwebp}`; // Get image
        sharp(`${LinkServer}/${value}`)
          .webp()
          // === Upload IMAGE to File === //
          .toFile(`${LinkServer}/${IMGwebp}`, (err) => {
            if (err) {
              sharp.cache({ memory: 0, files: 0, items: 0 });
              fs.unlinkSync(`${LinkServer}/${IMGwebp}`); //file removed
              console.log(
                "Error " + `${LinkServer}/${IMGwebp}` + " " + err.toString(),
              );
              return JSON.stringify(`Error ${LinkServer}/${IMGwebp} ${err}`);
            } else {
              sharp.cache({ memory: 0, files: 0, items: 0 });
              fs.unlinkSync(`${LinkServer}/${value}`); //file removed
            }
          });
        // === Upload IMAGE to File === //
      } else {
        // return `${LinkDB}/${value}`; // if Upload File id VIDEO Send the Path\image to DB
        return `${value}`; // if Upload File id VIDEO Send the Path\image to DB
      }
      // === Resize IMAGES === //
    }
    // // === To Upload Video = //
    // // i must work on it later
    // else if (bodyREQ !== undefined) {
    //   // IMG = `${LinkDB}/${bodyREQ}`;
    //   value = `${bodyREQ}`;
    //   return value;
    // }
  });

  /**********************
   * Send the Path/image to DB
   * Notes: Because "public" is a global file, we should only send the internal "gallery" file to DB
   * const LinkServer = "./public/gallery";
   **********************/
  return `/gallery/${NewFile}`;
};
// === EXPORT === //
// export {publicFile, IMGup, fileUp, DeleteIMG, fileDB, DeleteResize,tempFile };
export { DeleteIMG, fileDB };
