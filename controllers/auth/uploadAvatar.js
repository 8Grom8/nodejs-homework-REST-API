const { users: service } = require("../../services");
const fs = require("fs/promises"); 
const path = require("path");
const Jimp = require("jimp");

const IMG_DIR = path.join(process.cwd(), "upload/images");

const uploadAvatar = async (req, res, next) => {
    try {
      const result = await User.create(req.body);
      const newUserDir = path.join(IMG_DIR, result._id);
      await fs.mkdir(newUserDir);
      const { path: tempName, originalname } = req.file;
      const [extension] = originalname.split(".").reverse();
      const fileName = path.join(newUserDir, `avatar.${extension}`);
      const img = await Jimp.read(file.path);
      await img
        .autocrop()
        .cover(250, 250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE)
        .writeAsync(file.path);
      await fs.rename(tempName, fileName);
      await User.findByIdAndUpdate(result._id, { avatar: fileName });
        res.json({
        status: "success",
        code: 200,
        data: {},
        });
    } catch (error) {
      await fs.unlink(tempName);
      next(error);
    }
};

module.exports = uploadAvatar;