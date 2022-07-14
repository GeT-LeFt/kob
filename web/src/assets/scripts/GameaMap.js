import { AcGameObject } from "./AcGameObject";
import { Wall } from "./Wall";

export class GameMap extends AcGameObject {
  constructor(ctx, parent) {
    // ctx是画布，parent是用来动态修改画布的
    super();

    this.ctx = ctx;
    this.parent = parent;
    this.L = 0; // 每个小正方形的边长-初始值

    this.rows = 20;
    this.cols = 20;

    this.inner_walls_count = 20; // 设置障碍物数量
    this.walls = []; //存储所有的墙
  }

  check_connectivity(g, sx, sy, tx, ty) {
    if (sx == tx && sy == ty) return true
    g[sx][sy] = true;
    
    let dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1];
    for (let i = 0; i < 4; i ++){
      let x = sx + dx[i], y = sy + dy[i];
      if (!g[x][y] && this.check_connectivity(g, x, y, tx, ty))
        return true
    }

    return false
  }

  creat_walls() {
    const g = []; //布尔数组t就是有墙f就是没有墙
    for (let r = 0; r < this.rows; r++) {
      g[r] = [];
      for (let c = 0; c < this.cols; c++) {
        g[r][c] = false;
      }
    }

    //给四周加上围墙
    for (let r = 0; r < this.rows; r++) {
      g[r][0] = g[r][this.cols - 1] = true;
    }

    for (let c = 0; c < this.cols; c++) {
      g[0][c] = g[this.rows - 1][c] = true;
    }

    //创建随机障碍物
    for (let i = 0; i < this.inner_walls_count / 2; i++) {
      for (let j = 0; j < 1000; j++) {
        let r = parseInt(Math.random() * this.rows);
        let c = parseInt(Math.random() * this.cols);
        if (g[r][c] || g[c][r]) continue; //画过格子就跳过
        if ((r == this.rows - 2 && c == 1) || (r == 1 && c == this.cols - 2))
          //左下右上两个点不画
          continue;

        g[r][c] = g[c][r] = true;
        break;
      }
    }

    const copy_g = JSON.parse(JSON.stringify(g));
    if (!this.check_connectivity(copy_g, this.rows - 2, 1, 1, this.cols - 2))
      return false;

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (g[r][c]) {
          this.walls.push(new Wall(r, c, this));
        }
      }
    }

    return true;
  }

  start() {
    // 只执行一次
    for (let i = 0; i < 10000; i++) {
      if (this.creat_walls()) break;
    }
  }

  update_size() {
    //辅助函数，每一帧都更新边长
    this.L = parseInt(
      Math.min(
        this.parent.clientWidth / this.cols,
        this.parent.clientHeight / this.rows
      )
    );
    this.ctx.canvas.width = this.L * this.cols;
    this.ctx.canvas.height = this.L * this.rows;
  }

  update() {
    //  每一帧执行一次，除了第一帧之外
    this.update_size(); //辅助函数，每一帧都更新边长
    this.render();
  }

  render() {
    //  渲染地图
    const color_even = "#A2D149";
    const color_odd = "#AAD751";
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if ((r + c) % 2 == 0) {
          this.ctx.fillStyle = color_even;
        } else {
          this.ctx.fillStyle = color_odd;
        }
        this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
      }
    }
  }
}
