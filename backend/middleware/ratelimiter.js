// const rateLimits={}
// const MAX_LIMIT=100;
// const WindowMs=10*60*1000;

// function rateLimiter(req,res,next){
//     const now=Date.now();
//     console.log(now);
//     const ip=req.ip;
//     if(!rateLimits[ip]){
//         rateLimits[ip]={
//        request:1,
//        startTime:now
//         }
//         return next();
//     }

//     const deltaTime=Date.now()-rateLimits[ip].startTime ;
//     if(WindowMs>deltaTime){
//         rateLimits[ip].request++;
//         if(rateLimits[ip].request>MAX_LIMIT){
//             const response={
//                 msg:"Limit exceeds",
//                 statusCode:res.statusCode
//             }
//             return res.json(response);
//         }
//         return next();
//     }


//     rateLimits[ip]={
//         request:1,
//         startTime:now
//          }


//           next();



// }
// module.exports ={rateLimiter,} ;
const rateLimits = {};
const MAX_LIMIT = 2;
const WindowMs = 10 * 60 * 1000;

function rateLimiter(req, res, next) {
    const now = Date.now();
    const ip = req.ip;
    
    if (!rateLimits[ip]) {
        rateLimits[ip] = {
            request: 1,
            startTime: now
        };
        return next();
    }

    const deltaTime = now - rateLimits[ip].startTime;
    if (WindowMs > deltaTime) {
        rateLimits[ip].request++;
        if (rateLimits[ip].request > MAX_LIMIT) {
            const response = {
                msg: "Limit exceeds",
                statusCode: res.statusCode
            };
            return res.status(429).json(response);
        }
        return next();
    }

    rateLimits[ip] = {
        request: 1,
        startTime: now
    };

    return next();
}

module.exports = rateLimiter;
