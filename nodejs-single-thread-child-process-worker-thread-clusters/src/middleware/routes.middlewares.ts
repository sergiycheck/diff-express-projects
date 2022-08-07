export const getNumFromQueryMiddleware =
  (queryName: string) => (req, res, next) => {
    const numberStr = req.query[queryName] as undefined as string;

    let num = 0;
    try {
      num = parseInt(numberStr);
      if (isNaN(num)) {
        num = 0;
      }
      req[queryName] = num;
      return next();
    } catch (error) {
      next(error);
    }
  };
