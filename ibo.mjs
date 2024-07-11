import {
  createShader,
  createProgram,
  createVBO,
  setAttribute,
  createIBO,
} from './common.mjs';

window.addEventListener('load', () => {
  const c = document.getElementById('canvas');
  c.width = 300;
  c.height = 300;

  const gl = c.getContext('webgl');

  const vShader = createShader(gl, 'vs');
  const fShader = createShader(gl, 'fs');
  const prg = createProgram(gl, vShader, fShader);

  const attLocation = new Array(2);
  attLocation[0] = gl.getAttribLocation(prg, 'position');
  attLocation[1] = gl.getAttribLocation(prg, 'color');

  const attStride = new Array(2);
  attStride[0] = 3;
  attStride[1] = 4;

  // prettier-ignore
  const vertexPosition = [
    0.0, 1.0, 0.0,
    1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    0.0, -1.0, 0.0
  ];
  // prettier-ignore
  const vertexColor = [
    1.0, 0.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0
  ];

  // prettier-ignore
  const index = [
    0, 1, 2,
    1, 2, 3
  ];

  const positionVBO = createVBO(gl, vertexPosition);
  const colorVBO = createVBO(gl, vertexColor);
  setAttribute(gl, [positionVBO, colorVBO], attLocation, attStride);

  const ibo = createIBO(gl, index);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);

  const uniLocation = gl.getUniformLocation(prg, 'mvpMatrix');

  const m = new matIV();
  const mMatrix = m.identity(m.create());
  const vMatrix = m.identity(m.create());
  const pMatrix = m.identity(m.create());
  const tmpMatrix = m.identity(m.create());
  const mvpMatrix = m.identity(m.create());

  m.lookAt([0.0, 0.0, 5.0], [0, 0, 0], [0, 1, 0], vMatrix);
  m.perspective(45, c.width / c.height, 0.1, 100, pMatrix);
  m.multiply(pMatrix, vMatrix, tmpMatrix);

  let count = 0;

  const render = function () {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    count++;

    const rad = ((count % 360) * Math.PI) / 180;

    m.identity(mMatrix);
    m.rotate(mMatrix, rad, [0, 1, 0], mMatrix);
    m.multiply(tmpMatrix, mMatrix, mvpMatrix);
    gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);

    gl.drawElements(gl.TRIANGLES, index.length, gl.UNSIGNED_SHORT, 0);

    gl.flush();

    setTimeout(render, 1000 / 30);
  };
  render();
});
