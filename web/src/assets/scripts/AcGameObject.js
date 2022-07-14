const AC_GAME_OBJECTS = [];

export class AcGameObject {
  constructor() {
    AC_GAME_OBJECTS.push(this);
    this.timedelta = 0; // 设置时间间隔用于调整速度
    this.has_called_start = false; // 新开一个变量记录有没有被执行过，执行过就为true
  }
  start() {
    // 只执行一次
  }

  update() {
    //  每一帧执行一次，除了第一帧之外
  }

  on_destroy() {
    //删除之前执行
  }

  destroy() {
    // 从AC_GAME_BOJECTS中删除对象
    for (let i in AC_GAME_OBJECTS) {
      //遍历下下标
      const obj = AC_GAME_OBJECTS[i];
      if (obj === this) {
        AC_GAME_OBJECTS.splice(i);
        break;
      }
    }
  }
}

let last_timestamp; // 上一次执行的时刻
const step = (timestamp) => {
  for (let obj of AC_GAME_OBJECTS) {
    // 遍历值
    if (!obj.has_called_start) {
      obj.has_called_start = true;
      obj.start();
    } else {
      obj.timedelta = timestamp - last_timestamp;
      obj.update();
    }
  }

  last_timestamp = timestamp;
  requestAnimationFrame(step);
};

requestAnimationFrame(step);
