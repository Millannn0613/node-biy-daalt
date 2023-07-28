const asyncHandler = require("../middleware/asyncHandler");
const user = require("../model/user");
const cat = require("../model/category");
exports.NewUSer = asyncHandler(async (req, res, next) => {
  const NewUSer = await user.create(req.body);
  const token = NewUSer.getJsonWebToken();
  res.send({
    amjiltai: true,
    NewUSer,
    token,
  });
});
exports.GetAllUser = asyncHandler(async (req, res, next) => {
  try {
    const NewUSer = await user.find(req.body);
    res.status(200).json({
      success: true,
      NewUSer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
});
exports.updateUser = asyncHandler(async (req, res, next) => {
  try {
    const updateUser = await user.findByIdAndUpdate(req.params.id);
    res.status(200).json({
      success: true,
      updateUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
});
exports.deleteUser = asyncHandler(async (req, res, next) => {
  try {
    const deleteUser = await user.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      deleteUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
});
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const j = await user.findOne({ email });
  console.log(j);
  res.send({ j });
});

exports.catTime = asyncHandler(async (req, res, next) => {
  try {
    const { weakTime, userID } = req.body;
    // console.log(req.params.id);
    const cats = await cat.findById(req.params.id);

    if (cats.freeTime.includes(weakTime)) {
      const usermodel = await user.findById(userID);
      usermodel.time = weakTime;
      const m = cats.freeTime.splice(0, 1);
      cats.save();
    }

    res.status(200).json({
      success: true,
      cats,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
});
