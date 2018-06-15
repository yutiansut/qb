import Sleep from '../libs/Sleep'

// 循环任务执行函数
async function taskRun() {
  this.status = 1
  try {
    await this.func()
  } catch (e) {
    throw e
    console.err(e)
  }
  this.status = 2
}

// 循环任务间隔函数
async function taskSleep() {
  this.status = 3
  await Sleep(this.time)
  this.status = 4
}

// 循环任务状态清除函数
async function taskClear() {
  this.status = 0
}

// 循环任务调度函数
async function taskLoop() {
  while (true) {
    Object.keys(TASKS).forEach(k => {
      if (!k) return;
      let tasks = TASKS[k]
      if (!tasks.task.length)
        return
      // 为新增的task赋予属性
      tasks.task.forEach(task => {
        task.taskSleep = taskSleep //绑定函数
        task.taskRun = taskRun
        task.taskClear = taskClear
        task.status = task.status || 0
      })
      // 如果是最后一步重置步骤
      if (tasks.step === tasks.task.length)
        tasks.step = 0
      tasks.start && tasks.task.forEach((task, index) => {
        // 任务系列中不是当前步骤，返回
        if (tasks.step !== index)
          return

        //运行中的不予处理
        //状态为1代表循环任务执行函数正在执行
        if (task.status === 1)
          return
        // 状态为3代表循环任务间隔函数正在执行
        if (task.status === 3)
          return

        // 状态为2代表循环任务执行函数已经运行完成，等待间隔函数执行
        if (task.status === 2) {
          task.taskSleep()
          return
        }

        // 状态为4代表循环任务间隔函数已经运行完成，此处将状态清零且将执行下一步
        if (task.status === 4) {
          tasks.step++
          task.taskClear()
          return
        }

        // 状态为0代表未进行循环任务执行函数
        if (task.status === 0) {
          task.taskRun()
          return
        }
      })
    })
    await Sleep(8)
  }
}

const TASKS = {}
// let flag = 0 //控制多次start只启动一次
const TASK_HANDLER = {
  install(app, taskConfig) {
    Object.keys(taskConfig).forEach(v => {
      TASKS[v] = taskConfig[v]
      let task = taskConfig[v].task || []
      if (taskConfig[v].task && !(taskConfig[v].task instanceof Array)) {
        task = [taskConfig[v].task]
      }
      TASKS[v].task = task
      TASKS[v].step = 0 // 记录当前系列任务执行到第几步
      TASKS[v].flag = 0 // 记录当前系列任务执行到第几步
      TASK_HANDLER[v] = {}
      TASK_HANDLER[v].start = async () => {
        TASKS[v].flag++
        let type = TASKS[v].flag
        await Sleep(TASKS[v].delayTime)
        if (TASKS[v].flag === type) {
          TASKS[v].start = true
          TASKS[v].flag = 0
        }
      }
      TASK_HANDLER[v].stop = () => TASKS[v].start = false
      TASK_HANDLER[v].set = (func, time) => TASKS[v].task.push({func, time})
      TASK_HANDLER[v].clear = () => {
        TASKS[v].start = false
        TASKS[v].step = 0
        TASKS[v].task = []
        TASKS[v].delayTime = 0
      }
      TASK_HANDLER[v].setDelayTime = value => TASKS[v].delayTime = value
    })
    taskLoop()
  },
  // setTask(tasks){
  //   TASKS[tasks].task = []
  //   TASKS[tasks].step = 0 // 记录当前系列任务执行到第几步
  //   TASKS[tasks].flag = 0
  // }
}

export default TASK_HANDLER
