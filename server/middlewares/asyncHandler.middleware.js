// This is a middleware function that we are creating. It takes a function as an argument and returns a middleware function that we can use in our routes/controllers to handle errors 
const asyncHandler = (fn) => {
    return (req, res, next) => {                               // This is the middleware function that we are returning from this asyncHandler function
        fn(req, res, next).catch((err) => next(err));          // fn is the function that we pass as an argument to this middleware function
    };
};
  
export default asyncHandler;