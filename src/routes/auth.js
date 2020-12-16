const express = require("express");

const router = express.Router();
const user = require("../usecases/users");

//registro /auth/sign-up
router.post("/sign-up", async (request, response) => {
  try {
    const signedUpUser = await user.signup(request.body);
    response.json({
      success: true,
      data: {
        user: signedUpUser,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

router.post("/login", async (request, response) => {
  try {
    const { password, email } = request.body;
    const token = await user.login(email, password);
    response.json({
      success: true,
      data: {
        token,
      },
    });
  } catch (error) {
    response.status(401);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
