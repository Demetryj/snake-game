const FIELD_SIZE = 25;
const FIELD_ROW = [...new Array(FIELD_SIZE).keys()];

const DIRECTION = {
  RIGHT: { x: 1, y: 0 },
  LEFT: { x: -1, y: 0 },
  TOP: { x: 0, y: -1 },
  BOTTOM: { x: 0, y: 1 },
};

export { FIELD_SIZE, FIELD_ROW, DIRECTION };
