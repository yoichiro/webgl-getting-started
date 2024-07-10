export const setAttribute = (gl, vbo, attL, attS) => {
  for (const i in vbo) {
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo[i]);
    gl.enableVertexAttribArray(attL[i]);
    gl.vertexAttribPointer(attL[i], attS[i], gl.FLOAT, false, 0, 0);
  }
};

export const createShader = (gl, id) => {
  let shader;
  const scriptElement = document.getElementById(id);
  if (!scriptElement) {
    return undefined;
  }
  switch (scriptElement.type) {
    case 'x-shader/x-vertex':
      shader = gl.createShader(gl.VERTEX_SHADER);
      break;
    case 'x-shader/x-fragment':
      shader = gl.createShader(gl.FRAGMENT_SHADER);
      break;
    default:
      return undefined;
  }
  gl.shaderSource(shader, scriptElement.text);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader;
  } else {
    alert(gl.getShaderInfoLog(shader));
    return undefined;
  }
};

export const createProgram = (gl, vs, fs) => {
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.useProgram(program);
    return program;
  } else {
    alert(gl.getProgramInfoLog(program));
    return undefined;
  }
};

export const createVBO = (gl, data) => {
  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  return vbo;
};

export const createIBO = (gl, data) => {
  const ibo = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  return ibo;
};
