class GridLayout {
  cellWidth: number;
  cellHeight: number;
  grid: any[];
  gridX: number;
  gridY: number;
  // rect矩形
  constructor(rect: number, height: number, width: number) {
    this.gridX = Math.floor(width / rect);
    this.gridY = Math.floor(height / rect);
    this.cellWidth = width / this.gridX;
    this.cellHeight = height / this.gridY;
    this.grid = [];
    for (let i = 0; i < this.gridY; i += 1) {
      this.grid[i] = [];
      for (let s = 0; s < this.gridX; s += 1) {
        this.grid[i][s] = [];
      }
    }
  }

  // 获取单元栅格
  getCells = (e: { x: number; y: number; radius: number }) => {
    const gridArray = [];
    const w1 = Math.floor((e.x - e.radius) / this.cellWidth);
    const w2 = Math.ceil((e.x + e.radius) / this.cellWidth);
    const h1 = Math.floor((e.y - e.radius) / this.cellHeight);
    const h2 = Math.ceil((e.y + e.radius) / this.cellHeight);
    for (let c = h1; c < h2; c += 1) {
      for (let l = w1; l < w2; l += 1) {
        gridArray.push(this.grid[c][l]);
      }
    }
    return gridArray;
  };

  // 是否存在碰撞物
  hasCollisions = (t: any) => {
    console.log('t ==>', t);
    return this.getCells(t).some((e) => {
      if (e === undefined || !Array.isArray(e)) {
        return;
      } else {
        return e.some((v: any) => this.collides(t, v));
      }
    });
  };

  // 冲突
  collides = (t: any, v: any) => {
    if (t === v) {
      return false;
    }
    const n = t.x - v.x;
    const i = t.y - v.y;
    const r = t.radius + v.radius;
    return n * n + i * i < r * r;
  };

  // 添加
  add = (value: any) => {
    this.getCells(value).forEach((item) => {
      if (item === undefined || !Array.isArray(item)) {
        return;
      }
      item.push(value);
    });
  };
}

// 获取点的位置
const getPointPos = (width: number, height: number, length: number) => {
  // 格子
  const grid = new GridLayout(160, width, height);
  const posArray = [];
  // 数量
  const num = 500;
  // 随机生成的圆心角
  const radiusArray = [20, 35, 60];
  for (let i = 0; i < length; i += 1) {
    let radius;
    let pos;
    for (let j = 0; j < num; j += 1) {
      radius = radiusArray[Math.floor(Math.random() * radiusArray.length)];
      pos = {
        x: Math.random() * (width - radius * 2) + radius,
        y: Math.random() * (height - radius * 2) + radius,
        radius,
      };
      if (!grid.hasCollisions(pos)) {
        break;
      }
    }
    posArray.push(pos);
    grid.add(pos);
  }
  return posArray;
};

// 获取距离，开平方根
const getDistance = (t: any, a: any) =>
  Math.sqrt((t.x - a.x) * (t.x - a.x) + (t.y - a.y) * (t.y - a.y));

export { GridLayout, getPointPos, getDistance };
