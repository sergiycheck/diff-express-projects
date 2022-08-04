export const getNumFromQueryMiddleware = (req, res, next) => {
  const numberStr = req.query.number as undefined as string;

  let num = 0;
  try {
    num = parseInt(numberStr);
    if (isNaN(num)) {
      num = 0;
    }
    req['number'] = num;
    return next();
  } catch (error) {
    next(error);
  }
};
