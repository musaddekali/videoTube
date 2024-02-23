// const asyncHandler = (requestHandler) => {
//   return async (req, res, next) => {
//    return Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
//   };
// };

export const asyncHandler = (requestHandler) => {
  return async (req, res, next) => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      // res.status(error.code || 500).json({
      //   statusCode: error.code || 500,
      //   success: false,
      //   message: error.message
      // });
      next(error);
    }
  };
};
