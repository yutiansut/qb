let Logger = (...info) => {
  if(!process.env.LOG_DEBUG){
    console.log(...info)
  }
}

Logger["dev"] = (...info) => {
  if(process.env.LOG_DEBUG < 2){
    console.log(...info)
  }
}

Logger["prod"] = (...info) => {
  if(process.env.LOG_DEBUG < 3){
    console.log(...info)
  }
}

Logger["error"] = (...info) => {
  // if(process.env.LOG_DEBUG < 3){
    console.error(...info)
  // }
}

Logger["warn"] = (...info) => {
  // if(process.env.LOG_DEBUG < 3){
  console.warn(...info)
  // }
}


export default Logger