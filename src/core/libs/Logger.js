export default function (bug, ...info) {
  if(bug > process.env.LOG_DEBUG){
    console.log(...info)
  }
}