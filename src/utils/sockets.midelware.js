const socketMiddleware = (io) => {
    return (req, res, next) => {
      req.io = io;
      next();
    };
  };
  
  export default socketMiddleware;